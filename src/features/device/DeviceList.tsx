import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import { deviceSearchTypeDic, deviceSearchTypeDic2 } from '@/constants/dictionary';
import ListDataTable from '@/features/ui/list/ListDataTable';
import Pagination from '@/features/ui/list/Pagination';
import SearchCondition from '@/features/ui/list/SearchCondition';
import useCall from '@/hooks/useCall';
import { SecureStorage } from '@/plugin/crypto';
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
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');

	const isAdmin = userInfo.member_flag === 1;

	const tableData = useMemo(
		() =>
			data?.map((item, itemIndex) => {
				return { ...item, no: pageMap?.startRow + itemIndex };
			}),
		[data],
	);

	const { call, isMobile } = useCall();

	/** 목록 테이블의 열을 구성하기 위한 데이터  **/
	const columns: TableColumn<DeviceListType>[] = [
		{ name: 'No.', selector: (row) => row.no },
		{ name: '구매자', selector: (row) => row['tcs_name'], sortable: true, sortField: 'tcs_name' },
		{ name: '설치모델', selector: (row) => row['tcs_deviceType'], sortable: true, sortField: 'tcs_deviceType' },
		{ name: '설치장소', selector: (row) => row['tcs_simpAddr'], sortable: true, sortField: 'tcs_simpAddr' },
		{ name: '설치주소', selector: (row) => row['tcs_compAddr'], sortable: true, sortField: 'tcs_compAddr' },
		{ name: '세부설치위치', selector: (row) => row['tcs_moreAddr'], sortable: true, sortField: 'tcs_moreAddr' },
		{ name: '설치수량(S)', selector: (row) => row['tcs_num'], sortable: true, sortField: 'tcs_num' },
		{ name: '가동상태', selector: (row) => decodingFlag(row['tcs_flag']), sortable: true, sortField: 'tcs_flag' },
		{ name: '라우터번호', selector: (row) => row['tcs_serial'], sortable: true, sortField: 'tcs_serial' },
		{
			name: '전화번호',
			cell: (row) => {
				const phoneNumber = row['tcs_matchPhone'];
				return isMobile ? (
					<div onClick={() => call(phoneNumber)} style={{ cursor: 'pointer' }}>
						{phoneNumber}
					</div>
				) : (
					<>{phoneNumber}</>
				);
			},
			sortable: true,
			sortField: 'tcs_matchPhone',
		},
		isAdmin ? { name: 'MAC 주소', selector: (row) => row['tcs_mac'], sortable: true, sortField: 'tcs_mac' } : {},
		{ name: '최초설치일시', selector: (row) => row['tcs_date'], sortable: true, sortField: 'tcs_date' },
		{ name: '마지막신호', selector: (row) => row['tcs_ALdate'], sortable: true, sortField: 'tcs_ALdate' },
		isAdmin ? { name: '메모', selector: (row) => row['tcs_memo'], sortable: true, sortField: 'tcs_memo' } : {},
	];

	const decodingFlag = (flag: string | number): string => {
		return flag === 0 ? '정상' : '고장';
	};

	const paginationProps = {
		pageMap,
		setParams,
	};

	let searchConditionProps;
	if (userInfo.member_flag === 1) {
		searchConditionProps = {
			initialParams,
			params,
			setParams,
			typeChildren: deviceSearchTypeDic,
		};
	} else {
		searchConditionProps = {
			initialParams,
			params,
			setParams,
			typeChildren: deviceSearchTypeDic2,
		};
	}

	const [orderDTO, setOrderDTO] = useState({
		orderType: '',
		orderWord: '',
	});

	return (
		<>
			<SearchCondition {...searchConditionProps} />
			<ListDataTable
				tableConfiguration={{ columns, tableData }}
				selectRowsState={{
					selectableRows: isAdmin,
					clearSelectedRows: true,
					selectedRows: tableData,
					setSelectedRows: setSelectData,
				}}
				onRowClicked={handleDeviceClick}
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
