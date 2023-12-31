import { menuConfig } from '@/config/menu';
import { SecureStorage } from '@/plugin/crypto';
import { MenuConfigType } from '@/types/User.types';

/**
 * 이동 페이지 URL과 검사할 권한으로 해당 메뉴 권한 확인
 * @param url { string }
 */
export const checkRolesByUrl = (url: string) => {
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const { member_flag: memberFlag } = userInfo;
	const organizedMenu = (() => {
		const result: MenuConfigType[] = [];
		menuConfig.forEach((menu) => {
			if (menu.subMenu) {
				result.push(...menu.subMenu);
			} else {
				result.push(menu);
			}
		});

		return result;
	})();
	const targetMenu = organizedMenu.find((menu) => menu.path && url.includes(menu.path));

	if (!targetMenu) throw new Error('Menu Permission Not Founded');

	const menu = targetMenu.memberFlag.indexOf(memberFlag) >= 0;

	if (!menu) location.replace('/');
	return true;
};
