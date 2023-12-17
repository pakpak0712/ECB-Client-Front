import { useRecoilState } from 'recoil';

import { pushModalState } from '@/state/modal';
import { PushModalType } from '@/types/Modal.types';

interface PropsType {
	title: string;
	push: string | JSX.Element;
	count: number;
}

export const usePushModal = () => {
	const [modalDataState, setModalDataState] = useRecoilState(pushModalState);

	const closePushModal = () => {
		setModalDataState((prev: PushModalType) => {
			if (prev.pushCount === 1) {
				return { isShow: false, isPushShow: false, push: undefined, pushCount: 0 };
			}
			return { ...prev, isPushShow: true, pushCount: prev.pushCount - 1 };
		});
	};
	const openPushModal = (push: undefined | JSX.Element) => {
		setModalDataState((prev: PushModalType) => {
			return { isShow: true, isPushShow: true, push, pushCount: prev.pushCount + 1 };
		});
	};

	const goAlertLink = () => {
		location.href = '/statistics/alert';
	};

	return { modalDataState, openPushModal, closePushModal, goAlertLink };
};
