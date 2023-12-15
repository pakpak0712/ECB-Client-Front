import { Dispatch, SetStateAction, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';

import { memberSearchTypeDic } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import { PageMapType, SearchParamsType } from '@/types/Common.types';
import { MemberListType } from '@/types/Member.types';

interface PropsType {
	initialParams: SearchParamsType;
	params: SearchParamsType;
	data: MemberListType[];
	pageMap: PageMapType;
	setSelectData: Dispatch<SetStateAction<MemberListType[]>>;
	setParams: Dispatch<SetStateAction<SearchParamsType>>;
	handleMemberClick: (data: MemberListType) => void;
}

export default function MemberList({
	initialParams,
	params,
	data,
	pageMap,
	setSelectData,
	setParams,
	handleMemberClick,
}: PropsType) {
	const tableData = useMemo(
		() =>
			data?.map((item, itemIndex) => {
				return { ...item, no: pageMap?.startRow + itemIndex };
			}),
		[data, params],
	);

	/** 목록 테이블의 열을 구성하기 위한 데이터 */
	const columns: TableColumn<MemberListType>[] = [
		//{ name: '순번', selector: (row) => row['no'] },
		{ name: '아이디', selector: (row) => row['member_id'], sortable: true },
		{ name: '이름', selector: (row) => row['member_name'], sortable: true },
		{ name: '전화번호', selector: (row) => row['member_phone'], sortable: true },
		{ name: '이메일', selector: (row) => row['member_email'], sortable: true },
		{ name: '관리장소', selector: (row) => row['member_viewlist'], sortable: true },
	];

	const paginationProps = {
		pageMap,
		setParams,
	};

	const searchConditionProps = {
		initialParams,
		params,
		setParams,
		typeChildren: memberSearchTypeDic,
	};

	return (
		<>
			<SearchCondition {...searchConditionProps} />
			<ListDataTable
				tableConfiguration={{ columns, tableData }}
				selectRowsState={{
					selectableRows: true,
					clearSelectedRows: true,
					selectedRows: tableData,
					setSelectedRows: setSelectData,
				}}
				onRowClicked={handleMemberClick}
				pagination={{
					defaultPagination: false,
					customPagination: <Pagination {...paginationProps} />,
				}}
			/>
		</>
	);
}
