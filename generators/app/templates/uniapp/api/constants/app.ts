/*
列子：
	export const APP_VERSION: UrlPathType = {
		url: 'app/version',
		method:	GET,
		isRecord: false,
		auth_with: true
	} 
*/
import { GET } from '@/config';

export const APP_VERSION: UrlPathType = {
	url: '/app/version',
	method:	GET,
	isRecord: false,
	auth_with: true
} 