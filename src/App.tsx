import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Footer from '@/features/ui/layout/Footer';
import Header from '@/features/ui/layout/Header';
import Sidebar from '@/features/ui/sidebar/Sidebar';
import { usePushAlarm } from '@/hooks/usePushAlarm';
import { hookReceiver } from '@/plugin/hookReceiver';
import { navbarToggleState } from '@/state/common';

function App() {
	const { fcm } = usePushAlarm();
	fcm();

	hookReceiver.navigate = useNavigate();
	hookReceiver.location = useLocation();

	const [navbarToggle, setNavbarToggle] = useRecoilState(navbarToggleState);

	useEffect(() => {
		setNavbarToggle('');
	}, [hookReceiver.location]);

	useEffect(() => {
		fcm();
	}, []);

	return (
		<div className={`app ${navbarToggle}`}>
			<Header />
			<div className="app-body">
				<Sidebar />
				<main className="app-main">
					<Outlet />
					<Footer />
				</main>
			</div>
		</div>
	);
}

export default App;
