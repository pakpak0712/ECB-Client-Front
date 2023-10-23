import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { SearchParamsType } from '@/types/Common.types';

interface UseSearchProps<T> {
	params: T;
	setParams: Dispatch<SetStateAction<T>>;
}

export default function useSearch<T extends SearchParamsType>(props: UseSearchProps<T>) {
	const { params, setParams } = props;
	const [searchCondition, setSearchCondition] = useState<T>(params);

	const handleSearchConditionChange = (key: string, value: string | number) => {
		setSearchCondition({
			...searchCondition,
			searchDTO: {
				...searchCondition.searchDTO,
				[key]: value,
			},
		});
	};

	const handleSearchSubmit = (event: FormEvent<HTMLFormElement>, newParams: T) => {
		event.preventDefault();
		setSearchCondition(newParams);
		setParams(newParams);
	};

	const handleSearchReset = (newParams: T) => {
		setSearchCondition(newParams);
		setParams(newParams);
	};
	return {
		searchCondition,
		setSearchCondition,
		handleSearchConditionChange,
		handleSearchSubmit,
		handleSearchReset,
	};
}
