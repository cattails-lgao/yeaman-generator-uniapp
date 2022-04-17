<template>
	<view>
		<c-button :width="300" :loading="btnLoading" @cTap="login">登录</c-button>
		<c-gap />
		<c-tabs 
			:tabs="tabsList"  
			:config="{
				defaultSize: 28
			}"
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnLoading: false,
				tabsList: Array.from(new Array(10), (item, index) => {
					return {
						name: 'tab' + index
					}
				})
			}
		},
		onLoad() {

		},
		methods: {
			login() {
				
			}
		}
	}
</script>

<style lang="scss" scope>
	
</style>
