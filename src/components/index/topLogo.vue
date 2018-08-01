<template>
  <div class="toplogo">
	<li class="imglogo">
			<img src="../../lib/favicon.png" class="imgfont">
	</li>
  </div>
</template>

<script>
//export default {
//  methods: {
//  	handleClickBrandDesigner: function(item) {
//      this.$router.push({name:'/' })
//  	}
//  }
//}
</script>

<style scoped>
.toplogo{
  	position: fixed;
	width: 750px;
	height: 80px;
	background-color: #f6f6f6;
	font-size: 36px;
	line-height: 80px;
	display:flex;
	display:-webkit-flex;
	justify-content:center;
	background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}
.imglogo{
	padding-right: 20px;
	list-style-type: none;
}
.imgfont{
	width: 173px;
	height: 22px;
}

</style>
