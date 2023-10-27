import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { hookReceiver } from '@/plugin/hookReceiver';

//
const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_HOST,
	timeout: 0,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Cache-Control': 'no-cache',
		'Access-Control-Allow-Origin': '*',
	},
	// adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, { enabledByDefault: false })
});

// Request Interceptor
axiosInstance.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		hookReceiver.setLoading(true);

		config.headers['X-Transaction-ID'] = Math.random().toString(36).slice(2, 9);

		return config;
	},
	function (error: Error) {
		hookReceiver.setLoading(false);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		hookReceiver.setLoading(false);
		return response;
	},
	function (error) {
		console.warn(error);
		hookReceiver.setLoading(false);

		if (error?.response?.status === 401) {
			if (hookReceiver.navigate) {
				sessionStorage.removeItem('loginInfo');
				return hookReceiver?.navigate('/login');
			}
		}

		return Promise.reject(error.response);
	},
);

export default axiosInstance;
