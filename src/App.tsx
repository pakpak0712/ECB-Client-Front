import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import PushModal from '@/features/push/PushModal';
import Footer from '@/features/ui/layout/Footer';
import Header from '@/features/ui/layout/Header';
import Sidebar from '@/features/ui/sidebar/Sidebar';
import { useContentsModal } from '@/hooks/useContentsModal';
import { hookReceiver } from '@/plugin/hookReceiver';
import { navbarToggleState } from '@/state/common';

function App() {
	hookReceiver.navigate = useNavigate();
	hookReceiver.location = useLocation();

	const [navbarToggle, setNavbarToggle] = useRecoilState(navbarToggleState);

	useEffect(() => {
		setNavbarToggle('');
	}, [hookReceiver.location]);

	// 푸시 알림 모달 띄우기
	const { openContentModal } = useContentsModal();
	const bc = new BroadcastChannel('fcm');

	bc.onmessage = function (e) {
		openContentModal(<PushModal data={e} />);
	};

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
