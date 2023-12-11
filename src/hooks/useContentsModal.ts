import { useRecoilState } from 'recoil';

import { contentsModalState } from '@/state/modal';
import { ContentsModalType } from '@/types/Modal.types';

interface PropsType {
	title: string;
	content: string | JSX.Element;
}

export const useContentsModal = () => {
	const [modalDataState, setModalDataState] = useRecoilState(contentsModalState);

	const closeContentModal = () => {
		setModalDataState((prev: ContentsModalType) => {
			return { isShow: false, content: undefined };
		});
	};

	const openContentModal = (content: undefined | JSX.Element) => {
		setModalDataState((prev: ContentsModalType) => {
			return { isShow: true, content };
		});
	};

	const goAlertLink = () => {
		location.href = '/statistics/alert';
	};

	return { modalDataState, openContentModal, closeContentModal, goAlertLink };
};
