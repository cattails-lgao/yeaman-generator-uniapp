import { isEmptyObj, isArray, isObject } from '@/utils';
import { TOKEN_NAME } from '@/config';

export async function request<T>(
	baseUrl: string,
	apiPath: UrlPathType,
	data: Record<string, any>,
	router: Record<string, string | number>,
	query: Record<string, any>,
	hearder: Record<string, any>
) {
	return new Promise((resolve, reject) => {
		const headerDefault = { ...hearder };
		if(apiPath.auth_with) {
			headerDefault[TOKEN_NAME] = 'Bearer ';
		} else {
			headerDefault[TOKEN_NAME] = 'Basic ';
		}
		const url = generatorUrl(baseUrl, apiPath, router, query);
		const option = {
			url,
			method: apiPath.method,
			data,
			hearder: headerDefault,
			success: (rRsp: UniNamespace.RequestSuccessCallbackResult) => {
				
			},
			fail: (err: UniNamespace.GeneralCallbackResult) => {
				uni.showToast({ title: '无法连接到服务器!', icon: 'none', position: 'bottom' });
				reject(err.errMsg || '无法连接到服务器!');
			},
			complete: () => {
				console.log(apiPath.method + '->' + url + ', data:' + JSON.stringify(data));
			}
		};
		
		uni.request(option);
	})
}

function generatorUrl(
	baseUrl: string,
	apiPath: UrlPathType,
	router: Record<string, string | number>,
	query: Record<string, any>
): string {
	let url = baseUrl;
	
	// 路径参数不是空
	if(!isEmptyObj(router)) 
		url += createRouterStr(apiPath.url, router);
	else
		url += apiPath.url;
	
	// query参数不是空
	if(!isEmptyObj(query)) url += createQueryString(query);
	
	return url;
}

function createRouterStr(api: string, router: Record<string, string | number>) {
	const apiArr = api.split('/');
	for (let i = 0; i < apiArr.length; i++) {
		if(apiArr[i].startsWith(':')) {
			const bute = apiArr[i].slice(1);
			apiArr[i] = String(router[bute]);
		}
	}
	
	return apiArr.join('/');
}

function createQueryString(query: Record<string, any>): string {
	const strArr: string[] = [];
	for (let key in query) {
		if (isArray(query[key]) || isObject(query[key])) {
			strArr.push(key + '=' + JSON.stringify(query[key]));
		} else {
			strArr.push(key + '=' + query[key]);
		}
	}

	return '?' + strArr.join('&');
}
