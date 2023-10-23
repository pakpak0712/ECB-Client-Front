import { SecureStorage } from '@/plugin/crypto';

export const dictionary = (val: any, options: { text: string; value: unknown }[]) => {
	return options.find((v) => v.value === val)?.text ?? val;
};
export function getLineStation(string: string) {
	if (!string) return { line: '', station: '' };
	const splitedString = string.split(' ');
	const line = splitedString[0];
	const station = splitedString[1];
	return { line, station };
}

export function getUserInfoFromSession() {
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
