<template>
	<button
		class="btn mx-0r my-0r py-0r px-0r font-32r"
		:class="[
			setClass, 
			disabled || loading ? 'btn-disabled' : ''
		]"
		:style="[setStyle]"
		:type="type"
		:size="size"
		:plain="plain"
		:disabled="disabled"
		:loading="loading"
		:form-type="formType"
		:open-type="openType"
		:session-from="sessionFrom"
		:send-message-title="sendMessageTitle"
		:send-message-path="sendMessagePath"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		:hover-class="hoverClass"
		:hover-start-time="hoverStartTime"
		:hover-stay-time="hoverStayTime"
		:hover-stop-propagation="hoverStopPropagation"
		:lang="lang"
		:app-parameter="appParameter"
		@getphonenumber="_getphonenumber"
		@getuserinfo="_getuserinfo"
		@error="_error"
		@opensetting="_opensetting"
		@launchapp="_launchapp"
		@tap.stop="_tap"
	>
		<slot></slot>
	</button>
</template>

<script>
let timer;
export default {
	props: {
		setClass: {
			type: String,
			default: 'bg-color-primary color-white'
		},
		width: {
			type: Number,
			default: 750
		},
		height: {
			type: Number,
			default: 80
		},
		color: {
			type: String,
			default: ''
		},
		bgColor: {
			type: String,
			default: ''
		},
		showRadius: {
			type: Boolean,
			default: true
		},
		radiusSize: {
			type: Number,
			default: 0 // s sm base cirlce
		},
		showBorder: {
			type: Boolean,
			default: true
		},
		borderWidth: {
			type: Number,
			default: 1
		},
		borderColor: {
			type: String,
			default: '#f1f1f1'
		},
		size: {
			type: String,
			default: 'default'
		},
		type: {
			type: String,
			default: ''
		},
		plain: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		formType: {
			type: String,
			default: ''
		},
		openType: {
			type: String,
			default: ''
		},
		hoverClass: {
			type: String,
			default: 'button-hover'
		},
		hoverStartTime: {
			type: Number,
			default: 20
		},
		hoverStayTime: {
			type: Number,
			default: 70
		},
		hoverStopPropagation: {
			type: Boolean,
			default: false
		},
		appParameter: {
			type: String,
			default: ''
		},
		lang: {
			type: String,
			default: 'en'
		},
		sessionFrom: {
			type: String,
			default: ''
		},
		sendMessageTitle: {
			type: String,
			default: ''
		},
		sendMessagePath: {
			type: String,
			default: ''
		},
		sendMessageImg: {
			type: String,
			default: ''
		},
		showMessageCard: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		setStyle() {
			const styles = {
				height: this.height + 'rpx',
				lineHeight: this.height + 'rpx',
				width: this.width + 'rpx'
			};

			if (this.bgColor) styles.backgroundColor = this.bgColor;
			if (this.color) styles.color = this.color;

			if (this.showBorder) styles.border = `${this.borderWidth}rpx solid ${this.borderColor}`;
			if (this.showRadius) styles.borderRadius = this.radiusSize + 'rpx';

			return styles;
		}
	},
	methods: {
		_tap(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);
			
			if(this.disabled || this.loading) return;

			this.$emit('cTap', e);
		},
		_getphonenumber(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);
			this.$emit('getphonenumber', e.detail);
		},
		_getuserinfo(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);

			this.$emit('getuserinfo', e.detail);
		},
		_error(e) {
			console.error('open-type', e.detail.errMsg);
		},
		_opensetting(e) {
			if (timer) return;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, 500);

			this.$emit('opensetting', e.detail.authSetting);
		},
		_launchapp() {
			this.$emit('launchapp');
		}
	}
};
</script>

<style lang="scss" scope>
.btn {
	&::after {
		border: none;
	}
}

.button-hover {
	background-color: rgba(0, 0, 0, 0.1);
	opacity: 0.7;
}

.btn-disabled {
	background-color: rgba($color: #000000, $alpha: $uni-opacity-disabled);
}
</style>
