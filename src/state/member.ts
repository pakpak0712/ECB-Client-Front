import { atom } from 'recoil';

export const memberIdState = atom<number | null>({
	key: 'memberIdState',
	default: null,
});
