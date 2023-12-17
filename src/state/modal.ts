import { atom } from 'recoil';

import { AlertModalType, ConfirmModalType, ContentsModalType, PushModalType } from '@/types/Modal.types';

export const alertState = atom<AlertModalType>({
	key: 'alertState',
	default: {
		isShow: false,
		content: '',
	},
});

export const confirmState = atom<ConfirmModalType | undefined>({
	key: 'confirmState',
	default: {
		isShow: false,
		content: '',
		handleConfirm: undefined,
		handleCancel: undefined,
	},
});

export const contentsModalState = atom<ContentsModalType>({
	key: 'contentsModalState',
	default: {
		isShow: false,
		content: undefined,
	},
});

export const pushModalState = atom<PushModalType>({
	key: 'pushModalState',
	default: {
		isShow: false,
		isPushShow: false,
		push: undefined,
		pushCount: 0,
	},
});
