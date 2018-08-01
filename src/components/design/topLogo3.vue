
<template>
  <div class="toplogo">
	<li class="fontleft" @click="handleClickBrandDesigner">
		<i class="backindex"><img src="./back.png"></i>
		<!--<i class="Asolid">返回</i>-->
	</li>
	<span class="shadowSpaceTop">
		精品案例
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
      this.$router.back(-1)
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
		height: 100px;
		background-color: #f6f6f6;
		font-size: 36px;
		line-height: 100px;
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
  width: 20px;
  height: 34px;
}
.shadowSpaceTop{
  position: absolute;
  width: 100%;
  text-align: center;
}
</style>
