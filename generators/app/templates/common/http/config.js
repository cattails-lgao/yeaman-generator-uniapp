export const GET = 'GET';
export const POST = 'POST';

export const SUCCESS_CODE = 1;
export const ERROR_CODE = 0;

const urlConfig = {
	dev: 'http://192.168.9.183:7070',
	// dev: 'http://rest.apizza.net/mock/84aabfe0ca86b2e73ab8597479f7418d',
	test: '', 
	pro: ''
}

let baseURL;

if (process.env.NODE_ENV === 'development') {
	baseURL = urlConfig.dev;
} else {
	baseURL = urlConfig.pro;
}

export default baseURL;