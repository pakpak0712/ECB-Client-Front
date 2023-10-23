import { LoaderFunctionArgs, Outlet } from 'react-router-dom';

import { checkRolesByUrl } from '@/utils/roles';
import Alert from '@/views/statistics/Alert';
import Alive from '@/views/statistics/Alive';

export default [
	{
		path: '/statistics',
		element: <Outlet />,
	},
	{
		path: '/statistics/alert',
		element: <Alert />,
	},
	{
		path: '/statistics/alert/:id',
		element: <Alert />,
	},
	{
		path: '/statistics/alive/',
		loader: (loaderInfo: LoaderFunctionArgs) => checkRolesByUrl(loaderInfo.request.url),
		element: <Alive />,
	},
	{
		path: '/statistics/alive/:id',
		element: <Alive />,
	},
];
