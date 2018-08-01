/*! * Masterpiece Vue * * 精品案例页 * * @author zhaoyimeng * @version 1.0.0 20171128 */

<template>
	<div>

		<topLogo3 class="topLogo"/>


		<div class="bscroll" ref="bscroll">


		<div class="wrapper22">
		<div class="shadowSpace80" />

			<div class="detail-title-container">
				<div class="detail-left-container">
					<img class="detail-title-image" :src="typeIconMap[caseObject.productType]" />
					<div class="detail-describe">
						<span class="detail-title">{{typeNameMap[caseObject.productType]}}</span>
						<span class="detail-level">{{caseObject.productGradeName}}</span>
					</div>
				</div>
			</div>

			<div class="detail-info-container">
				<div class="detail-info-left">
					<span class="info-title">{{caseObject.name}}</span>
					<div>
						<span class="info-time">{{caseObject.label}}</span>
					</div>
				</div>
			</div>

			<div class="background-idea-container">
				<div class="background-idea-title">
					<img class="background-image" :src="background" />
					<span class="background-text">{{caseObject.detailKey1}}</span>
				</div>
				<div v-for="item in String(this.caseObject.detailVal1).split('\n')" class="background-describe">
					<span class="describe-text">{{item}}</span>
				</div>
				<div class="background-idea-title">
					<img class="idea-image" :src="idea" />
					<span class="idea-text">{{caseObject.detailKey2}}</span>
				</div>
				<div v-for="item in String(this.caseObject.detailVal2).split('\n')" class="background-describe">
					<span class="describe-text">{{item}}</span>
				</div>
			</div>



			<div class="image-container" v-for="(item, index) in caseObject.imgs.split(',')">
				<!-- <image class="projection" :src="projection" /> -->
				<img class="image-top" :src="item" />
				<!-- <div v-if="index < caseObject.imgs.split(',').length - 1" class="shadowSpace" /> -->
			</div>

			<div class="custom-service-title">
				<img class="custom-service-image" v-if="greatCaseList.length !== 0" :src="customService" />
				<span class="custom-service-text">精品展示</span>
			</div>

			<div class="case-title-container">
				<span class="case-title">{{groupListMap[caseObject.productGroup]}}作品示例</span>
			</div>
				<div class="shadowSpace3334" />

			<div v-for="(item, index) in greatCaseList">
				<div class="great-case-describe"  @click='handleClickJump(item)'>

					<div v-if="item.style === '样式A'">
						<div class='great-case-img-container' :style="{ 'margin-top': '14px' }">
							<img class="great-case-img" :src="item.cover.split(',')[0]" />
							<img class="great-case-img" :src="item.cover.split(',')[1]" />
						</div>
					</div>
				<div v-if="item.style === '样式B'">
						<div class='great-case-img-container' :style="{ 'margin-top': 14 }">
							<img class="great-case-img-full" :src="item.cover" />
						</div>
					</div>

				<span class="great-case-title-text">{{item.name}}</span>
				<span class="great-case-detail-text">{{item.detailKey1}}：{{item.detailVal1.length > 33 ? (item.detailVal1.substring(0, 33) + '...') : item.detailVal1}}</span>
				<div class="shadowSpace333" />
				</div>
			</div>

		</div>
		</div>







	<bottombanner class='bottombanner'/>
	</div>
</template>
<script>
import {
		imageUrls,
		baseUrl,
		cacheName
	} from '../lib/constants'

import {
  RandomUtil
} from '../lib/util'

