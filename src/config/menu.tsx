export const menuConfig = [
	{
		memberFlag: '1',
		path: '/member',
		icon: 'fa-solid fa-user',
		title: '회원 관리',
	},
	{
		memberFlag: '0,1,3',
		path: '/device',
		icon: 'fa-solid fa-pen-to-square',
		title: '비상벨 관리',
	},
	{
		memberFlag: '0,1,3',
		path: '/statistics',
		icon: 'fa-solid fa-chart-simple',
		title: '통계',
		subMenu: [
			{
				memberFlag: '0,1,3',
				path: '/statistics/alert',
				title: '알림 통계',
			},
			{
				memberFlag: '1',
				path: '/statistics/alive',
				title: '고장 통계',
			},
		],
	},
];

export default menuConfig;
