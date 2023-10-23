import { useRecoilState } from 'recoil';

import { navbarToggleState } from '@/state/common';

export default function ButtonNavbarToggler() {
	const [navbarToggle, setNavbarToggle] = useRecoilState(navbarToggleState);
	const handleToggle = () => {
		setNavbarToggle(navbarToggle ? '' : 'show-mobile-navbar');
	};

	return (
		<button type="button" className={`navbar-mobile-toggler`} onClick={handleToggle}>
			<div className="icon-bar-box">
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</div>
		</button>
	);
}
