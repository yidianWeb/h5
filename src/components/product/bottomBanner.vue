
<template>
  <div class="bottomlogo" @click="gogogo()">
			立即咨询
  </div>
</template>

<script>
export default {
	props:['urlname'],
  methods: {
  	gogogo: function(item) {
  			this.$router.push({
  				name:'consultSubmit'
  			})
  	}
  }
}
</script>

<style scoped>
.bottomlogo{
  position: fixed;
		width: 750px;
		height: 100px;
		background-color: #d71518;
		color: white;
		font-size: 36px;
		line-height: 100px;
		display:flex;
		display:-webkit-flex;
		justify-content:center;
		bottom: 0;
}

</style>
