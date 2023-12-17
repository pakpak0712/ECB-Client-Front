import { usePushModal } from '@/hooks/usePushModal';

export default function PushModal() {
	const { modalDataState } = usePushModal();
	console.log('Push Count: ', modalDataState.pushCount);
	return (
		<div className={`modal modal-push modal-dim fade ${modalDataState?.isShow ? 'show' : ''}`}>
			<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 'none' }}>
				{Array.from(Array(modalDataState.pushCount).keys()).map((item, index) => {
					return (
						<div
							className="modal-content w-auto m-auto"
							style={{ top: `${index + 1}vh`, left: `${index + 1}vw`, minWidth: '40vw' }}
						>
							{modalDataState?.push && modalDataState.push}
						</div>
					);
				})}
			</div>
		</div>
	);
}
