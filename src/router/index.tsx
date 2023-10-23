import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import PrivateRoute from '@/router/PrivateRouter';
import device from '@/router/modules/device';
import member from '@/router/modules/member';
import statistics from '@/router/modules/statistics';
import Login from '@/views/auth/Login';
import PageNotFound from '@/views/common/PageNotFound';

const router = createBrowserRouter([
	{
		element: <PrivateRoute authentication={true} />,
		children: [
			{
				path: '',
				element: <App />,
				errorElement: <PageNotFound />,
				children: [
					{
						path: '/',
						element: <Navigate to="/device" />,
					},
					...member,
					...device,
					...statistics,
				],
			},
		],
	},
	{
		element: <PrivateRoute authentication={false} />,
		children: [{ path: '/login', element: <Login /> }],
	},
]);

export default router;
