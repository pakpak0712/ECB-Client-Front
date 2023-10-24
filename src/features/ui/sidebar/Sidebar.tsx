import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import SidebarNav from '@/features/ui/sidebar/SidebarNav';

const Sidebar = () => {
	useEffect(() => {
		const menuLinkSelector = '.app-sidebar .menu > .menu-item.has-sub' + ' > .menu-link';
		const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
		menus.map(function (menu: any) {
			menu.onclick = function (e: any) {
				e.preventDefault();
				const target = this.nextElementSibling;

				menus.map(function (m: any) {
					const otherTarget = m.nextElementSibling;
					if (otherTarget !== target) {
						otherTarget.closest('.menu-item').classList.remove('expand');
						otherTarget.closest('.menu-item').classList.add('closed');
					}
					return true;
				});
				const targetItemElm = target.closest('.menu-item');

				if (
					targetItemElm.classList.contains('expand') ||
					(targetItemElm.classList.contains('active') && !targetItemElm.classList.contains('closed'))
				) {
					console.log('close');
					targetItemElm.classList.remove('expand');
					targetItemElm.classList.add('closed');
				} else {
					console.log('expand');
					targetItemElm.classList.add('expand');
					targetItemElm.classList.remove('closed');
				}
			};
		});
	}, []);
	return (
		<>
			<aside id="sidebar" className="app-sidebar">
				<SidebarNav />
			</aside>
			<div className="app-sidebar-bg"></div>
			<div className="app-sidebar-mobile-backdrop">
				<Link to="/"></Link>
			</div>
		</>
	);
};

export default Sidebar;
