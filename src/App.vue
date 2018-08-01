<template>
					<div id="app">
							<router-view/>
					</div>

</template>

<script>
import BScroll from 'better-scroll'
	
export default {
	name:'app' 
}
</script>

<style scoped>
.bscroll{
    width: 100%;
    height: 100%;
    position:absolute;
    overflow: hidden;
    z-index: 1;
}
#app{
	overflow-y:hidden
}
</style>
