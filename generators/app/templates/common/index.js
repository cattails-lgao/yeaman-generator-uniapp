import { SUCCESS_CODE } from './http/config.js';
import Utils from './utils/index.js';
import App from './api/App.js';
import User from './api/User.js';
import Login from './model/Login.js';

export default function createCommon(vm) {
	vm.prototype.SUCCESS_CODE = SUCCESS_CODE;
	vm.prototype.$Utils = Utils;
	vm.prototype.$App = App;
	vm.prototype.$User = User;
	vm.prototype.$Login = Login;
	
	Login.inject({ User })
}