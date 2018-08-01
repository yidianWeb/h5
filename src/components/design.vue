/*! * Brand Design Vue * * 品牌设计页(二级类目页) * * @author songhua * @version 1.0.0 2018727 */

<template>
	<div>
		<topLogo :urlname="productGroupData.name" class="topLogo" />

		<!--<div class="bscroll" ref="bscroll">-->
			<div :class="productGroupData.name == '商标注册' ? 'wrapper-trademark': 'wrapper22'">

				<div class="shadowSpace2" />
				<div v-if="productData.length !== 0" class="container">
					<div class="title-container">
						<img class="title-image" :src="titleImage" />
						<span class="title-text">选择{{productGroupData.name}}类型</span>
					</div>
					<div class="type-container">
						<div class="sub-type-container" v-for="(item, index) in productData">
							<div class="service">
								<img class="image" :src="item.img" @click="handleClick(item)" />
								<span class="text">{{item.name}}</span>
							</div>
							<div v-if="(index + 1) % 4 != 0" class="placeholder" />
						</div>
					</div>
				</div>

				<div v-if="nonStandardList.length !== 0" class="about" @click="goabout">

					<div class="describe-container">
						<div class="sub-describe-container">
							<div class="nonStand-container" v-for="(item, index) in nonStandardList">
								<span v-if="nonStandardList.length - index > nonStandardList.length % 4" class="describe-text">{{item}}</span>
								<span v-else class="describe-text" :style="{width:classObject + 'px' }">{{item}}</span>
							</div>
						</div>
					</div>
				</div>

				<!--<div class="shadowSpace3" />-->

				<div v-if="caseList.length > 0 && productGroupData.name !== '商标注册'">
					<div class="shadowSpace33" />
					<div class="title-container-detail">
						<img class="title-image" :src="titleImage" />
						<span class="title-text">优秀{{productGroupData.name}}</span>
					</div>

					<div v-for="(item, index) in caseList" @click="handleClickProductDetail(item)">
						<div class="great-brand-detail-container">
							<img :src="item.cover.split(',')[0]" class="great-brand-image" />
							<div class="sub-great-brand-container">
								<span class="great-brand-title">{{item.name}}</span>
								<span class="great-brand-describe">{{item.detailVal1.length > 28 ? (item.detailVal1.substring(0,28) + '...') : item.detailVal1}}</span>
								<div class="detail-info-right">

								</div>
							</div>
						</div>
						<div class="shadowSpace33" />
						<div v-if="index !== caseList.length - 1" class="split-line" />
					</div>
				</div>
			<!--</div>-->
		</div>

	</div>
</template>

<script>
	import topLogo from './design/topLogo'
	import BScroll from 'better-scroll'
	import bottomBanner from './product/bottomBanner.vue'

	import {
		baseUrl,
		imageUrls
	} from '../lib/constants'

	import {
		NetworkUtil
	} from '../lib/util'

	export default {
		data() {
			return {
				titleImage: imageUrls.navigation.title,
				preview: imageUrls.navigation.preview,
				praise: imageUrls.navigation.praise,
				productGroupData: {},
				productData: {},
				baseUrl: baseUrl,
				nonStandardList: [],
				caseList: [],
				urlId: this.$utils.getUrlKey('id'),
				groupListMap: {},
				urlname: this.$utils.getUrlKey('name')
				//				caseLikeStatusList: []
			}
		},

		methods: {
			goabout() {
				this.$router.push({
					name: 'about'
				})
			},
			getInfo() {
				let obj = {

					productOne: this.axios.get(this.baseUrl + '/product-type'),
					productTwo: this.axios.get(this.baseUrl + '/product-type-group?id=' + this.urlId),
					productThree: this.axios.get(this.baseUrl + '/case?productGroupId=' + this.productGroupData.id)
				}
				return obj
			},
			handleClick: function(item) {
				this.$router.push({
					name: 'product',
					params: {
						productTypeData: item
					}
				})
			},

			//
			//		    handleClickProductDetail: function(item) {
			//    NetworkUtil.streamRequest({
			//      method: 'POST',
			//      type: 'json',
			//      url: this.baseUrl + '/case/browse',
			//      headers: {
			//        'Content-Type': 'application/json'
			//      },
			//      body: {
			//        id: item.id,
			//        updateBy: this.userInfo.dingId
			//      }
			//    }, response => {
			//      NetworkUtil.streamRequest({
			//        method: 'GET',
			//        type: 'json',
			//        url: this.baseUrl + '/case?id=' + item.id
			//      }, result => {
			//        CacheUtil.setItem('case_' + item.id, 1800000, JSON.stringify(result[0]))
			//        RouterUtil.push({
			//          name: 'product-detail',
			//          params: {
			//            productDetailObject: result[0],
			//            groupListMap: this.groupListMap,
			//            caseLikeStatusList: this.caseLikeStatusList
			//          }
			//        })
			//      })
			//    })
			//  },

			handleClickProductDetail: function(item) {

				this.axios.get(this.baseUrl + '/case?id=' + item.id).then((res) => {
					var datas = res.data.data
					//					CacheUtil.setItem('case_' + item.id, 1800000, JSON.stringify(result[0]))

					let result = {
						data: JSON.stringify(datas[0]),
						expiration: new Date().getTime() + 1800000
					};
					var resStr = JSON.stringify(result)
					window.localStorage.setItem('case_' + item.id, resStr)

					this.$router.push({
						name: 'productdetail',
						query: {
							id: item.id
						},
						params: {
							productDetailObject: datas[0],
							groupListMap: this.groupListMap
						}
					})
				})

				//		      NetworkUtil.streamRequest({
				//		        method: 'POST',
				//		        type: 'json',
				//		        url: this.baseUrl + '/case/browse',
				//		        headers: {
				//		          'Content-Type': 'application/json'
				//		        },
				//		        body: {
				//		          id: item.id,
				//		          updateBy: this.userInfo.dingId
				//		        }
				//		      }, response => {})
			}
		},

		created: function() {

			const productG = window.localStorage.getItem('productGroupData')
			this.productGroupData = JSON.parse(productG)

			const productG2 = window.localStorage.getItem('productData')
			this.productData = JSON.parse(productG2)

			const productG3 = window.localStorage.getItem('groupListMap')
			this.groupListMap = JSON.parse(productG3)

			this.axios.all([this.getInfo().productOne, this.getInfo().productTwo, this.getInfo().productThree])
				.then(this.axios.spread((acct, perms, res) => {
					var resData = res.data.data
					this.caseList = []

					resData.forEach((item, index) => {
						if(!item.delFlag && item.status) {

							//							if(caNameData2) {
							//								this.caseList.push(JSON.parse(caNameData2))
							//							} else {
							this.caseList.push(item)
							//							}
							if(index + 1 === resData.length) {
								this.caseList.sort((a, b) => {
									if(a.sort === b.sort) return b.createDate - a.createDate
									return a.sort - b.sort
								})
								//            this.isDone = true
							}
						}

					})
				}));
		},
		mounted: function() {
			if(this.productGroupData.nonStandard) {
				this.nonStandardList = this.productGroupData.nonStandard.split(',')
			}
			//即定时器 20ms
//			this.$nextTick(() => {
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
		},
		components: {
			'topLogo': topLogo,
			bottomBanner
		},
		computed: {
			classObject: function() {
				//				        alert(window.screen.width)
				//				        alert(this.nonStandardList.length % 4)
				//				        alert(window.screen.width / (this.nonStandardList.length % 4))
				return window.innerWidth / (this.nonStandardList.length % 4)

			}

		}
	}
