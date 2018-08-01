/*!
 * Service Content Component Vue
 *
 * 服务内容公用组件
 *
 * @author songhua
 * @version 1.0.0 20180727
 */

<template>
<div>
  <div class="custom-service-title">
    <img class="custom-service-image" :src="customService" />
    <span class="custom-service-text">服务内容与规范</span>
  </div>
  <div class="content-text">
    <span v-for="(item, index) in String(refundsRule).split('\n')" class="text">{{item}}</span>
  </div>
</div>
</template>

<script>
import {
  imageUrls
} from "../../lib/constants";

export default {
  props: {
    refundsRule: String
  },

  data() {
    return {
      customService: imageUrls.navigation.customService,
    };
  }
};
</script>

<style scoped>
.like-wrapper {
  display: flex;
  flex-direction: column;
}

.custom-service-title {
  display: flex;
  height: 98px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
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

.image {
  width: 20px;
  height: 20px;
}

.text {
  font-size: 26px;
  color: #666666;
  margin-bottom: 34px
}

.content-text {
  display: flex;
  flex-direction: column;
  margin-top: 44px;
  padding-bottom: 22px;
  margin-left: 36px;
  margin-right: 36px;
}
</style>
