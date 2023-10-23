import { useAlert } from '@/hooks/useAlert';

export default function AlertModal() {
	const { modalDataState, handleAlertClose } = useAlert();
	return (
		<div className={`modal modal-message d-block ${!modalDataState.isShow || 'show'}`}>
			<div className="modal-dialog modal-dialog-top">
				<div className="modal-content">
					<button
						type="button"
						className="btn-close btn-close-white"
						aria-label="Close"
						onClick={handleAlertClose}
					></button>
					<div className="modal-body">{modalDataState.content}</div>
				</div>
			</div>
		</div>
	);
}
