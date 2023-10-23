import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Footer from '@/features/ui/layout/Footer';
import Header from '@/features/ui/layout/Header';
import Sidebar from '@/features/ui/sidebar/Sidebar';
import { hookReceiver } from '@/plugin/hookReceiver';
import { navbarToggleState } from '@/state/common';

function App() {
	hookReceiver.navigate = useNavigate();
	hookReceiver.location = useLocation();

	const [navbarToggle, setNavbarToggle] = useRecoilState(navbarToggleState);

	useEffect(() => {
		setNavbarToggle('');
	}, [hookReceiver.location]);

	return (
		<div className={`app hljs ${navbarToggle}`}>
			<Header />
			<Sidebar />
			<div className={'app-contents'}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default App;
