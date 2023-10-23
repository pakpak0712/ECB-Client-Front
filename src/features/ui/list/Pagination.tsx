import { Dispatch, SetStateAction } from 'react';

import { PageMapType, SearchParamsType } from '@/types/Common.types';

interface PaginationProps<T> {
	pageMap: PageMapType;
	setParams: Dispatch<SetStateAction<T>>;
}
export default function Pagination<T extends SearchParamsType>({ pageMap, setParams }: PaginationProps<T>) {
	const btnPerPage = 4;
	const totalCount = pageMap?.totRow;
	const dataPerPage = pageMap?.pagePerRow;
	const pageNo = pageMap?.curPage;
	const totalPage = pageMap?.totPage;
	const hasNext = totalPage !== pageMap?.curPage;
	const options = [10, 3, 20, 25, 30, 40, 50];
	const currentPageSection = Math.ceil((totalPage / btnPerPage) * (pageNo / totalPage));
	const startPage = Math.max(1, (currentPageSection - 1) * btnPerPage + 1);
	const endPage = btnPerPage * currentPageSection > totalPage ? totalPage : btnPerPage * currentPageSection;
	const btnCount = endPage - startPage + 1;

	const handleDataPerPageChange = (newPerPage: number) => {
		setParams((prev) => ({ ...prev, pageDTO: { curPage: 1, pagePerRow: newPerPage } }));
	};

	const handlePageNumberChange = (newPageNo: number) => {
		const curPageNo = (() => {
			if (newPageNo <= 0) {
				return 1;
			} else if (newPageNo >= totalPage) {
				return totalPage;
			} else {
				return newPageNo;
			}
		})();
		if (curPageNo !== pageNo && curPageNo >= 1 && curPageNo <= totalPage) {
			setParams((prev) => ({ ...prev, pageDTO: { curPage: curPageNo, pagePerRow: dataPerPage } }));
		}
	};

	return (
		<div className="pagination-wrapper mt-3">
			<div className="form-content">
				<div className="">전체 결과 수 : {totalCount}</div>
			</div>
			<nav className="pagination">
				<div className={`page-item ${pageNo <= 1 && 'disabled'}`}>
					<button
						type="button"
						className="page-link page-link-arrow"
						onClick={() => handlePageNumberChange(startPage - 1)}
					>
						&laquo;
					</button>
				</div>
				<div className={`page-item ${pageNo <= 1 && 'disabled'}`}>
					<button
						type="button"
						className="page-link page-link-arrow"
						onClick={() => handlePageNumberChange(pageNo - 1)}
					>
						&lsaquo;
					</button>
				</div>
				{Array.from({ length: btnCount }, (_, i) => startPage + i).map((value, index) => {
					if (value) {
						return (
							<div className={`page-item ${pageNo === value && 'active'}`} key={`pagination-button-${index}`}>
								<button type="button" className="page-link" onClick={() => handlePageNumberChange(value)}>
									{value}
								</button>
							</div>
						);
					}
				})}
				<div className={`page-item ${!hasNext && 'disabled'}`}>
					<button
						type="button"
						className="page-link page-link-arrow"
						onClick={() => handlePageNumberChange(pageNo + 1)}
					>
						&rsaquo;
					</button>
				</div>
				<div className={`page-item ${!hasNext && 'disabled'}`}>
					<button
						type="button"
						className="page-link page-link-arrow"
						onClick={() => handlePageNumberChange(endPage + 1)}
					>
						&raquo;
					</button>
				</div>
			</nav>
			<div className="form-content">
				<label className="form-label me-2 fw-normal">1 페이지 당 노출 결과 수</label>
				<select
					className="form-select w-auto"
					value={dataPerPage}
					style={{ minWidth: 'auto' }}
					onChange={(event) => handleDataPerPageChange(+event.target.value)}
				>
					{options.map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
