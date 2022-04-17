/**
 * 是否为数字
 * @param {Object} num
 */
function isNumber(num) {
	// return Object.prototype.toString.call(num) === "[object Number]";
	return typeof num === 'number';
}
/**
 * 是否为字符串
 * @param {Object} str
 */
function isString(str) {
	// return Object.prototype.toString.call(str) === "[object String]";
	return typeof str === 'string';
}
/**
 * 是否为函数
 * @param {Object} func
 */
function isFunc(func) {
	return Object.prototype.toString.call(func) === "[object Function]";
}
/**
 * 是否为数组
 * @param {Object} arr
 */
function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
}
/**
 * 是否是对象
 * @param {Object} obj
 */
function isObject(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]";
}
/**
 * 是否为布尔值
 * @param {Object} bool
 */
function isBoolean(bool) {
	return typeof bool === 'boolean';
}
/**
 * 是否为时间对象
 * @param {Object} date
 */
function isDate(date) {
	return Object.prototype.toString.call(date) === "[object Date]";
}
/**
 * 判断对象是否为空
 * @param {Object} obj
 */
function isEmptyObj(obj, mode = 'for') {
	if(mode === 'for') {
		for (let attr in obj) {
			return false;
		}
		return true;			
	}
	
	if(mode === 'keys') {
		return !Boolean(Object.keys(obj).length);
	}
}
/**
 * 小数四舍五入
 * @param {number} number
 * @param {number} precision
 */
function decimalRound(number, precision = 2) {
	//same as:
	//return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
	return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}
/**
 * 生成唯一ID
 */
function uRandom() {
	//用于生成uuid
	const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
/**
 * 从指定的数组里随机获取值
 * @param {Array} names
 */
function createRandomName(names) {
	return names[~~(Math.random() * names.length)];
}
/**
 * 过去了多久
 * @param {Date} timestamp 时间戳
 */
function pastDateFormat(timestamp) {
	if (!timestamp || !isNumber(timestamp)) {
		console.error('时间格式错误', timestamp)
		return;
	}

	const second = 1000; // 秒
	const minute = 60 * second; // 分
	const hour = 60 * minute; // 时
	const day = 24 * hour; // 天
	const oneWeek = 7;
	// const oneMonth = 30;

	const nowTimestamp = new Date().getTime();
	const parameterDate = new Date(timestamp);
	const diffTimestamp = Math.abs(nowTimestamp - timestamp);
	if (diffTimestamp >= day) {
		const dayNumber = Math.floor(diffTimestamp / day);
		// if (dayNumber >= oneMonth)
		if (parameterDate.getFullYear() < new Date().getFullYear())
			return parameterDate.getFullYear() + '年' + (parameterDate.getMonth() + 1) + '月' + parameterDate
			.getDate() + '日';
		if (dayNumber >= oneWeek)
			return (parameterDate.getMonth() + 1) + '月' + parameterDate.getDate() + '日';

		return dayNumber + '天前';
	}

	if (diffTimestamp >= hour)
		return Math.floor(diffTimestamp / hour) + '小时前';

	if (diffTimestamp >= minute)
		return Math.floor(diffTimestamp / minute) + '分钟前';

	if (diffTimestamp >= second)
		return Math.floor(diffTimestamp / second) + '秒前';

	return '刚刚'
}
/**
 * 补零
 * @param {number} num 
 */
function fillZeroOfTime(num) {
	if (!isNumber(num)) {
		console.error('补零：该参数不是数字', num);
		return num;
	}

	if (num > 9) return num;

	return '0' + num;
}
/**
 * 时间格式化
 * @param {string} time
 * @param {string} fmt 格式
 */
function formatTime(time, fmt = 'YYYY-mm-dd HH:MM:SS') {
	let date;
	if(!time) {
		date = new Date();
	} else if(/^\d{10}$/.test(dateTime?.toString().trim())) {
		date = new Date(dateTime * 1000)
	} else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
		date = new Date(Number(dateTime))
	} else {
		date = new Date(
		  typeof dateTime === 'string'
			? dateTime.replace(/-/g, '/')
			: dateTime
		)
	}
	
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	let ret;
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		}
	};
	return fmt;
}
/**
 * 扫码进入-参数解析
 * @param {Object} scene
 */
