const Code200 = 200; // （成功） 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。
const Code301 = 301; // （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或HEAD请求的响应）时，会自动将请求者转到新位置。
const Code400 = 400; // （错误请求） 服务器不理解请求的语法。
const Code401 = 401; // （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
const Code403 = 403; // （禁止） 服务器拒绝请求。
const Code404 = 404; // （未找到） 服务器找不到请求的网页。
const Code500 = 500; // （服务器内部错误） 服务器遇到错误，无法完成请求。
const Code501 = 501; // （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
const Code502 = 502; // （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。
const Code503 = 503; // （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
const Code504 = 504; // （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。

const CodeMessage = {
  200: '服务器成功返回请求的数据',
  301: '网页已移动',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '请求的网页不存在',
  500: '服务器发生错误，请检查服务器',
  501: '尚未实施',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
};

export default function checkStatusCode(code) {
	switch (code) {
		case Code200:
			return true;
		case Code301:
		case Code400:
		case Code401:
		case Code403:
		case Code404:
		case Code500:
		case Code501:
		case Code502:
		case Code503:
		case Code504:
			uni.showToast({ title: CodeMessage[code], icon: 'none' });
			return false;
	}
}