import topLogo3 from './design/topLogo3'
import Vue from 'vue'
import bottombanner from './product/bottomBanner'
	import BScroll from 'better-scroll'

	export default {

		data() {
			return {
				caseObject: this.$route.params.caseObject,
				baseUrl: baseUrl,
				typeNameMap: {},
				typeIconMap: {},
				greatCaseList: [],
				scrollerLoad: false,
				showLoading: 'hide',
				isBuy: false,
				background: imageUrls.navigation.background,
				loading: imageUrls.navigation.loading,
				idea: imageUrls.navigation.idea,
				projection: imageUrls.navigation.projection,
				preview: imageUrls.navigation.preview,
				banner: imageUrls.banner.record,
				praise: imageUrls.navigation.praise,
				typeListCacheName: cacheName.type.typeList,
				groupListMap: this.$route.params.groupListMap,
				masterLikeStatusList: this.$route.params.masterLikeStatusList,
				customService: imageUrls.navigation.customService,
				productTypeData: '',
				style: {}
			}
		},
		components:{
			topLogo3,
			bottombanner
		},
		created: function() {
			this.getList()
		},
mounted: function() {

		},
		methods: {

			handleClickJump: function(item) {
				this.axios.get(this.baseUrl + '/masterpiece?id=' + item.id).then((res)=>{
					var resData = res.data.data[0]
				this.$router.push({
					name: 'masterpiece',
					query: { id:item.id},
					params: {
		              caseObject: res.data.data[0],
		              groupListMap: this.groupListMap
		            }
				})
					this.caseObject = item
					this.getList()
					this.scroll.scrollTo(0, 80, 0)
					})
			},


			getList(){
				this.axios.get(this.baseUrl + '/product-type').then((response)=>{
					console.log(response)
		    			response.data.data.forEach(item => {
						if(item.id === this.caseObject.productType){
							this.productTypeData = item
						}
//						this.typeNameMap[item.id] = item.name
//						this.typeIconMap[item.id] = item.img
						Vue.set(this.typeNameMap,item.id,item.name)
						Vue.set(this.typeIconMap,item.id,item.img)
					})
		    	})




				this.axios.get(this.baseUrl + '/masterpiece?productGroupId=' + this.caseObject.productGroup).then((response)=>{
		    		console.log(response.data.data)

					this.greatCaseList = response.data.data.filter((val) => {
						return !val.delFlag && val.status && val.id !== this.caseObject.id
					})
					this.greatCaseList = RandomUtil.getArray(this.greatCaseList, 4)



        //即定时器 20ms
        this.$nextTick(() => {
          //$refs绑定元素
          if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            //开启点击事件 默认为false
            click: true
          })
          // console.log(this.scroll)
        } else if(!this.$refs.bscroll) {
          return
        } else {
          this.scroll.refresh()
        }
      })






					var datas = function(info) {
				      if (info) {
				        info = JSON.parse(info);
				        if (info.expiration - new Date().getTime() > 3000) {
				          if (successCallback) successCallback(info.data.data);
				          return;
				        }
				      }
				      setTimeout(function() {
				        this.axios.get(this.baseUrl + '/product-type').then((data)=>{

				          let result = {
				            data: data.data,
				            expiration: new Date().getTime() + 1800000
				          };
				          window.localStorage.setItem(cacheName, JSON.stringify(result));
				        });
				      }, 600);
				    }

		    	})

			}
		}
	}
