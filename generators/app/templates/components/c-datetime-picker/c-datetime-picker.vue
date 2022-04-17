<template>
	<view class="yu-datetime-picker">
		<view 
			class="yu-datetime-mask" 
			:class="{ 'show': showPicker }" 
			@tap="hide" 
			@touchmove.stop.prevent
			catchtouchmove="true"
		></view>
		
		<view class="yu-datetime-content" :class="{ 'show': showPicker }">
			<view class="yu-datetime-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="yu-datetime-btn" @tap="pickerCancel">取消</view>
				<view class="yu-datetime-btn" :style="{color: color}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="yu-datetime-view">
				<picker-view :indicator-style="itemHeight" :value="values" @change="bindChange">
					<picker-view-column v-if="defaultShowClomn.year" class="font-a-c">
						<block v-for="(item,index) in dateObj.years" :key="index">
							<view class="yu-datetime-item">{{item}}年</view>
						</block>
					</picker-view-column>
					<picker-view-column v-if="defaultShowClomn.month" class="font-a-c">
						<block v-for="(item,index) in dateObj.months" :key="index">
							<view class="yu-datetime-item">{{item}}月</view>
						</block>
					</picker-view-column>
					<picker-view-column v-if="defaultShowClomn.day" class="font-a-c">
						<block v-for="(item,index) in dateObj.days" :key="index">
							<view class="yu-datetime-item">{{item}}日</view>
						</block>
					</picker-view-column>
					<picker-view-column v-if="defaultShowClomn.hour" class="font-a-c">
						<block v-for="(item,index) in dateObj.hours" :key="index">
							<view class="yu-datetime-item">{{item}}时</view>
						</block>
					</picker-view-column>
					<picker-view-column v-if="defaultShowClomn.minute" class="font-a-c">
						<block v-for="(item,index) in dateObj.minutes" :key="index">
							<view class="yu-datetime-item">{{item}}分</view>
						</block>
					</picker-view-column>
					<picker-view-column v-if="defaultShowClomn.second" class="font-a-c">
						<block v-for="(item,index) in dateObj.seconds" :key="index">
							<view class="yu-datetime-item">{{item}}秒</view>
						</block>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "yuDatetimePicker",
		props: {
			current: { //默认显示当前日期时间
				type: Boolean,
				default () {
					return true
				}
			},
			color: { //颜色
				type: String,
				default () {
					return '#3279e4'
				}
			},
			startYear: { //开始年份
				type: [String, Number],
				default () {
					return new Date().getFullYear()
				}
			},
			endYear: { //结束年份
				type: [String, Number],
				default () {
					return '2050'
				}
			},
			value: { //设置默认日期时间，优先级高于current
				type: String,
				default () {
					return ''
				}
			},
			showClomn: {
				type: Object,
				default: () => {
					return {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true
					}
				}
			}
		},
		data() {
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const hour = date.getHours();
			const minute = date.getMinutes();
			const second = date.getSeconds();
			const dates = [];
			const months = [];
			const years = [];
			const days = [];
			const hours = [];
			const minutes = [];
			const seconds = [];
			for (let i = month; i <= month + 2; i++) { //获取包括当前月份在内的3个月内的日期
				let localMonth = i;
				if (i >= 13) localMonth -= 12;
				
				let localYear = year;
				if (i == 13) localYear += 1;
				
				const total = new Date(localYear, localMonth, 0).getDate();
				
				if (i == month) {
					for (let j = day; j <= total; j++) {
						let m = localMonth;
						let d = j;
						if (localMonth < 10) {
							m = '0' + m;
						}
						if (j < 10) {
							d = '0' + d;
						}
						const str = year + '-' + m + '-' + d;
						dates.push(str);
					}
				} else {
					for (let j = 1; j <= total; j++) {
						let m = localMonth;
						let d = j;
						if (localMonth < 10) {
							m = '0' + m;
						}
						if (j < 10) {
							d = '0' + d;
						}
						const str = year + '-' + m + '-' + d;
						dates.push(str);
					}
				}
			}
			
			for (let i = parseInt(this.startYear); i <= this.endYear; i++) {
				years.push(i);
			}
			
			for (let i = 1; i <= 12; i++) {
				let str = i;
				if (i < 10) {
					str = '0' + str;
				} else {
					str = '' + str;
				}
				
				months.push(str);
			}
			
			if (this.value) {
				let valueArr = this.value.split(' ');
				let valueDateArr = valueArr[0].split('-');
				let totalCurrent = new Date(valueDateArr[0], valueDateArr[1], 0).getDate();
				for (let i = 1; i <= totalCurrent; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					days.push(str);
				}
			} else {
				let totalCurrent = new Date(year, month, 0).getDate();
				for (let i = 1; i <= totalCurrent; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					days.push(str);
				}
			}
			
			// 时
			for (let i = 0; i < 24; i++) {
				let str = i;
				if (i < 10) {
					str = '0' + str;
				} else {
					str = '' + str;
				}
				hours.push(str);
			}
			// 分
			for (let i = 0; i < 60; i++) {
				let str = i;
				if (i < 10) {
					str = '0' + str;
				} else {
					str = '' + str;
				}
				minutes.push(str);
			}
			// 秒
			for (let i = 0; i < 60; i++) {
				let str = i;
				if(i < 10){ str = '0' + str;}
				else{str = '' + str;}
				seconds.push(str);
			}
			
			const dateObj = {
				dates,
				years,
				months,
				days,
				hours,
				minutes,
				seconds
			}
			
			return {
				year,
				month,
				day,
				hour,
				minute,
				second,
				dateObj,
				defaultShowClomn: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				values: [0, 0, 0, 0, 0, 0],
				selectArr: [],
				selectRes: "",
				showPicker: false,
				dateValues: [0, 0, 0, 0]
			};
		},
		created() {
			this.defaultShowClomn = {
				...this.defaultShowClomn,
				...this.showClomn
			}
			
			this.initDate();
			if (!this.value && this.current) {
				this.showCurrent();
			}
		},
		methods: {
			initDate() {
				//解析默认显示的日期时间
				if (this.value) {
					let values = [0, 0, 0, 0, 0, 0];
					let dateValues = [0, 0, 0];
					let valueStr = this.value;
					let valueArr = valueStr.split(' ');
					let valueDateArr = valueArr[0].split('-');
					let valueTimeArr = valueArr[1].split(':');
					
					values[0] = (valueDateArr[0] - this.startYear) > 0 ? valueDateArr[0] - this.startYear : 0;
					values[1] = parseInt(valueDateArr[1]) - 1;
					values[2] = parseInt(valueDateArr[2]) - 1;
					values[3] = parseInt(valueTimeArr[0]);
					values[4] = parseInt(valueTimeArr[1]);
					values[5] = parseInt(valueTimeArr[2]);
					this.$nextTick(() => {
						this.values = values;
					})
					if ((valueDateArr[0] - this.startYear) >= 0) {
						this.selectArr = [
							valueDateArr[0], 
							valueDateArr[1], 
							valueDateArr[2], 
							valueTimeArr[0],
							valueTimeArr[1], 
							valueTimeArr[2]
						];
						this.selectRes = this.value;
					} else {
						this.selectArr = [
							this.formatNum(this.startYear), 
							valueDateArr[1], 
							valueDateArr[2],
							valueTimeArr[0], 
							valueTimeArr[1], 
							valueTimeArr[2]
						];
						this.selectRes = `${this.formatNum(this.startYear)}-${valueDateArr[1]}-${valueDateArr[2]} ${valueTimeArr[0]}:${valueTimeArr[1]}:${valueTimeArr[2]}`;
					}
					
					return;
				}
				
				this.selectArr = [this.formatNum(this.startYear), '01', '01', '00', '00', '00'];
				this.selectRes = `${this.formatNum(this.startYear)}'-01-01 00:00:00`;
			},
			showCurrent() { //显示当前的日期时间
				const arr = [0, 0, 0, 0, 0, 0];
				this.selectArr = [];
				this.selectRes = '';
				
				if(this.defaultShowClomn.year) {
					this.selectArr[0] = this.formatNum(this.year);
					this.selectRes += this.formatNum(this.year);
				}
				if(this.defaultShowClomn.month) {
					this.selectArr[1] = this.formatNum(this.month);
					if(this.defaultShowClomn.year) {
						this.selectRes += '-' + this.formatNum(this.month);
					} else {
						this.selectRes += this.formatNum(this.month);
					}
				}
				if(this.defaultShowClomn.day) {
					this.selectArr[2] = this.formatNum(this.day);
					if(this.defaultShowClomn.month) {
						this.selectRes += '-' + this.formatNum(this.day);
					} else {
						this.selectRes += this.formatNum(this.day);
					}
				}
				
				
				if(this.defaultShowClomn.hour) {
					this.selectArr[3] = this.formatNum(this.hour);
					this.selectRes += ' ' + this.formatNum(this.hour);
				}
				if(this.defaultShowClomn.minute) {
					this.selectArr[4] = this.formatNum(this.minute);
					if(this.defaultShowClomn.hour) {
						this.selectRes += ':' + this.formatNum(this.minute);
					} else {
						this.selectRes += this.formatNum(this.minute);
					}
				}
				if(this.defaultShowClomn.second) {
					this.selectArr[5] = this.formatNum(this.second);
					this.selectRes += ':' + this.formatNum(this.second);
				}
				
				arr[0] = this.year - this.startYear;
				arr[1] = this.month - 1;
				arr[2] = this.day - 1;
				arr[3] = this.hour;
				arr[4] = this.minute;
				arr[5] = this.second;
				
				this.$nextTick(() => {
					this.values = arr;
				})
			},
			initDayArr(year, month) { //初始化月份天数
				let totalDay = new Date(year, month, 0).getDate();
				let dayArr = [];
				for (let i = 1; i <= totalDay; i++) {
					if (i < 10) {
						i = '0' + i;
					} else {
						i = i + '';
					}
					dayArr.push(i);
				};
				return dayArr;
			},
			formatNum(num) { //日期时间的初始化
				return num < 10 ? '0' + num : num + '';
			},
			show() { //日期时间的显示
				this.showPicker = true;
			},
			hide() { //日期时间的隐藏
				this.showPicker = false;
			},
			bindChange(e) { //默认滚动日期时间方法
				let valueArr = e.detail.value;
				let year = "";
				let	month = "";
				let	day = "";
				let	hour = "";
				let	minute = "";
				let	second = "";
				let selectArr = this.selectArr;
				let dayArr = [];
				year = this.dateObj.years[valueArr[0]];
				month = this.dateObj.months[valueArr[1]];
				day = this.dateObj.days[valueArr[2]];
				hour = this.dateObj.hours[valueArr[3]];
				minute = this.dateObj.minutes[valueArr[4]];
				second = this.dateObj.seconds[valueArr[5]];
				if (year != selectArr[0]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.days = dayArr;
				};
				if (month != selectArr[1]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.days = dayArr;
				};
				this.selectArr = [];
				this.selectRes = '';
				
				if(this.defaultShowClomn.year) {
					this.selectArr[0] = year;
					this.selectRes += year;
				}
				
				if(this.defaultShowClomn.month) {
					this.selectArr[1] = month;
					if(this.defaultShowClomn.year) {
						this.selectRes += '-' + month;
					} else {
						this.selectRes += month;
					}
				}
				if(this.defaultShowClomn.day) {
					this.selectArr[2] = day;
					if(this.defaultShowClomn.month) {
						this.selectRes += '-' + day;
					} else {
						this.selectRes += day;
					}
				}
				if(this.defaultShowClomn.hour) {
					this.selectArr[3] = hour;
					this.selectRes += ' ' + hour;
				}
				
				if(this.defaultShowClomn.minute) {
					this.selectArr[4] = minute;
					if(this.defaultShowClomn.hour) {
						this.selectRes += ':' + minute;
					} else {
						this.selectRes += minute;
					}
				}
				
				if(this.defaultShowClomn.second) {
					this.selectArr[5] = second;
					this.selectRes += ':' + second;
				}
				
				this.$nextTick(() => {
					this.values = valueArr;
				})
			},
			pickerCancel() { //日期时间取消
				this.$emit("cancel", {
					selectArr: this.selectArr
				});
				this.hide();
			},
			pickerConfirm(e) { //日期时间确定
				this.$emit("confirm", {
					selectArr: this.selectArr,
					selectRes: this.selectRes
				});
				this.hide();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.show {
		display: block;
	}

	.yu-datetime-picker {
		position: relative;
		z-index: 888;
	}

	.yu-datetime-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.yu-datetime-mask.show {
		visibility: visible;
		opacity: 1;
	}

	.yu-datetime-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.yu-datetime-content.show {
		transform: translateY(0);
	}

	.yu-datetime-hd {
		display: flex;
		align-items: center;
		padding: 0 30upx;
		height: 44px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 15px;
		justify-content: space-between;
	}

	.yu-datetime-btn {
		font-size: 14px;
	}

	.yu-datetime-hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.yu-datetime-view {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 1);
		z-index: 666;
	}

	.yu-datetime-view picker-view {
		height: 100%;
	}

	.yu-picker-column {
		-webkit-flex: 2;
		-webkit-box-flex: 2;
		flex: 2;
	}

	.yu-datetime-item {
		text-align: center;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
	}
</style>
