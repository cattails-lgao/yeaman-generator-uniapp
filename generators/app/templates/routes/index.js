import $Utils from '@/common/utils/index.js';
import AllRouter from './constant/index.js';

const RouterFuncType = {
	NavigateTo: 'navigateTo',
	RedirectTo: 'redirectTo',
	ReLaunch: 'reLaunch',
	SwitchTab: 'switchTab',
	NavigateBack: 'navigateBack'
}

const AnimateType = {
	slideInRight: 'slide-in-right', // slide-out-right	新窗体从右侧进入
	slideInLeft: 'slide-in-left', // slide-out-left	新窗体从左侧进入
	slideInTop: 'slide-in-top', // slide-out-top	新窗体从顶部进入
	slideInBottom: 'slide-in-bottom', // slide-out-bottom	新窗体从底部进入
	popIn: 'pop-in', // pop-out	新窗体从左侧进入，且老窗体被挤压而出
	fadeIn: 'fade-in', // fade-out	新窗体从透明到不透明逐渐显示
	zoomOut: 'zoom-out', // zoom-in	新窗体从小到大缩放显示
	zoomFadeOut: 'zoom-fade-out', // zoom-fade-in	新窗体从小到大逐渐放大并且从透明到不透明逐渐显示
	none: 'none'
}

const AnimationDuration = 300;

function Router() {
	// 拦截器
	const interceptors = {
		entry: null,
		leave: null
	}
	
	/**
	 * 路由列表
	 */
	function getRoutes() {
		return getCurrentPages();
	}
	
	/**
	 * 获取当前路由
	 */
	function getCurrentRoute() {
		const routerList = getRoutes(); 
		return routerList[routerList.length - 1];
	}
	
	/**
	 * 进入路由
	 * @param {Object} callback
	 */
	function entry(callback) {
		if (!$Utils.isFunc(callback)) return;
		interceptors.entry = callback;
	}
	/**
	 * 离开路由
	 * @param {Object} callback
	 */
	function leave(callback) {
		if (!$Utils.isFunc(callback)) return;
		interceptors.leave = callback
	}
	
	/**
	 * 生成路由配置
	 * @param {Object} funcType
	 * @param {Object} _config
	 */
	function generateOpt(funcType, _config) {
		let config = {};
		try {
			conifg = JSON.parse(JSON.stringify(_config));
		} catch(e) {
			config = Object.assign({}, _config);
		}

		let defaultConfig = {
			success: () => {},
			fail: fail => {},
			complete: complete => {
				if (process.env.NODE_ENV === 'development') {
					console.log(_config, complete);
				}
			},
			// #ifdef APP-PLUS
			animationType: AnimateType.slideInRight,
			animationDuration: AnimationDuration,
			// #endif
		};
		
		const defaultBackConfig = {
			delta: 1
		}
		
		if(funcType !== RouterFuncType.NavigateBack) {
			if (funcType !== RouterFuncType.SwitchTab && config.query && !$Utils.isEmptyObj(config.query))
				defaultConfig.url = _queryString(config);
			else
				defaultConfig.url = config.path.path;
		}
		
		if(funcType === RouterFuncType.NavigateTo) {
			if(typeof config.success === 'function') 
				defaultConfig.success = config.success;
				
			if(config.events && !$Utils.isEmptyObj(config.events))
				defaultConfig.events = config.events;
		}
		
		if(funcType === RouterFuncType.NavigateBack) {
			defaultConfig = defaultBackConfig;
		}
		
		return defaultConfig;
	}
	
	/**
	 * 跳转到应用内的某个页面
	 * @param {Object} _config
	 * 	@property {object} path { name: '', path: '', auth_with: true, routerName: '' }
	 * 	@property {object} query { a: 1, b: 1 }
	 * 	@property {object} events { a: () => {} }
	 * 	@property {func} success
	 * 	@property {func} fail
	 * 	@property {func} complete
	 */
	function navigateTo(_config) {
		// 校验路由权限
		if(!_checkRouterAuth(_config)) return;
		// 避免同一路由重复点击
		if(_pathIsEq(_config.path.path)) return;
		
		let config;
		if ($Utils.isFunc(interceptors.entry) && interceptors.entry)
			config = interceptors.entry(_config);
		else
			config = _config;

		const options = generateOpt(RouterFuncType.NavigateTo, config);
		uni.navigateTo(options);
	}

	function redirectTo(_config) {
		if(!_checkRouterAuth(_config)) return;

		let config;
		if ($Utils.isFunc(interceptors.entry) && interceptors.entry)
			config = interceptors.entry(_config);
		else
			config = _config;

		const options = generateOpt(RouterFuncType.RedirectTo, config);
		uni.redirectTo(options)
	}

	function reLaunch(_config) {
		if(!_checkRouterAuth(_config)) return;
		
		let config;
		if ($Utils.isFunc(interceptors.entry) && interceptors.entry)
			config = interceptors.entry(_config);
		else
			config = _config;

		const options = generateOpt(RouterFuncType.ReLaunch, config);
		uni.reLaunch(options)
	}

	function switchTab(_config) {
		if(!_checkRouterAuth(_config)) return;
		
		let config;
		if ($Utils.isFunc(interceptors.entry) && interceptors.entry)
			config = interceptors.entry(_config);
		else
			config = _config;

		const options = generateOpt(RouterFuncType.SwitchTab, config);
		uni.switchTab(options)
	}

	function navigateBack(delta = 1) {
		uni.navigateBack(generateOpt(RouterFuncType.NavigateBack, {
			delta
		}))
	}
	
	/**
	 * 校验路由权限
	 * @param {Object} _config
	 */
	function _checkRouterAuth(_config) {
		return _config.path.auth_with;
	}
	
	/**
	 * 与当前路由是否相等
	 * @param {Object} url
	 */
	function _pathIsEq(url) {
		const route = getCurrentRoute().route;
		return url.indexOf(router) !== -1; 
	}
	
	/**
	 * 修改路由配置
	 * @param {Object} moduleName 模块名
	 * @param {Object} routeName 路由名
	 * @param {Object} bute 路由节点
	 * @param {Object} value
	 */
	function setRouteBute(moduleName, routeName, bute, value) {
		AllRouter[moduleName][routeName][bute] = value;
	}
	
	/**
	 * JSON转queryString
	 * @param {Object}  
	 * 	@property {object} path
	 * 	@property {object} query
	 */
	function _queryString({ path, query } = {} ) {
		if ((!path && $Utils.isEmptyObj(path)) || (!query && $Utils.isEmptyObj(query))) {
			console.error('router->queryString->path或query参数错误');
			return path.path;
		}

		const checkVal = val => {
			if ($Utils.isFunc(val)) return null;

			if ($Utils.isBoolean(val)) return +val;

			if ($Utils.isObject(val) || $Utils.isArray(val)) {
				return encodeURIComponent(JSON.stringify(val));
			}

			return val;
		}


		let str = Object.keys(query).map(key => {
			let val = query[key];
			val = checkVal(val);
			return key + '=' + val;
		})

		return path.path + '?' + str.join('&');
	}
	
	return Object.freeze({
		getRoutes,
		getCurrentRoute,
		entry,
		leave,
		setRouteBute,
		navigateTo,
		redirectTo,
		reLaunch,
		switchTab,
		navigateBack
	})
}

const router = Router();

router.entry(_config => {
	_config.query = {
		..._config.query,
		routerName: _config.path.routerName,
	}
	
	return _config;
});
router.leave(() => {
	
})

export default function createRouter(vm) {
	vm.prototype.$Router = router;
	vm.prototype.$RouterPath = AllRouter;
}