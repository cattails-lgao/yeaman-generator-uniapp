<template>
	<view 
		:style="{
			height: height + 'rpx',
			backgroundColor: bgColor
		}"
	></view>
</template>

<script>
	export default {
		props: {
			height: {
				type: Number,
				default: 12
			},
			bgColor: {
				type: String,
				default: '#f1f1f1'
			}
		}
	}
</script>

<style lang="scss" scope>
</style>
