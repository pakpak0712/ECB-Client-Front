import { NavLink, matchPath, useMatch, useResolvedPath } from 'react-router-dom';

import menuConfig from '@/config/menu';
import useUserInfoFromSession from '@/hooks/useUserInfoFromSession';

function NavItem({ menu, ...props }: { menu: any }) {
	const resolved = useResolvedPath(menu.path);
	const match = useMatch({ path: resolved.pathname });
	const match2 = matchPath({ path: menu.path, end: false }, location.pathname);

	const caret = menu.subMenu && <div className="menu-caret"></div>;
	const title = menu.title && (
		<div className="menu-text">
			{menu.icon && <i className={`${menu.icon} me-2`} />}
			{menu.title}
		</div>
	);

	return (
		<div className={'menu-item' + (match || match2 ? ' active' : '') + (menu.subMenu ? ' has-sub' : '')}>
			<NavLink className="menu-link" to={menu.path} {...props} reloadDocument>
				{title}
				{caret}
			</NavLink>

			{menu.subMenu && (
				<div className="menu-submenu">
					{menu.subMenu.map((submenu: any, i: number) => (
						<NavItem key={i} menu={submenu} />
					))}
				</div>
			)}
		</div>
	);
}

const SidebarNav = () => {
	const userInfo = useUserInfoFromSession();
	const menu = menuConfig.filter((menu) => {
		const organizedMenu = menu.subMenu
			? (() => {
					const filterdSubMenu = menu.subMenu.filter((subMenu) => {
						return subMenu.memberFlag.indexOf(userInfo?.member_flag) >= 0;
					});
					menu.subMenu = filterdSubMenu;
					return menu;
			  })()
			: menu;
		return organizedMenu.memberFlag.indexOf(userInfo?.member_flag) >= 0;
	});
	return (
		<div className="menu">
			<div className="menu-header hidden">메뉴</div>
			{menu?.map((menu: any, i: number) => <NavItem key={i} menu={menu} />)}
		</div>
	);
};

export default SidebarNav;
