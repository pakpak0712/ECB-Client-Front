import { menuConfig } from '@/config/menu';
import { getUserInfoFromSession } from '@/utils/common';

/**
 * 이동 페이지 URL과 검사할 권한으로 해당 메뉴 권한 확인
 * @param url { string }
 * @param checkedRole { string }
 */
export const checkRolesByUrl = (url: string) => {
	const userInfo = getUserInfoFromSession();
	const targetMenu = menuConfig.find((menu) => menu.path && url.includes(menu.path));
	if (!targetMenu) throw new Error('Menu Permission Not Founded');
	const menu = targetMenu.memberFlag.indexOf(userInfo.member_flag) >= 0;

	if (!menu) {
		location.replace('/');
		throw new Error('Menu Permission Not Founded');
	}
	return true;
};
