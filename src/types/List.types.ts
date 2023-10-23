export interface SearchCondition {
	searchDTO: {
		searchType: string;
		searchWord: string;
	};
	orderDTO: {
		orderType: string;
		orderWord: string;
	};
	pageDTO: {
		curPage: number;
		pagePerRow: number;
	};
}
