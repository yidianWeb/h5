/*!
 * Service Process Component Vue
 *
 * 服务流程公用组件
 *
 * @author zhaoyimeng
 * @version 1.0.0 20171009
 */

<template>
<div class="bottom-container">
  <div class="custom-service-title">
    <img class="custom-service-image" :src="customService" />
    <span class="custom-service-text">服务流程</span>
  </div>
  
  <div class="process-container">
    <div class="services">
      <div class="process-img-container">
        <img class="process-img" :src="processConsult" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processOrder" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processDesign" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processDeliver" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processFinish" />
      </div>
    </div>
    <div class="process-text-container">
      <span class="process-text processtext11">咨询沟通</span>
      <span class="process-text processtext12">下单支付</span>
      <span v-if="type === 'design'" class="process-text processtext1">设计中</span>
      <span v-if="type === 'video'" class="process-text processtext2">制作中</span>
      <span v-if="type === 'design'" class="process-text processtext3">交付源文件</span>
      <span v-if="type === 'video'" class="process-text processtext4">交付成品</span>
      <span v-if="type === 'design'" class="process-text processtext5">完成评价</span>
      <span v-if="type === 'video'" class="process-text processtext6">完成评价</span>
    </div>
  </div>
</div>
</template>

<script>
import {
  imageUrls
} from "../../lib/constants";

export default {
  props: {
    type: String
  },

  data() {
    return {
      customService: imageUrls.navigation.customService,
      processConsult: imageUrls.process.consult,
      processOrder: imageUrls.process.order,
      processDesign: imageUrls.process.design,
      processDeliver: imageUrls.process.deliver,
      processFinish: imageUrls.process.finish
    };
  }
};
</script>

<style scoped>
.custom-service-title {
  display: flex;
  height: 98px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid  #eeeeee;
}

.custom-service-image {
  width: 44px;
  height: 38px;
}

.processtext11{
	margin-left:29px
}
.processtext12,.processtext2,.processtext3,.processtext6{
	margin-left:63px;
}
.processtext1,.processtext2,.processtext4{
	margin-left:74px
}
.processtext5{
	margin-left:52px
}

.custom-service-text {
  margin-left: 20px;
  font-size: 32px;
  color: #333333;
}

.bottom-container {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 290px;
}

.process-img {
  width: 50px;
  height: 50px;
}

.arrow {
  height: 1px;
  background-color: #239af5;
  width: 82px;
  margin-left: 9.5px;
  margin-right: 9.5px;
  margin-top: 25px;
}

.process-container {
  display: flex;
  flex-direction: column;
  height: 192px;
}

.services {
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-left: 48px;
}

.process-img-container {
  display: flex;
  flex-direction: row;
}

.process-text-container {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  margin-bottom: 50px;
}

.process-text {
  margin-top: 30px;
  font-size: 22px;
  color: #666666;
  /*margin-left: 64px;*/
}
</style>
