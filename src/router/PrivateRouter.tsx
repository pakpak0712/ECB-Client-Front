import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SecureStorage } from '@/plugin/crypto';

interface PrivateRouteProps {
	children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
	authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): React.ReactElement | null {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const isAuthenticated = userInfo ? true : false;

	if (authentication) {
		// 인증이 반드시 필요한 페이지

		// 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
		return isAuthenticated === null || !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
	} else {
		// 인증이 반드시 필요 없는 페이지

		// 인증을 안햇을 경우 해당 페이지로 인증을 한 상태일 경우 main페이지로
		return isAuthenticated === null || !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
	}
}
