import { useRecoilState } from 'recoil';

import { confirmState } from '@/state/modal';

export const useConfirm = () => {
	const [modalDataState, setModalDataState] = useRecoilState(confirmState);

	const confirmMessage = async (content: string) => {
		return new Promise((resolve) => {
			setModalDataState(() => {
				return {
					isShow: true,
					content: content,
					handleConfirm: () => {
						setModalDataState(undefined);
						resolve(true);
					},
					handleCancel: () => {
						setModalDataState(undefined);
						resolve(false);
					},
				};
			});
		});
	};
	return { modalDataState, confirmMessage };
};
