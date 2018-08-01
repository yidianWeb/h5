/**
 * 随机数工具实例
 */
const RandomUtil = new class {
  /**
   * 字符常量
   *
   * @type {string}
   * @private
   */
  _CHARS = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

  /**
   * 生成随机字符串
   *
   * @param len 生成字符串长度
   */
  getString(len){
    len = len || 32;
    var maxPos = this._CHARS.length,
      result = '';
    for (var i = 0; i < len; ++i)
      result += this._CHARS.charAt(Math.floor(Math.random() * maxPos));
    return result;
  }

  /**
   * 随机获取数组中指定个数不重复元素
   *
   * @param arr 待操作数组
   * @param num 获取元素个数
   */
  getArray(arr, num) {
    if (num > arr.length || num < 0) return arr;
    var returnArr = [];
    var set = new Set();
    var setFlag = true;
    var moreThanFlag = false;
    if (num > arr.length / 2) {
      num = arr.length - num;
      moreThanFlag = true;
    }
    while (setFlag) {
      if (set.size < num) set.add(Math.floor(Math.random() * arr.length));
      else setFlag = false;
    }
    if (moreThanFlag) {
      var indexArr = []
      for (var index in arr) {
        indexArr.push(index)
      }
      set = new Set(indexArr.filter(x => !set.has(Number(x))))
    }

    for (var item of set) {
      returnArr.push(arr[item]);
    }

    return returnArr;
  }
}();

/**
 * 带失效时间的缓存工具
 */
const CacheUtil = new class {
  /**
   * 设置缓存
   *
   * @param cacheName 缓存名称
   * @param cacheTime 缓存时间
   * @param cacheContent 缓存内容
   * @param successCallback 成功回调函数
   */
  setItem(cacheName, cacheTime, cacheContent) {
    let result = {
      data: cacheContent,
      expiration: new Date().getTime() + cacheTime
    };
    var resStr =  JSON.stringify(result)
    window.localStorage.setItem(cacheName,resStr)
  }

  /**
   * 获取缓存
   *
   * @param cacheName 缓存名称
   * @param successCallback 成功回调函数
   */
  getItem(cacheName, successCallback) {
  	
    window.localStorage.getItem(cacheName, function(info) {
      if (info) {
        info = JSON.parse(info);
        if (info.expiration - new Date().getTime() > 3000) {
          if (successCallback) {
            successCallback(info.data);
            return;
          }
        }
      }

      if (successCallback) successCallback('')
    });
  }
}();

/**
 * network工具实例
 */
const NetworkUtil = new class {
  /**
   * 带缓存的stream请求
   *
   * @param cacheName 缓存名称
   * @param cacheTime 缓存时间（单位: 毫秒）
   * @param settings 请求参数
   * @param isNow 是否立即请求(true: 立即请求)
   * @param successCallback 成功回调函数
   * @param failedCallback 失败回调函数
   */
  streamAndCache(cacheName, cacheTime, settings, isNow, successCallback, failedCallback) {
    window.localStorage.getItem(cacheName, function(info) {
      if (info && !isNow) {
        info = JSON.parse(info);
        if (info.expiration - new Date().getTime() > 3000) {
          if (successCallback) successCallback(info.data.data);
          return;
        }
      }
      setTimeout(function() {
        stream.fetch(settings, function(data) {
          if (0 > cacheTime) cacheTime = 3600000;
          let result = {
            data: data.data,
            expiration: new Date().getTime() + cacheTime
          };
         window.localStorage.setItem(cacheName, JSON.stringify(result));
          if (successCallback) successCallback(data.data.data);
        }, failedCallback);
      }, 600);
    })
  }
  /**
   * 网络请求
   *
   * @param settings 请求参数
   * @param successCallback 成功回调函数
   * @param cacheParams 缓存对象(非必传){cacheName: 缓存名称, cacheTime: 缓存时间, isNow: 是否立即重新请求}
   * @param failedCallback 失败回调函数(非必传)
   */
  streamRequest(url,settings, successCallback) {
    if (settings.method === 'GET') {
      if (successCallback.datas) {
        this.streamAndCache(datas.cacheName, datas.cacheTime, settings, datas.isNow, successCallback, failedCallback);

        return;
      }
    }
    fetch(url).then(response => {
      if (response.data.code === 0) {
        if (successCallback) successCallback(response.data.data);
      } else {
//      LogUtil.log(JSON.stringify(response))
        console.log('获取数据失败');
      }
    })
  }
}();

/**
 * 路由工具实例
 */
const RouterUtil = new class {
  /**
   * 项目实际路由对象
   *
   * @private
   */
  _router;

  /**
   * 页面分享数据对象
   *
   * @private
   */
  _shares;
  /**
   * 对象有效性检测
   *
   * @private
   */
  _check(){
    if (ObjectUtil.isEmpty(this._router))
      throw new Error('RouterUtil is not init');
  }

  /**
   * 初始化
   *
   * @param router 路由实例对象
   */
  init(router) {
    if (ObjectUtil.isEmpty(this._router)) {
      this._router = router;
      this._shares = {};
      for (
        let routes = this._router.options.routes, i = 0, length = routes.length; i < length;
        ++i
      )
        if (!ObjectUtil.isEmpty(routes[i].share)) {
          this._shares[routes[i].path] = routes[i].share;
          this._shares[routes[i].path].url = env.originalUrl + routes[i].path;
        }
    }
  }

  /**
   * 获取当前页面路由地址
   *
   * @returns {string} 路由url地址
   */
  getCurrentPath(){
    return this._router.currentRoute.path;
  }

  /**
   * 获取当前页面分享信息
   *
   * @returns {object} 当前页面分享信息
   */
  getCurrentPathShare()
//:{
//  type: 0,
//  url,
//  title,
//  content,
//  image
//} 
  {
    let path = this.getCurrentPath();

    return path in this._shares ? this._shares[path] : this._shares['/'];
  }

  /**
   * 跳转页面
   *
   * @param url 页面路径
   */
  push(url){
    this._check();
    this._router.push(url);
  }

  /**
   * 返回上一页面
   *
   * @returns {boolean} true:关闭页面
   */
  back() {
    this._check();
    let previousUrl = this.getCurrentPath();
    this._router.back();
    return previousUrl === this.getCurrentPath() && '/' === previousUrl;
  }
}();

export {
  RandomUtil,
  RouterUtil,
  CacheUtil,
  NetworkUtil
};