import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

import axios from '@/plugin/proxyHandler';

export const getUrlParams = (urlInfo: QueryKey) => {
	const urlArray = urlInfo.filter((item) => typeof item === 'string') as string[];
	const url = `/${urlArray.join('/')}`;
	const [params, ...restConfig] = urlInfo.filter((key) => typeof key === 'object') as object[];
	const [config] = restConfig;
	return { url, params, config };
};

/**
 * POST 메소드를 실행하는 함수 (파라미터 구조 분해)
 */
export const postQueryParams = async ({ queryKey }: QueryFunctionContext) => {
	const { url, params, config } = getUrlParams(queryKey);
	try {
		const res = await axios.post(url, params, config);
		return res.data.body;
	} catch (error) {
		return error;
	}
};

/**
 * 파라미터를 전달하여 POST 메소드를 실행하는 함수
 */
export const postMutationParams = async <T>(mutationKey: (string | Record<string, string> | T)[]) => {
	const { url, params, config } = getUrlParams(mutationKey);
	try {
		const res = await axios.post(url, params, config);
		return res.data.body;
	} catch (error) {
		return error;
	}
};

/**
 * 쿼리스트링을 전달하여 POST 메소드를 실행하는 함수
 */
export const postMutationQueryString = async <T>(mutationKey: (string | Record<string, string> | T)[]) => {
	const { url, params } = getUrlParams(mutationKey);
	try {
		const res = await axios.post(url, null, { params });
		return res.data.body;
	} catch (error) {
		return error;
	}
};
