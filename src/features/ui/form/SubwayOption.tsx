import { useQuery } from '@tanstack/react-query';

import { Option } from '@/class/common';
import { postQuery } from '@/queries/_utils';

interface PropsType {
	queryKey: (string | object | unknown)[];
	dataKey: string;
}
interface CustomOptionResponse {
	text: string;
	value: string;
}

interface DataResponseType {
	[key: string]: Record<string, string>[];
}

export default function CustomOptionAfterFetch({ queryKey, dataKey }: PropsType) {
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
			return new Option(newItem.name, newItem.name);
		});
	};

	const dataList = data ? data[dataKey] : undefined;
	const optionData = dataList ? getOrganizeData(dataList) : convertTextToObject('선택 목록이 존재하지 않습니다');

	return (
		<>
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
