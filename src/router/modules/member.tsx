import { LoaderFunctionArgs } from 'react-router-dom';

import { checkRolesByUrl } from '@/utils/roles';
import Member from '@/views/member/Member';

export default [
	{
		path: '/member',
		element: <Member />,
		loader: (loaderInfo: LoaderFunctionArgs) => checkRolesByUrl(loaderInfo.request.url),
	},
	{
		path: '/member/:id',
		element: <Member />,
	},
];
