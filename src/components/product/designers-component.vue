/*!
 * Designers Component Vue
 *
 * 设计师组件
 *
 * @author songhua
 * @version 1.0.0 2018727
 */

<template>
<div class="wrapper2">
  <div class="designer-title">
    <div class="designer-title-left">
      <img v-if="designerObject.name === '资深设计师'" class="image-nav" :src="seniorDesigner" />
      <img v-else-if="designerObject.name === '总监设计师'" class="image-nav" :src="directorDesigner" />
      <img v-else-if="designerObject.name === '策划总监'" class="image-nav" :src="directorDesigner" />
      <img v-else-if="designerObject.name === '设计总监'" class="image-nav" :src="directorDesigner" />
      <img v-else-if="designerObject.name === '专家设计师'" class="image-nav" :src="expertDesigner" />
      <img v-else-if="designerObject.name === '动画设计师'" class="image-nav" :src="motionDesigner" />
      <img v-else-if="designerObject.name === '资深顾问'" class="image-nav" :src="seniorAdviser" />
      <img v-else-if="designerObject.name === 'LOGO+商标注册'" class="image-nav" :src="seniorAdviser" />
      
      
      <div class="designer-container">
        <div class="top-container">
          <span class="designer-level">{{designerObject.name}}</span>
          <!--<span v-if="!findDiscount" class="price">￥{{designerObject.price / 100}}元/{{productTypeData.unit}}</span>-->
          <!--<div v-else class="discount-container">-->
            <!--<img v-if='findDiscount.quantity' class="discount-num-image" :src="discountNum" />-->
            <!--<span v-if='findDiscount.quantity' class="discount-num-text">前{{findDiscount.quantity}}名</span>-->
<!--            <span class="discountPrice">￥{{findDiscount.price / 100}}元/{{productTypeData.unit}}</span>-->
          <!--</div>-->
        </div>
        <div class="top-container">
          <div class="star-container">
            <img v-for="item in designerObject.grade" class="star" :src="star" />
          </div>
          <!--<span v-if="findDiscount" class="old-price">￥{{designerObject.price / 100}}元/{{productTypeData.unit}}</span>-->
        </div>
      </div>
    </div>
  </div>
  
  <!--<span class="introduce">{{designerObject.introduce}}</span>-->
  <span class="introduce" v-for="item1 in String(designerObject.introduce).split('\n')">
      <p>{{item1}}</p>
  </span>
</div>
</template>

<script>
import {
  imageUrls
} from '../../lib/constants'


export default {
  props: {
    designerObject: Object,
    productTypeData: Object,
    discountList: Array
  },

  data() {
    return {
      star: imageUrls.navigation.newStar,
      seniorDesigner: imageUrls.navigation.seniorDesigner,
      directorDesigner: imageUrls.navigation.directorDesigner,
      expertDesigner: imageUrls.navigation.expertDesigner,
      seniorAdviser: imageUrls.navigation.seniorAdviser,
      motionDesigner: imageUrls.navigation.motionDesigner,
      discountNum: imageUrls.navigation.discountNum
    }
  },

//methods: {
//  handleClickProduct: function() {
//    this.$router.push({
//      name: 'submit-order',
//      params: {
//        designerObject: this.designerObject,
//        discountItem: this.findDiscount,
//        productTypeData: this.productTypeData
//      }
//    })
//  }
//},

  computed: {
    findDiscount: function() {
      for (var discountItem of this.discountList) {
        if (discountItem.productGrade === this.designerObject.grade) {
          return discountItem
        }
      }

      return null
    }
  }
}
</script>

<style scoped>
.wrapper2 {
  display: flex;
  flex-direction: column;
  width: 750px;
  padding: 10px 0 20px;
  border-top: 1px solid #eeeeee;
}

.designer-title {
  display: flex;
  flex-direction: row;
}

.image-nav {
  width: 98px;
  height: 98px;
  margin-left: 20px;
  margin-top: 30px;
}

.designer-title-left {
  display: flex;
  flex-direction: row;
}

.designer-level-container {
  display: flex;
  flex-direction: column;
}

.designer-level {
  margin-top: 44px;
  color: #333333;
  font-size: 30px;
}

.star-container {
  display: flex;
  flex-direction: row;
}

.star {
  width: 39px;
  height: 38px;
  margin-right: 12px;
  margin-top: 8px;
}

.price {
  margin-top: 44px;
  font-size: 30px;
  color: #ff4f56;
}

.introduce {
  margin: 10px 20px 0px 20px;
  font-size: 28px;
  color: #666666;
  line-height: 40px;
}

.introduce p{
  margin: 0;
}

.discount-container {
  display: flex;
  flex-direction: row;
  margin-top: 44px;
  align-items: center;
}

.discount-num-image {
  width: 96px;
  height: 26px;
}

.discount-num-text {
  font-size: 22px;
  margin-left: 4px;
  color: #1098f7;
}

.discountPrice {
  font-size: 30px;
  color: #ff4f56;
}

.old-price {
  font-size: 22px;
  color: #999999;
  text-decoration: line-through;
}

.top-container {
  display: flex;
  flex-direction: row;
  width: 584px;
  justify-content: space-between;
  align-items: center;
  margin-left: 28px;
  margin-right: 20px;
}

.designer-container {
  display: flex;
  flex-direction: column;
}
</style>
