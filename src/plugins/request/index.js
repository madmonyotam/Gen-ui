import firebase from 'firebase';
// eslint-disable-next-line no-undef
const axios = require('axios');

let headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

const DEFAULT_PORT = 5588;
const baseURL = `http://localhost:${ DEFAULT_PORT }/mocking_G`;


class RequestPlugin {
	
	constructor(method, url, data = undefined) {
		
		let instance;
		let config = {
			baseURL,
			headers,
			timeout: 20000,
			transformResponse: (data) => {
				let response = '';
				try {
					response = JSON.parse(data);
				} catch (err) {
					response = 'response error' + err;
				}
				return response;
			}
		};
		
		instance = axios.create(config);
		
		return instance[method](url, data, config).then(response => {
			const { status, data } = response;
			if (status >= 300 || status < 200) throw data;
			return response;
		});
	} 
}

export const setHeaders = params => {
	headers = {
		...headers,
		...params
	};
};

export const getHeaders = () => headers;

const register = async (email, password, name) => {
	const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
	res.user.updateProfile({
		displayName: name
	});
};

const login = async (email, password) => {
	const res = await firebase.auth().signInWithEmailAndPassword(email, password);
	localStorage.setItem('gen-token', res.user.xa);
	localStorage.setItem('gen-user-name', res.user.displayName);
	localStorage.setItem('gen-user-email', res.user.email);
	setHeaders({ Authorization: res.user.xa });
	return res;
};

const get = (url, data) => {
	const Request = new RequestPlugin('get', url, data);
	return Request;
};


const post = (url, data) => {
	const Request = new RequestPlugin('post', url, data);
	return Request;
};

export default {
	login,
	register,
	get,
	post
}; 
