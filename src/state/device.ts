import { atom } from 'recoil';

export const deviceIdState = atom<number | null>({
	key: 'deviceIdState',
	default: null,
});
