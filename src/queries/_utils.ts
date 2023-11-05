import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

import axios from '@/plugin/proxyHandler';

export const getUrlParams = (urlInfo: QueryKey) => {
	const urlArray = urlInfo.filter((item) => typeof item === 'string') as string[];
	const url = `/${urlArray.join('/')}`;
	const [requestBody, ...restQueryString] = urlInfo.filter((key) => typeof key === 'object') as object[];
	const [queryString] = restQueryString;
	return { url, requestBody, queryString };
};

/**
 * POST 메소드를 실행하는 함수 (파라미터 구조 분해)
 */
export const postQuery = async ({ queryKey }: QueryFunctionContext) => {
	const { url, queryString, requestBody } = getUrlParams(queryKey);
	try {
		const res = await axios.post(url, requestBody, { params: queryString });
		return res.data.body;
	} catch (error) {
		return error;
	}
};

/**
 * 파라미터를 전달하여 POST 메소드를 실행하는 함수
 */
export const postMutation = async <T>(mutationKey: (string | Record<string, string> | T)[]) => {
	const { url, requestBody, queryString } = getUrlParams(mutationKey);
	try {
		const res = await axios.post(url, requestBody, { params: queryString });
		return res.data.body;
	} catch (error) {
		return error;
	}
};
