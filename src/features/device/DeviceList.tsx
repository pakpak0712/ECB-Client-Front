import { Dispatch, SetStateAction, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';

import { deviceSearchTypeDic } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import { PageMapType, SearchParamsType } from '@/types/Common.types';
import { DeviceListType } from '@/types/Device.types';

interface PropsType {
	initialParams: SearchParamsType;
	params: SearchParamsType;
	data: DeviceListType[];
	pageMap: PageMapType;
	setSelectData: Dispatch<SetStateAction<DeviceListType[]>>;
	setParams: Dispatch<SetStateAction<SearchParamsType>>;
	handleDeviceClick: (data: DeviceListType) => void;
}

export default function DeviceList({
	initialParams,
	params,
	data,
	pageMap,
	setSelectData,
	setParams,
	handleDeviceClick,
}: PropsType) {
	const tableData = useMemo(
		() =>
			data?.reverse().map((item, itemIndex) => {
				return { ...item, no: pageMap?.startRow + itemIndex };
			}),
		[data],
	);

	/** 목록 테이블의 열을 구성하기 위한 데이터 */
	const columns: TableColumn<DeviceListType>[] = [
		{ name: 'NO', selector: (row) => row.no },
		{ name: '설치장소', selector: (row) => row['tcs_name'], sortable: true },
		{ name: '전화번호', selector: (row) => row['tcs_matchPhone'], sortable: true },
		{ name: '라우터', selector: (row) => row['tcs_serial'], sortable: true },
		{ name: '마지막신호', selector: (row) => row['tcs_ALdate'], sortable: true },
		{ name: '고장여부', selector: (row) => decodingFlag(row['tcs_flag']), sortable: true },
		{ name: '메모', selector: (row) => row['tcs_memo'], sortable: true },
	];

	const decodingFlag = (flag: string | number): string => {
		return flag === 0 ? '정상' : '고장';
	};

	const paginationProps = {
		pageMap,
		setParams,
	};

	const searchConditionProps = {
		initialParams,
		params,
		setParams,
		typeChildren: deviceSearchTypeDic,
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
				onRowClicked={handleDeviceClick}
				pagination={{
					defaultPagination: false,
					customPagination: <Pagination {...paginationProps} />,
				}}
			/>
		</>
	);
}
