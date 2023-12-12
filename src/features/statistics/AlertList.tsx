import { Dispatch, SetStateAction, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';

import { alertSearchTypeDic } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import useCall from '@/hooks/useCall';
import { PageMapType, SearchParamsType } from '@/types/Common.types';
import { AlertListType } from '@/types/Statistics.types';

interface PropsType {
	initialParams: SearchParamsType;
	params: SearchParamsType;
	data: AlertListType[];
	pageMap: PageMapType;
	setParams: Dispatch<SetStateAction<SearchParamsType>>;
	handleAlertClick: (data: AlertListType) => void;
}

export default function AlertList({ initialParams, params, data, pageMap, setParams, handleAlertClick }: PropsType) {
	const tableData = useMemo(
		() =>
			data?.reverse().map((item, itemIndex) => {
				return { ...item, no: pageMap?.startRow + itemIndex };
			}),
		[data],
	);

	const { call, isMobile } = useCall();

	/** 목록 테이블의 열을 구성하기 위한 데이터 */
	const columns: TableColumn<AlertListType>[] = [
		{ name: '순번', selector: (row) => row.no },
		{ name: '알림장소', selector: (row) => row['alertName'], sortable: true },
		{ name: '알림유형', selector: (row) => row['alertType'], sortable: true },
		{ name: '라우터', selector: (row) => row['alertSerial'], sortable: true },
		{
			name: '전화번호',
			cell: (row) => {
				const phoneNumber = row['alertPhone'];
				return isMobile ? (
					<div onClick={() => call(phoneNumber)} style={{ cursor: 'pointer' }}>
						{phoneNumber}
					</div>
				) : (
					<>{phoneNumber}</>
				);
			},
			sortable: true,
		},
		{ name: '알림일시', selector: (row) => row['alertDate'], sortable: true },
	];

	const paginationProps = {
		pageMap,
		setParams,
	};

	const searchConditionProps = {
		initialParams,
		params,
		setParams,
		typeChildren: alertSearchTypeDic,
	};

	return (
		<>
			<SearchCondition {...searchConditionProps} />
			<ListDataTable
				tableConfiguration={{ columns, tableData }}
				selectRowsState={{
					selectableRows: false,
				}}
				onRowClicked={handleAlertClick}
				pagination={{
					defaultPagination: false,
					customPagination: <Pagination {...paginationProps} />,
				}}
			/>
		</>
	);
}
