<template>
	<view class="cell flex flex-a-c flex-j-b" :style="[ cellStyle ]" :class="[ cellClass ]">
		<view class="flex flex-a-c">
			<template v-if="showIcon">
				<slot name="icon">
					<view class="left-icon mr-16r bg-color-primary"></view>
				</slot>				
			</template>
			<slot>
				<text class="font-28r color-base">{{ title }}</text>
			</slot>
		</view>
		<view>
			<slot name="right-val"></slot>
			<template v-if="showArrow">
				<slot name="right-icon">
					<text class="ml-16r iconfont font-28r">&#xe603;</text>
				</slot>				
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			showIcon: {
				type: Boolean,
				default: true
			},
			showArrow: {
				type: Boolean,
				default: true
			},
			cellStyle: Object,
			cellClass: {
				type: String,
				default: 'px-32r'
			}
		}
	}
</script>

<style scoped lang="scss">
.cell {
	.left-icon {
		width: 6rpx;
		height: 36rpx;
	}
}
</style>