function parseScene(scene) {
	const params = {}; // var params = {};也行        
	const deSceneRsp = decodeURIComponent(scene).split('&');
	for (let i = 0; i < deSceneRsp.length; i++) {
		params[deSceneRsp[i].split('=')[0]] = deSceneRsp[i].split('=')[1];
	}

	return params;
}

/**
 * 验证电子邮箱格式
 */
function isEmail(value) {
	return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
function isMobile(value) {
	return /^1[3456789]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
function isUrl(value) {
	return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/
		.test(value)
}

/**
 * 验证身份证号码
 */
function isIdCard(value) {
	return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
		value
	)
}

/**
 * 是否车牌号
 */
function isCarNo(value) {
	// 新能源车牌
	const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
	// 旧车牌
	const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
	if (value.length === 7) {
		return creg.test(value)
	} if (value.length === 8) {
		return xreg.test(value)
	}
	return false
}

/**
 * 金额,只允许2位小数
 */
function amountHasTwoPoint(value) {
	// 金额，只允许保留两位小数
	return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
function isChinese(value) {
	const reg = /^[\u4e00-\u9fa5]+$/gi
	return reg.test(value)
}

/**
 * 只能输入字母
 */
function isLetter(value) {
	return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
function isEnOrNum(value) {
	// 英文或者数字
	const reg = /^[0-9a-zA-Z]*$/g
	return reg.test(value)
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title, duration = 2000) {
	uni.showToast({
		title: String(title),
		icon: 'none',
		duration
	})
}

/**
 * px转rpx
 * @param {number} px 
 */
function pxToRpx(px) {
	return px / uni.getSystemInfoSync().windowWidth * 750;
}

/**
 * 分解时间
 * @param {string} time 'yyyy-MM-DD HH:mm:ss'
 */
function splitDate(time) {
	let now;
	if(time) {
		now = new Date(time);
	} else {
		now = new Date();
	}
	
	return {
		Year: now.getFullYear(), // 年份
		Month: now.getMonth() + 1, // 月份
		Date: now.getDate(), // 日期
		Hours: now.getHours(), // 小时
		Minutes: now.getMinutes(), // 分钟
		Seconds: now.getSeconds(), // 秒
		Day: now.getDay(), // 周几
		timespace: now.getTime(), // 时间戳
		Days: (year, month) => { // 总天数
			return new Date(year || now.getFullYear(), month || (now.getMonth() + 1), 0).getDate()
		}
	}
}

/**
 * 防抖
 * @param {func} c  
 * @param {number}  wait = 1000
 */
function throttle(cb, wait = 1000) {
	let timer = null;
	return (...args) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => cb.apply(this, args), wait)
	}
}

/**
 * 节流
 * @param {func} c  
 * @param {number}  wait = 1000
 */
function debounce(cb, wait = 1000) {
	let timer = null;
	return (...args) => {
		if (!timer) {
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
				cb(...args)
			}, wait)
		}
	}
}

export default Object.freeze({
	isNumber,
	isString,
	isFunc,
	isArray,
	isObject,
	isBoolean,
	isDate,
	isEmptyObj,
	isEmail,
	isMobile,
	isUrl,
	isIdCard,
	isCarNo,
	isChinese,
	isLetter,
	amountHasTwoPoint,
	isEnOrNum,
	decimalRound,
	uRandom,
	createRandomName,
	pastDateFormat,
	fillZeroOfTime,
	formatTime,
	parseScene,
	toast,
	pxToRpx,
	splitDate,
	throttle,
	debounce
})