</script>
<style scoped>
	.wrapperMater {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 750px;
		height: 1112px;
	}

		.bscroll {
		width: 100%;
		position: absolute;
		overflow: hidden;
		z-index: 1;
		height: 1218px;
	}

	.wrapper22 {
		margin-top: 80px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 750px;
		/*height: 1112px;*/
	}
	.topLogo,.bottombanner{
		z-index: 999;
	}

	.detail-title-container {
		display: flex;
		flex-direction: row;
		width: 750px;
		height: 168px;
		justify-content: space-between;
		align-items: center;
		border-top-width: 1px;
		border-top-color: #eeeeee;
	}

	.detail-info-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20px;
	}

	.shadowSpace123 {
		background-color: #f6f6f6;
		width: 750px;
		height: 100px;
	}

	.shadowSpace80 {
		width: 750px;
		height: 80px;
	}

	.info-title {
		font-size: 44px;
		color: #333333;
		font-weight: bold;
	}

	.like-number {
		font-size: 28px;
		color: #666666;
	}

	.info-time {
		font-size: 26px;
		color: #999999;
		margin-top: 50px;
	}

	.detail-describe {
		display: flex;
		flex-direction: column;
		margin-left: 34px;
	}

	.detail-title {
		font-size: 26px;
		color: #333333;
	}

	.detail-level {
		margin-top: 18px;
		font-size: 26px;
		color: #999999;
	}

	.detail-title-image {
		width: 68px;
		height: 68px;
	}

	.detail-left-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20px;
	}

	.detail-info-right {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		margin-bottom: 40px;
	}

	.preview-container {
		display: flex;
		flex-direction: row;
		margin-right: 30px;
	}

	.praise-container {
		display: flex;
		flex-direction: row;
		margin-right: 20px
	}

	.preview-image {
		width: 36px;
		height: 26px;
		margin-right: 12px;
	}

	.preview-text {
		font-size: 26px;
		color: #999999;
	}

	.praise-text {
		font-size: 26px;
		color: #999999;
	}

	.praise-image {
		width: 28px;
		height: 28px;
		margin-right: 12px;
	}

	.background-idea-container {
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eeeeee;
		margin-bottom: 60px;
	}

	.background-idea-title {
		display: flex;
		flex-direction: row;
		margin-left: 20px;
		margin-top: 60px;
		align-items: flex-end;
	}

	.background-image {
		width: 36px;
		height: 46px;
	}

	.background-text {
		margin-left: 32px;
		font-size: 32px;
		color: #333333;
		font-weight: bold;
	}

	.background-describe {
		display: flex;
		flex-direction: column;
		margin-left: 20px;
		margin-right: 20px;
	}

	.describe-text {
		line-height: 46px;
		font-size: 30px;
		color: #666666;
		margin-top: 52px;
	}

	.idea-image {
		width: 43px;
		height: 46px;
	}

	.idea-text {
		margin-left: 26px;
		font-size: 32px;
		color: #333333;
		font-weight: bold;
	}

	.detail-info-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: 1px solid #eeeeee;
		height: 208px;
	}

	.footer {
		display: flex;
		flex-direction: row;
		height: 98px;
		width: 750px;
	}

	.footer-left {
		display: flex;
		flex-direction: row;
		height: 98px;
		width: 480px;
		align-items: center;
		background-color: white;
	}

	.footer-like {
		width: 46px;
		height: 42px;
		margin-left: 30px;
	}

	.footer-right {
		display: flex;
		flex-direction: row;
		height: 98px;
		width: 270px;
		background-color: #0f98f8;
		justify-content: center;
		align-items: center;
	}

	.footer-left-text-like {
		color: #666666;
		font-size: 32px;
		margin-left: 178px;
	}

	.footer-left-text {
		color: #999999;
		font-size: 32px;
		margin-left: 178px;
	}

	.footer-right-text {
		font-size: 32px;
		color: #ffffff;
	}

	.projection {
		width: 750px;
		height: 454px;
	}

	.image-container {
		display: flex;
		flex-flow: column;
	}

	.image-top {
		width: 750px;
		height: 474px;
	}

	.image-bottom {
		width: 750px;
		height: 438px;
	}

	.shadowSpace333 {
		background-color: #f6f6f6;
		margin-top: 30px;
		width: 750px;
		height: 2px;
	}

	.shadowSpace3334 {
		background-color: #f6f6f6;
		width: 750px;
		height: 2px;
	}

	.shadowSpace {
		background-color: #f6f6f6;
		width: 750px;
		height: 20px;
	}

	.custom-service-title {
		display: flex;
		height: 98px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #f6f6f6;
		margin-top: 60px;
	}

	.custom-service-image {
		width: 44px;
		height: 38px;
	}

	.custom-service-text {
		margin-left: 18px;
		font-size: 32px;
		color: #333333;
		font-weight: bold;
	}

	.great-case-describe {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
	}

	.great-case-img-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.great-case-img {
		width: 364px;
		height: 322px;
	}

	.great-case-img-full {
		width: 750px;
		height: 322px;
	}

	.great-case-title-text {
		color: #333333;
		font-size: 28px;
		margin-top: 40px;
		margin-left: 20px;
	}

	.great-case-detail-text {
		color: #666666;
		font-size: 28px;
		margin-top: 26px;
		margin-left: 20px;
		margin-right: 46px;
	}

	.case-title-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 98px;
		border-bottom-width: 1px;
		border-bottom-color: #eeeeee;
	}

	.case-title {
		margin-left: 20px;
		font-size: 32px;
		color: #333333;
		font-weight: bold;
	}

	.like-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-right: 20px;
		margin-bottom: 36px;
	}

	.like-wrapper {
		width: 122px;
		height: 118px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.like {
		width: 42px;
		height: 38px;
	}

	.col-line {
		width: 710px;
		margin-left: 20px;
		border-width: 1px;
		border-color: #eeeeee;
	}

	.loading {
		margin-left: 300px;
		width: 62px;
		height: 84px;
	}

	.loading-container {
		height: 100px;
		background-color: #f6f6f6;
		width: 750px;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.loading-text {
		font-size: 22px;
		color: #999999;
		margin-bottom: 10px;
	}

	.mask {
		height: 1100px;
		width: 750px;
		position: absolute;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4)
	}
</style>
