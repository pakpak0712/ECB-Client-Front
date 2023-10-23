import { Dispatch, SetStateAction, useEffect } from 'react';

import { Option } from '@/class/common';
import CustomInput from '@/features/ui/form/CustomInput';
import CustomSelect from '@/features/ui/form/CustomSelect';
import useSearch from '@/hooks/useSearch';
import { SearchParamsType } from '@/types/Common.types';

interface PropsType {
	initialParams: SearchParamsType;
	params: SearchParamsType;
	setParams: Dispatch<SetStateAction<SearchParamsType>>;
	typeChildren: Option[];
}
export default function SearchCondition({ initialParams, params, setParams, typeChildren }: PropsType) {
	const { searchCondition, setSearchCondition, handleSearchConditionChange, handleSearchSubmit, handleSearchReset } =
		useSearch<SearchParamsType>({
			params,
			setParams,
		});

	useEffect(() => {
		setSearchCondition((prev) => {
			return {
				...prev,
				searchDTO: {
					...prev.searchDTO,
					searchWord: '',
				},
			};
		});
		setParams(initialParams);
	}, [searchCondition.searchDTO.searchType]);

	return (
		<form className="form-search-group" onSubmit={(event) => handleSearchSubmit(event, searchCondition)}>
			<div className="row" style={{ maxWidth: '600px' }}>
				<CustomSelect
					name="searchType"
					defaultValue={searchCondition.searchDTO.searchType}
					handleState={handleSearchConditionChange}
					enableBlankSelect={true}
					childrenOption={typeChildren}
				/>
				<CustomInput
					name="searchWord"
					defaultValue={searchCondition.searchDTO.searchWord}
					placeholder={searchCondition.searchDTO.searchType ? '검색 내용을 입력해주세요.' : '검색 항목을 선택해주세요'}
					handleState={handleSearchConditionChange}
					disabled={!searchCondition.searchDTO.searchType ? true : false}
				/>
				<div className="form-content">
					<button type="submit" className="btn btn-gray">
						<span className="d-none d-sm-block">조회</span>
						<i className="fa-solid fa-magnifying-glass d-sm-none" />
					</button>
					<button type="button" className="btn btn-default" onClick={() => handleSearchReset(initialParams)}>
						<span className="d-none d-sm-block">초기화</span>
						<i className="fa-solid fa-rotate-right d-sm-none" />
					</button>
				</div>
			</div>
		</form>
	);
}
