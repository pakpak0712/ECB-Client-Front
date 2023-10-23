import { getLineStation, getUserInfoFromSession } from '@/utils/common';

export const initialParams = {
	searchDTO: {
		searchType: '',
		searchWord: '',
	},
	orderDTO: {
		orderType: '',
		orderWord: '',
	},
	pageDTO: {
		curPage: 1,
		pagePerRow: 10,
	},
};
export const initialData = {
	list: [],
	params: initialParams,
};

const userInfo = getUserInfoFromSession();
export const initialViewList = getLineStation(userInfo && userInfo.member_viewlist ? userInfo.member_viewlist : '');
