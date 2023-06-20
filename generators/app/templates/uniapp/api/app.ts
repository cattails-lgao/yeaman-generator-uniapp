import * as UserEnum from './constants';
import { request } from '@/utils';
import { APP_REQUEST_BASE_URL } from '@/config';

export function getAppVersion() {
	return request();
}