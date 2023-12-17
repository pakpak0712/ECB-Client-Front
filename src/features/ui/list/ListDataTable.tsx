import { jsx } from '@emotion/react';
import React, { Dispatch, SetStateAction } from 'react';
import DataTable from 'react-data-table-component';
import { SortOrder, TableColumn } from 'react-data-table-component/dist/src/DataTable/types';

import { SearchParamsType } from '@/types/Common.types';

export interface ListTableInfo<T> {
	tableConfiguration: { columns: TableColumn<T>[]; tableData: T[] };
	pagination: { defaultPagination: boolean; customPagination?: jsx.JSX.Element };
	onSortParams: { params: SearchParamsType; setParams: Dispatch<SetStateAction<SearchParamsType>> };
	selectRowsState: {
		selectableRows: boolean;
		clearSelectedRows?: boolean;
		selectedRows?: T[];
		setSelectedRows?: Dispatch<SetStateAction<T[]>>;
	};
	onRowClicked?: (data: T) => void;
}

const ListDataTable = <T extends object>({
	tableConfiguration,
	pagination,
	onSortParams,
	selectRowsState,
	onRowClicked,
}: ListTableInfo<T>) => {
	interface handleSelectChangeProps {
		allSelected: boolean;
		selectedCount: number;
		selectedRows: T[];
	}
	const { columns, tableData } = tableConfiguration;
	const { selectableRows, clearSelectedRows } = selectRowsState;
	const { defaultPagination, customPagination } = pagination;

	const onSelectedRowsChange = ({ selectedRows }: handleSelectChangeProps) => {
		(selectRowsState as Required<typeof selectRowsState>).setSelectedRows(selectedRows);
	};

	const customSort = async <T,>(selectedColumn: TableColumn<T>, sortDirection: SortOrder) => {
		const paramsWithOrderDTO = {
			...onSortParams.params,
			orderDTO: {
				orderType: selectedColumn.sortField || '',
				orderWord: sortDirection,
			},
		};
		onSortParams.setParams(paramsWithOrderDTO);
	};

	if (tableData?.length === 0) {
		return <div className="p-5 text-center">조회된 정보가 없습니다.</div>;
	} else if (tableData) {
		return (
			<>
				<DataTable
					className="list-data-table"
					columns={columns}
					data={tableData}
					selectableRows={selectableRows}
					{...({ clearSelectedRows } || {})}
					{...(selectableRows ? { onSelectedRowsChange } : {})}
					onRowClicked={onRowClicked}
					{...(defaultPagination ? { pagination: true } : {})}
					onSort={customSort}
					sortServer
				/>
				{!defaultPagination && customPagination}
			</>
		);
	} else {
		return <></>;
	}
};

export default React.memo(ListDataTable) as typeof ListDataTable;
