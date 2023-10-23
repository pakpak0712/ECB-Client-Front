import { SecureStorage } from '@/plugin/crypto';

export default function useUserInfoFromSession() {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user', 'data');
	if (userInfo) {
		const { expiry } = userInfo;
		const currentTime = new Date().getTime();
		if (expiry >= currentTime) return userInfo;
		else {
			secureStorage.removeItem('user');
			return false;
		}
	} else {
		return false;
	}
}
