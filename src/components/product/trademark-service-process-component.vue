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
        <img class="process-img" :src="processConfirm" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processOrder" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processSign" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processSubmit" />
      </div>
    </div>
    <div class="process-text-container">
      <span class="process-text" :style="{ 'margin-left': 29}">咨询沟通</span>
      <span class="process-text" :style="{ 'margin-left': 63}">商标确认</span>
      <span class="process-text" :style="{ 'margin-left': 63}">下单支付</span>
      <span class="process-text" :style="{ 'margin-left': 52}">委托书签订</span>
      <span class="process-text" :style="{ 'margin-left': 52}">注册提交</span>
    </div>
  </div>
  <div class="process-container-bottom">
    <div class="services">
      <div class="process-img-container">
        <img class="process-img" :src="processReceipt" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processSearch" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processPublicity" />
        <div class="arrow" />
      </div>
      <div class="process-img-container">
        <img class="process-img" :src="processCertificate" />
      </div>
    </div>
    <div class="process-text-container">
      <span class="process-text" :style="{ 'margin-left': 29}">收到回执</span>
      <span class="process-text" :style="{ 'margin-left': 63}">商标盲查</span>
      <span class="process-text" :style="{ 'margin-left': 63}">商标公示</span>
      <span class="process-text" :style="{ 'margin-left': 63}">下发证书</span>
    </div>
  </div>
</div>
</template>

<script>
import {
  imageUrls
} from "../../lib/constants";

export default {
  data() {
    return {
      customService: imageUrls.navigation.customService,
      processConsult: imageUrls.process.consult,
      processOrder: imageUrls.process.order,
      processConfirm: imageUrls.process.confirm,
      processSign: imageUrls.process.sign,
      processSubmit: imageUrls.process.submit,
      processReceipt: imageUrls.process.receipt,
      processSearch: imageUrls.process.search,
      processPublicity: imageUrls.process.publicity,
      processCertificate: imageUrls.process.certificate
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
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
}

.custom-service-image {
  width: 44px;
  height: 38px;
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
}

.process-container-bottom {
  display: flex;
  flex-direction: column;
  margin-top: 29px;
  margin-bottom: 50px;
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
}

.process-text {
  margin-top: 30px;
  font-size: 22px;
  color: #666666;
}
</style>
