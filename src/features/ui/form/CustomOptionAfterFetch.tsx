import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import { Option } from '@/class/common';
import { postQuery } from '@/queries/_utils';

interface PropsType {
	queryKey: (string | object | unknown)[];
	dataKey: string;
	enableBlankSelect?: boolean;
}
interface CustomOptionResponse {
	text: string;
	value: string;
}

interface DataResponseType {
	[key: string]: Record<string, string>[];
}

function CustomOptionAfterFetch({ queryKey, dataKey, enableBlankSelect }: PropsType) {
	const { data, isLoading, isFetching } = useQuery<DataResponseType>({
		queryKey: queryKey,
		queryFn: postQuery,
	});

	const convertTextToObject = (text: string) => [new Option(text, '')];

	const getOrganizeData = (originData: Record<string, string>[]): Option[] => {
		return originData.map((item) => {
			const newItem = { name: '', value: '' };
			for (const key in item) {
				if (key.indexOf('name') >= 0) {
					newItem['name'] = item[key];
				}
				if (key.indexOf('code') >= 0) {
					newItem['value'] = item[key];
				}
			}
			if (dataKey.indexOf('line') >= 0 || dataKey.indexOf('stt') >= 0) {
				return new Option(newItem.name, newItem.name);
			} else {
				return new Option(newItem.name, newItem.value);
			}
		});
	};

	const dataList = data ? data[dataKey] : undefined;
	const optionData = dataList ? getOrganizeData(dataList) : convertTextToObject('선택 목록이 존재하지 않습니다');

	return (
		<>
			{enableBlankSelect && <option>선택</option>}
			{optionData.map((option: CustomOptionResponse, index: number) => {
				return (
					<option key={index} value={option.value}>
						{option.text}
					</option>
				);
			})}
		</>
	);
}

export default memo(CustomOptionAfterFetch);
