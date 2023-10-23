import { Link } from 'react-router-dom';

import ButtonNavbarToggler from '@/features/ui/button/ButtonNavbarToggler';
import Profile from '@/features/ui/dropdown/Profile';

export default function Header() {
	const userName = '최은광';
	return (
		<div id="header" className={'app-header'}>
			<Link to="/" className="app-header-title">
				서울교통공사 비상벨통합관제시스템
			</Link>

			<div className="navbar-nav">
				<Profile />
				<ButtonNavbarToggler />
			</div>
		</div>
	);
}
