<template>
	<div class="wrapper2">

		<toplogo2/>
		<div class="shadowSpace111" />

		<img src="./consult_submit/about.jpg">
		<div class="shadowSpace111" />
		<bottomBanner/>

	</div>

</template>
<script>
	import bottomBanner from './product/bottomBanner.vue'
	import toplogo2 from './product/toplogo2.vue'


	export default {
		components: {
			bottomBanner,
			toplogo2
		},

	}
</script>
<style scoped>
	.wrapper2 {
		width: 750px;
	}

	.wrapper2 img {
		width: 100%;
	}

	.shadowSpace111 {
		background-color: #f6f6f6;
		width: 750px;
		height: 80px;
	}
</style>
