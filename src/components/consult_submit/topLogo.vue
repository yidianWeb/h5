
<template>
  <div class="toplogo">
    <li class="fontleft" @click="handleClickBrandDesigner">
      <i class="backindex"><img src="./back.png"></i>
      <!--<i class="Asolid">返回</i>-->
    </li>
    <span class="shadowSpaceTop">
      咨询提交
	  </span>
    <!--<li class="imglogo">-->
    <!--<img src="../../lib/favicon.png">-->
    <!--</li>-->
  </div>
</template>

<script>
  export default {
    methods: {
      handleClickBrandDesigner: function(item) {
        this.$router.push("/");
      }
    }
  }
</script>

<style scoped>
  .Asolid{
    position: absolute;
    height:50px;
    left: 80px;
    top:24px;
  }
  .i{
    display: inline-block;
  }
  li{
    list-style: none;
  }
  .fontleft{
    position: relative;
    padding-left: 20px;
    width: 120px;
    height: 100%;
    font-size: 50px;
    z-index: 1;
  }
  .backindex{
    position: absolute;

  }
  .toplogo{
    position: fixed;
    width: 750px;
    height: 80px;
    background-color: #ffffff;
    font-size: 36px;
    line-height: 80px;
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
    /* padding-right: 20px; */
  }
  .imglogo{
    padding-right: 20px;
  }
  /*20180730  xinjianan*/
  .backindex img{
    width: 121px;
    height: 66px;
  }
  .shadowSpaceTop{
    position: absolute;
    width: 100%;
    text-align: center;
  }

</style>
