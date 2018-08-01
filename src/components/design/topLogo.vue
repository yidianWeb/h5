
<template>
  <div class="toplogo">
	<li class="fontleft" @click="handleClickBrandDesigner">
		<i class="backindex"><img src="./back.png"></i>
		<!--<i class="Asolid">返回</i>-->
	</li>
	<span class="shadowSpaceTop">
		{{urlname}}
	</span>
	<!--<li class="imglogo">-->
		<!--<img src="../../lib/favicon.png">-->
	<!--</li>-->
  </div>
</template>

<script>
export default {
	props:['urlname'],
  methods: {
  	handleClickBrandDesigner: function(item) {
  			window.location.href = '/'
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
		background-color: #f6f6f6;
		font-size: 36px;
		line-height: 80px;
		  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
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
