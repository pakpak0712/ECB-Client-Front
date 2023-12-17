import { Dispatch, SetStateAction, useMemo } from 'react';
import { TableColumn } from 'react-data-table-component';

import { aliveSearchTypeDic, aliveSearchTypeDic2 } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import useCall from '@/hooks/useCall';
import { SecureStorage } from '@/plugin/crypto';
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
	const tableData = useMemo(
		() =>
			data?.map((item, itemIndex) => {
				return { ...item, no: pageMap?.startRow + itemIndex };
			}),
		[data],
	);

	const { call, isMobile } = useCall();

	/** 목록 테이블의 열을 구성하기 위한 데이터 */
	const columns: TableColumn<AliveListType>[] = [
		//{ name: '순번', selector: (row) => row.no },
		{ name: '고장장소', selector: (row) => row['aliveName'], sortable: true, sortField: 'aliveName' },
		{ name: '라우터번호', selector: (row) => row['aliveSerial'], sortable: true, sortField: 'aliveSerial' },
		{
			name: '전화번호',
			cell: (row) => {
				const phoneNumber = row['alivePhone'];
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
		{ name: '고장일시', selector: (row) => row['aliveDate'], sortable: true, sortField: 'aliveDate' },
	];

	const paginationProps = {
		pageMap,
		setParams,
	};

	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');

	let searchConditionProps;
	if (userInfo.member_flag === 1) {
		searchConditionProps = {
			initialParams,
			params,
			setParams,
			typeChildren: aliveSearchTypeDic,
		};
	} else {
		searchConditionProps = {
			initialParams,
			params,
			setParams,
			typeChildren: aliveSearchTypeDic2,
		};
	}

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
				onSortParams={{
					params,
					setParams,
				}}
			/>
		</>
	);
}