</script>

<style scoped>
	.wrapper22 {
		display: flex;
		flex-direction: column;
		width: 750px;
		/*height: 1200px;*/
	}
	
	/*.bscroll {
		width: 100%;
		position: absolute;
		overflow: hidden;
		z-index: 1;
		height: 100%;
	}*/
	
	.x-wrapper {
		display: flex;
		flex-direction: column;
		width: 750px;
		height: 1450px;
	}
	
	.wrapper-trademark {
		display: flex;
		flex-direction: column;
		width: 750px;
		height: 1200px;
		background-color: #f6f6f6;
	}
	
	.x-wrapper-trademark {
		display: flex;
		flex-direction: column;
		width: 750px;
		height: 1387px;
		background-color: #f6f6f6;
	}
	
	.container {
		/*display: flex;*/
		flex-direction: column;
		width: 750px;
		background-color: white;
	}
	
	.title-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 98px;
		align-items: center;
	}
	
	.title-container-detail {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-top: 28px;
	}
	
	.title-image {
		width: 28px;
		height: 38px;
	}
	
	.title-text {
		color: #333333;
		font-size: 32px;
		margin-left: 20px;
	}
	
	.type-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 726px;
		margin-left: 2px;
		margin-right: 2px;
		margin-bottom: -6px;
	}
	
	.sub-type-container {
		display: flex;
		flex-direction: row;
	}
	
	.placeholder {
		background: white;
		width: 2px;
		height: 28px;
	}
	
	.shadowSpace {
		background-color: #f6f6f6;
		width: 750px;
		height: 80px;
	}
	
	.shadowSpace3 {
		background-color: #f6f6f6;
		width: 750px;
		height: 20px;
	}
	
	.shadowSpace33 {
		background-color: #f6f6f6;
		width: 750px;
		height: 2px;
	}
	
	.service {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 180px;
		height: 132px;
		margin-bottom: 32px;
	}
	
	.image {
		width: 88px;
		height: 88px;
	}
	
	.text {
		font-size: 22px;
		color: #666666;
		margin-top: 20px;
	}
	
	.describe-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 40px;
	}
	
	.sub-describe-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: space-around;
	}
	
	.nonStand-container {
		display: flex;
		flex-direction: row;
	}
	
	.describe-text {
		padding-top: 33px;
		text-align: center;
		font-size: 24px;
		color: #333333;
		width: 187.5px;
		height: 90px;
		border-right: 1px solid #e8e8e8;
		border-top: 1px solid #e8e8e8;
	}
	
	.great-brand-detail-container {
		display: flex;
		flex-direction: row;
		width: 710px;
		height: 194px;
		margin-top: 32px;
		margin-bottom: 44px;
		margin-left: 20px;
	}
	
	.great-brand-image {
		width: 218px;
		height: 194px;
	}
	
	.great-brand-title {
		font-size: 30px;
		color: #333333;
	}
	
	.sub-great-brand-container {
		width: 500px;
		height: 200px;
		display: flex;
		flex-direction: column;
		margin-left: 20px;
	}
	
	.split-line {
		width: 750px;
		border-width: 1px;
		border-color: #dcdcdc;
	}
	
	.great-brand-describe {
		font-size: 28px;
		color: #666666;
		margin-top: 16px;
		margin-right: 46px;
		line-height: 40px;
	}
	
	.detail-info-right {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		margin-top: 28px;
		margin-right: 20px;
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
	
	.consult-suspend {
		width: 124px;
		height: 124px;
	}
	
	.topLogo {
		z-index: 999;
	}
	
	.shadowSpace2 {
		width: 100%;
		height: 80px;
	}
</style>