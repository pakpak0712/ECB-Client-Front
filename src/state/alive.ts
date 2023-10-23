import { atom } from 'recoil';

export const aliveIdState = atom<number | null>({
	key: 'aliveIdState',
	default: null,
});
