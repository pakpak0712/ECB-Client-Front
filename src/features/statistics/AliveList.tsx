import { Dispatch, SetStateAction } from 'react';
import { TableColumn } from 'react-data-table-component';

import { aliveSearchTypeDic } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import { PageMapType, SearchParamsType } from '@/types/Common.types';
import { AliveListType } from '@/types/Statistics.types';

interface PropsType {
	initialParams: SearchParamsType;
	params: SearchParamsType;
	data: AliveListType[];
	pageMap: PageMapType;
	setParams: Dispatch<SetStateAction<SearchParamsType>>;
	handleAliveClick: (data: AliveListType) => void;
}

export default function AliveList({ initialParams, params, data, pageMap, setParams, handleAliveClick }: PropsType) {
	const tableData = data?.reverse().map((item, itemIndex) => {
		return { ...item, no: pageMap?.startRow + itemIndex };
	});
	/** 목록 테이블의 열을 구성하기 위한 데이터 */
	const columns: TableColumn<AliveListType>[] = [
		{ name: 'NO', selector: (row) => row.no, sortable: true },
		{ name: '고장장소', selector: (row) => row['aliveName'], sortable: true },
		{ name: '전화번호', selector: (row) => row['alivePhone'], sortable: true },
		{ name: '라우터', selector: (row) => row['aliveSerial'], sortable: true },
		{ name: '고장일시', selector: (row) => row['aliveDate'], sortable: true },
	];

	const paginationProps = {
		pageMap,
		setParams,
	};

	const searchConditionProps = {
		initialParams,
		params,
		setParams,
		typeChildren: aliveSearchTypeDic,
	};

	return (
		<>
			<SearchCondition {...searchConditionProps} />
			<ListDataTable
				tableConfiguration={{ columns, tableData }}
				selectRowsState={{
					selectableRows: false,
				}}
				onRowClicked={handleAliveClick}
				pagination={{
					defaultPagination: false,
					customPagination: <Pagination {...paginationProps} />,
				}}
			/>
		</>
	);
}
