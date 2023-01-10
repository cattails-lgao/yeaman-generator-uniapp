// 请求地址对象
interface UrlPathType {
    url: string, // 请求地址
    method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT', // 请求方式
    isRecord: boolean, // 请求方式
    auth_with: boolean // 鉴权
}