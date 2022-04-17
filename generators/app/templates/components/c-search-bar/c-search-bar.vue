<template>
	<view class="flex flex-a-c" :class="setClass">
		<view class="flex flex-a-c px-40r mr-32r flex-1" :style="[setStyle]">
			<text class="iconfont mr-16r color-ccc flex-s">&#xe752;</text>
			<view class="flex flex-a-c flex-j-b flex-1">
				<input
					:value="value"
					type="text"
					class="flex-1 font-24r color-base"
					:placeholder="placeholder"
					placeholder-class="color-ccc font-24r"
					@input="input"
				/>
				<uni-icons v-show="value.length" color="#c0c4cc" size="20" type="clear" @click="clearValue" />
			</view>
		</view>
		<text class="flex-s font-28r color-base" @tap="rightClick">{{ rightText }}</text>
	</view>
</template>

<script>
export default {
	props: {
		setClass: {
			type: String,
			default: 'mx-32r'
		},
		height: {
			type: Number,
			default: 64
		},
		bgColor: {
			type: String,
			default: '#F7F7F7'
		},
		radiusSize: {
			type: Number,
			default: 32
		},
		placeholder: {
			type: String,
			default: ''
		},
		rightText: {
			type: String,
			default: '搜索'
		},
		value: {
			type: String,
			default: ''
		}
	},
	model: {
		prop: 'value',
		// #ifndef MP-WEIXIN
		event: 'change',
		// #endif
		// #ifdef MP-WEIXIN
		event: 'input'
		// #endif
	},
	computed: {
		setStyle() {
			const styles = {
				height: this.height + 'rpx',
				background: this.bgColor,
				borderRadius: this.radiusSize + 'rpx'
			};
			return styles;
		}
	},
	methods: {
		input(e) {
			// #ifndef MP-WEIXIN
			this.$emit('change', e.detail.value);
			// #endif
			// #ifdef MP-WEIXIN
			this.$emit('input', e.detail.value);
			// #endif
		},
		clearValue() {
			this.$emit('change', '');
		},
		rightClick() {
			this.$emit('rightClick');
		}
	}
};
</script>

<style scoped lang="scss"></style>
