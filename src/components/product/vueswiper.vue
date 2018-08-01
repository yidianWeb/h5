<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item , index) in imgData">{{item}}</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';// 引入slider组件
import {imageUrls} from '../../lib/constants'

export default {
		 name: 'vueswiper',
		 props:[
       imgData
     ],
   data () {
      return {
//
      }
    },
    mounted(): {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
      })
    }
//    computed:{
//  	pages:function(){
//  		return [
//          {
//
//            style:{
//             	background:'url('+this.imgData[0]+')'
//            }
//          },
//          {
//
//           style:{
//            background:'url('+this.imgData[1]+')'
//            }
//          }
//        ]
//  	}
//  },
//  created:function(){
//
//  },
//    components: {
//        slider
//    }
}
</script>

<style type="text/css" scoped>
  .swiper-container {
    width: 600px;
    height: 300px;
  }
</style>
