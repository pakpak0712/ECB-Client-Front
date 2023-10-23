import { atom } from 'recoil';

export const alertIdState = atom<number | null>({
	key: 'alertIdState',
	default: null,
});
