<template>
	<div class="container">
		<topLogo class='topLogo' />
		<div>
			<div class="banner" style="{ background: url(../../build/logo.png)}">
				<img src="./index/banner.jpg" />
			</div>
			<div class="space" />
			<listIcon/>
		</div>
	</div>
</template>

<script>
	import listIcon from './index/listicon'
//	import BScroll from 'better-scroll' ss 
	import topLogo from './index/topLogo'
	import { CacheUtil } from '../lib/util2'
	import {
		imageUrls,
		baseUrl,
		isIphoneX
	} from '../lib/constants'

	export default {
		name: 'Index',
		data: function() {
			return {
				isIphoneX: isIphoneX,
				baseUrl: baseUrl,
				resultList: [],
				productGroup: [],
				productGroupSort: [],
				productGroupShow: [],
				groupShowIndex: [],
				masterList: [],
				groupListMap: {},
				groupRenderFlag: false,
				isLoadingDone: true,
				bannerOne: imageUrls.banner.bannerOne,
				blueNav: imageUrls.navigation.blueNav
				//滑动配置[obj]
			}
		},

		methods: {
			initData: function() {
				fetch(this.baseUrl + '/masterpiece', {
					method: 'GET',
					type: 'json'
				}).then((response) => {
					return response.json()
				}).then((response) => {
					console.log(response)
					const list = []
					//循环masterList
					response.data.forEach((item, index) => {
						this.masterList.push(item)
					})
					this.masterList.forEach((item, index) => {
						//如果
						console.log(item)
						if(this.groupShowIndex[item.productGroup] && item.status && !item.delFlag) {
							item.groupSort = this.productGroupSort[item.productGroup]
							if(item.groupSort) {
								this.productGroupShow[item.productGroup] = 0
								list.push(item)
							}
						}
					})

					list.sort((a, b) => {
						if(a.groupSort === b.groupSort) {
							if(a.indexShow === b.indexShow) {
								if(a.sort === b.sort) return b.createDate - a.createDate
								return a.sort - b.sort
							}
							return b.indexShow - a.indexShow
						}
						return a.groupSort - b.groupSort
					})

					this.resultList = []
					list.forEach(caseValue => {
						if(this.productGroupShow[caseValue.productGroup] < 2) {
							this.resultList.push(caseValue)
								++this.productGroupShow[caseValue.productGroup]
						}
					})
				})
			}
		},

		components: {
			'listIcon': listIcon,
			'topLogo': topLogo
		},
		mounted() {
			//即定时器 20ms
//			this.$nextTick(() => {
//
//				//$refs绑定元素
//				setTimeout(() => {
//
//					if(!this.scroll) {
//						this.scroll = new BScroll(this.$refs.bscroll, {
//							//开启点击事件 默认为false
//							click: true
//						})
//						// console.log(this.scroll)
//					} else if(!this.$refs.bscroll) {
//						return
//					} else {
//						this.scroll.refresh()
//					}
//				}, 200)
//
//			})

		}
	}
</script>

<style scoped>
	.topLogo {
		z-index: 999;
	}
	
	.container{
		/*margin-top: 40px;*/
		-webkit-overflow-scrolling: touch;
	}
	
	.bscroll {
		width: 100%;
		position: absolute;
		overflow: hidden;
		z-index: 1;
		height: 100%;
	}
	
	.x-bscroll {
		width: 100%;
		position: absolute;
		overflow: hidden;
		z-index: 1;
		height: 1618px;
	}
	
	.space {
		margin: 10px;
	}
	
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: space-between;
	}
	
	.slider-item {
		margin: 0;
		background-repeat: no-repeat;
		background-position: 0% 0%;
		background-size: cover;
		background-color: #22C3AA
	}
	
	.x-wrapper {
		display: flex;
		flex-direction: column;
		width: 750px;
		justify-content: space-between;
		/*height: 1535px;*/
		padding-bottom: 118px;
	}
	
	.banner {
		padding-top: 80px;
		width: 100%;
		/*height: 340px;*/
		/*margin-bottom: 30px;*/
		/*overflow: hidden;*/
	}
	
	.banner img {
		width: 100%;
	}
	
	.shadowSpace {
		background-color: #f6f6f6;
		width: 750px;
		height: 20px;
	}
	
	#app {}
	
	.solidOne {
		height: 20px;
		background-color: #f6f6f6;
	}
</style>