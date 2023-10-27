import { Link } from 'react-router-dom';

import ButtonNavbarToggler from '@/features/ui/button/ButtonNavbarToggler';
import ExpirationTime from '@/features/ui/common/ExpirationTime';
import Profile from '@/features/ui/dropdown/Profile';

export default function Header() {
	return (
		<header id="header" className="app-header">
			<Link to="/" className="app-header-title">
				서울교통공사 비상벨통합관제시스템
			</Link>

			<div className="navbar-nav">
				<ExpirationTime />
				<Profile />
				<ButtonNavbarToggler />
			</div>
		</header>
	);
}
