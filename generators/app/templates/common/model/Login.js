import Utils from '../utils/index.js';
import { SUCCESS_CODE } from '../http/config.js';

function Login() {
	// #ifdef MP-WEIXIN
	const AppInfo = uni.getAccountInfoSync().miniProgram;
	// #endif
	const SessionKey = 'Session-Key';
	const UserInfo = 'user_info';
	const AccpackageId = 'AccpackageId';
	const isPartnerKey = 'isPartnerkey';
	
	let profileTimer = null;

	// 注入的
	const _inject = {};
	
	function inject(args) {
		for(let key in args) {
			_inject[key] = args[key];
		}
	}
	
	function isCheckExpired() {
		return new Promise((resolve, reject) => {
			uni.checkSession({
				success: () => {
					// 未过期
					resolve(false);
				},
				fail: () => {
					// 已过期
					resolve(true);
				}
			})
		})
	}
	
	function loginCode() {
		return new Promise((resolve, reject) => {
			uni.login({
				success: rsp => {
					if(rsp.code) resolve(rsp.code);
				},
				fail: fail => {
					reject(fail);
				}
			})			
		})
	}
	
	function getUserProfile() {
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				desc: '用于完善会员资料',
				success: rsp => {
					resolve({ encryptedData: rsp.encryptedData, iv: rsp.iv });
				},
				fail: fail => {
					reject(fail);
				}
			})
		})
	}
	
	function setStorageSync(key, val) {
		try {
			uni.setStorageSync(key, val)
		} catch(e) {
			console.error(e)
		}
	}
	
	function getStorageSync(key) {
		try {
			return uni.getStorageSync(key);
		} catch(e) {
			console.error(e)
		}
	}
	
	// 静默授权
	async function silenceAuth(callback = null) {
		console.log('静默授权');
		const code = await loginCode();
		
		const rsp = await _inject.User.WxLogin(AppInfo.appId, code);
		
		if(rsp.code !== SUCCESS_CODE) return;
		
		// 更新session
		setStorageSync(SessionKey, rsp.data.session);
		// 更新是否是合伙人
		setStorageSync(isPartnerKey, rsp.data.isPartner);
		
		
		if(rsp.data.userInfo !== null) {
			// 更新用户信息
			setStorageSync(UserInfo, rsp.data.userInfo);
		}
		
		if(Utils.isFunc(callback)) callback.call(null, Boolean(rsp.data.userInfo));
	}
	
	// 用户授权
	function userProfile({ sourceType = null, sourceId = null } = {}, fCallback = null, callback = null, errCallback = null) {
		// 节流
		if(profileTimer) return;
		profileTimer = setTimeout(() => {
			clearInterval(profileTimer);
			profileTimer = null;
		}, 1000)
		
		Promise.all([ loginCode(), getUserProfile() ]).then(async rsp => {
			uni.showLoading({ title: '登录中', mask: true });
			const [code, { encryptedData, iv: AesIV }] = rsp;
			const loginRsp = await _inject.User.WxLogin(AppInfo.appId, code);
			// console.log(loginRsp);
			// 设置账套
			setStorageSync(AccpackageId, loginRsp.data.AccpackageId);
			// 设置session
			setStorageSync(SessionKey, loginRsp.data.session);
			// 更新是否是合伙人
			setStorageSync(isPartnerKey, loginRsp.data.isPartner);
			// 设置用户信息
			if(loginRsp.data.userInfo) setStorageSync(UserInfo, loginRsp.data.userInfo);
			
			// 解密
			const deRsp = await _inject.User.Decrypt(loginRsp.data.session.session_key, encryptedData, AesIV, loginRsp.data.session.openid);
			uni.hideLoading();
			setStorageSync(UserInfo, {
				...getStorageSync(UserInfo),
				nickname: deRsp.data.nickName,
				headimgurl: deRsp.data.avatarUrl,
				sex: deRsp.data.gender
			});
			
			if(Utils.isFunc(fCallback)) fCallback.call(null);
			
		}).catch(err => {
			uni.hideLoading();
			console.error(err);
			if(Utils.isFunc(errCallback)) errCallback.call(null);
		})
	}
	
	return Object.freeze({
		inject,
		isCheckExpired,
		silenceAuth,
		userProfile,
		setUserInfo: (val) => setStorageSync(UserInfo, val),
		getUserInfo: () => getStorageSync(UserInfo),
		getUserSession: () => getStorageSync(SessionKey),
		getAccId: () => getStorageSync(AccpackageId),
		isPartner: () => getStorageSync(isPartnerKey),
		setIsPartner: (val) => setStorageSync(isPartnerKey, val)
	});
}

export default Login();