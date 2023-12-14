export interface LoginInfoType {
	memberId: string;
	memberPw: string;
}

export interface PageDTOType {
	curPage: number;
	pagePerRow: number;
}
export interface SearchDTOType {
	memberFlag: string;
	memberViewlist: string;
	searchType: string;
	searchWord: string;
}

export interface SearchParamsType {
	searchDTO: SearchDTOType;
	orderDTO: {
		orderType: string;
		orderWord: string;
	};
	pageDTO: PageDTOType;
}

export interface PageMapType {
	startPage: number;
	curPage: number;
	startRow: number;
	totRow: number;
	aliveRow: number;
	deadRow: number;
	endRow: number;
	pagePerRow: number;
	endPage: number;
	totPage: number;
}

export interface InitialSubwayType {
	line: string;
	station: string;
}
