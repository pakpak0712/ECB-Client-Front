import { Dispatch, SetStateAction } from 'react';

import { PageMapType, SearchParamsType } from '@/types/Common.types';

interface PaginationProps<T> {
	pageMap: PageMapType;
	setParams: Dispatch<SetStateAction<T>>;
}
export default function Pagination<T extends SearchParamsType>({ pageMap, setParams }: PaginationProps<T>) {
	const buttonPerPage = 5;
	const totalCount = pageMap?.totRow;
	const dataPerPage = pageMap?.pagePerRow;
	const pageNo = pageMap?.curPage;
	const totalPage = pageMap?.totPage;
	const hasNext = totalPage !== pageMap?.curPage;
	const options = [10, 15, 20, 25, 30, 40, 50];
	const currentPageSection = Math.ceil((totalPage / buttonPerPage) * (pageNo / totalPage));
	const startPage = Math.max(1, (currentPageSection - 1) * buttonPerPage + 1);
	const endPage = buttonPerPage * currentPageSection > totalPage ? totalPage : buttonPerPage * currentPageSection;
	const buttonCount = endPage - startPage + 1;

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
		<div className="pagination-wrapper">
			<div className="form-content">
				<div className="">전체 결과 수 : {totalCount}</div>
			</div>
			<nav className="pagination">
				<div className={`page-item ${pageNo <= 1 && 'disabled'}`}>
					<button type="button" className="page-link page-link-arrow" onClick={() => handlePageNumberChange(1)}>
						&laquo;
					</button>
				</div>
				<div className={`page-item ${pageNo <= 1 && 'disabled'}`}>
					<button
						type="button"
						className="page-link page-link-arrow"
						onClick={() => handlePageNumberChange(pageNo - buttonPerPage)}
					>
						&lsaquo;
					</button>
				</div>
				{Array.from({ length: buttonCount }, (_, i) => startPage + i).map((value, index) => {
					if (value) {
						return (
							<div className={`page-item ${pageNo === value && 'active'}`} key={`pagination-btn-${index}`}>
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
						onClick={() => handlePageNumberChange(pageNo + buttonPerPage)}
					>
						&rsaquo;
					</button>
				</div>
				<div className={`page-item ${!hasNext && 'disabled'}`}>
					<button type="button" className="page-link page-link-arrow" onClick={() => handlePageNumberChange(totalPage)}>
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
