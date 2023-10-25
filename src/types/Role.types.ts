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

export interface UserInfoType {
	member_id: string;
	member_no: number;
	member_viewlist: string;
	member_email: string;
	member_flag: string;
	member_name: string;
	expiry: number;
}
