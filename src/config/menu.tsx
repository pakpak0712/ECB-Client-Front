export const menuConfig = [
	{
		memberFlag: '1',
		path: '/member',
		icon: 'fa-solid fa-user',
		title: '회원 관리',
	},
	{
		memberFlag: '1,4,5',
		path: '/device',
		icon: 'fa-solid fa-pen-to-square',
		title: '장비 관리',
	},
	{
		memberFlag: '1,4,5',
		path: '/statistics',
		icon: 'fa-solid fa-chart-simple',
		title: '통계',
		subMenu: [
			{
				memberFlag: '1,4,5',
				path: '/statistics/alert',
				title: '알람 통계',
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
