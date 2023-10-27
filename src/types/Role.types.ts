/* 메뉴 권한 */
export interface MenuConfigType {
	icon?: string;
	memberFlag: string;
	path: string;
	title: string;
}

export interface MenuRoleType {
	menuId: string;
	menuName: string;
	role: string;
}
export interface MenuPermissionType {
	menuId: string;
	menuName: string;
	subMenu?: Array<MenuRoleType>;
}
