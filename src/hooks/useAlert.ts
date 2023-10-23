import { useRecoilState } from 'recoil';

import { alertState } from '@/state/modal';
import { AlertModalType } from '@/types/Modal.types';

export const useAlert = () => {
	const [modalDataState, setModalDataState] = useRecoilState(alertState);

	const handleAlertClose = () => {
		setModalDataState((prev: AlertModalType) => {
			return { ...prev, isShow: false, content: '' };
		});
	};

	const alertMessage = (content: string) => {
		setTimeout(() => {
			handleAlertClose();
		}, 3000);
		setModalDataState({
			isShow: true,
			content: content,
		});
	};
	return { modalDataState, handleAlertClose, alertMessage };
};
