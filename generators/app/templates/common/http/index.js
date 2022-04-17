import $Utils from '@/common/utils/index.js';
import baseURL, { GET, POST, SUCCESS_CODE } from './config.js';
import checkStatusCode from './statusCode.js';

const TIMEOUT = 10000;

function Axios() {
	const interceptors = {
		request: null,
		response: null
	}
	
	// 请求队列
	const requestTask = new Map();
	
	function before(callback) {
		if (!$Utils.isFunc(callback)) return;

		interceptors.request = callback;
	}

	function after(callback) {
		if (!$Utils.isFunc(callback)) return;

		interceptors.response = callback;
	}
	
	function abort(key) {
		if(!requestTask.has(key)) {
			console.error('取消失败寻找请求任务key失败', key);
			return;
		}
		
		const task = requestTask.get(key);
		task.abort();
		requestTask.delete(key);
	}
	
	function error(msg) {
		return new Error(msg)
	}
	
	/**
	 * 请求
	 * @param {Object}
	 * 	@property {object} path { url: '', method: POST, auth_with: true, isRecord: true }
	 * 	@property {object} data { a: 1, b: 1 }
	 * 	@property {number} timeout
	 * 	@property {object} header
	 * 	@property {string} dataType
	 */
	function request({ path, data = {}, timeout = TIMEOUT, header = {}, dataType = 'json', errCallback = null } = {}) {
		const abortKey = 'r_' + path.url;
		return new Promise((resolve, reject) => {
			let options = {
				url: baseURL + path.url,
				timeout,
				method: path.method,
				header,
				data,
				dataType,
				success: response => {
					const statusCode = response.statusCode;
					if(!checkStatusCode(statusCode)) {
						setTimeout(() => {
							uni.hideLoading();
						}, 300)
						reject(error('状态码错误：' + statusCode));
						return;
					}
					
					let rsp;
					
					if(interceptors.response && $Utils.isFunc(interceptors.response)) {
						rsp = interceptors.response(response);
					} else {
						rsp = response.data;
					}
					
					if(rsp.code !== SUCCESS_CODE) {
						uni.hideLoading();
						setTimeout(() => {
							uni.showToast({ title: rsp.msg, icon: 'none' });
						}, 300)
						
						if($Utils.isFunc(errCallback)) errCallback.call(null);

						reject(error('请求失败：' + rsp.msg));
						return;
					} 
					
					resolve(rsp);
				},
				fail: fail => {
					uni.showToast({ title: fail.errMsg, icon: 'none' });
					reject(error(fail.errMsg));
				},
				complete: complete => {
					requestTask.delete(abortKey);
					
					if(path.isRecord) {}
				}
			}
			
			if (options.method === GET)
				options.header = { ...options.header, 'content-type': 'application/x-www-form-urlencoded' };
			
			if (options.method === POST)
				options.header = { ...options.header, 'content-type': 'application/json' };
			
			if(interceptors.request && $Utils.isFunc(interceptors.request))
				options = interceptors.request(options, path);
				
			if (process.env.NODE_ENV === 'development') {
				console.log(options.url + ':' + JSON.stringify(options.data));
			}
			
			const task = uni.request(options);
			
			requestTask.set(abortKey, task);
		})
	}
	
	
	return Object.freeze({
		request,
		before,
		after,
		abort
	})
}

const axios = Axios();

axios.before((_config, path) => {
	if(path.auth_with) _config.header['Authorization'] = '';
	
	_config.data.AccpackageId = uni.getStorageSync('AccpackageId') || 344;
	return _config;
})

axios.after(response => {
	return response.data;
})

export default axios;