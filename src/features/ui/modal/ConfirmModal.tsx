import { useConfirm } from '@/hooks/useConfirm';

export default function ConfirmModal() {
	const { modalDataState } = useConfirm();
	return (
		<div className={`modal modal-confirm fade ${modalDataState?.isShow ? 'show' : ''}`}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<div className="text-nowrap">{modalDataState?.content}</div>
					</div>
					<div className="modal-footer border-top-0">
						<button type="button" className="btn btn-sm btn-navy" onClick={modalDataState?.handleConfirm}>
							확인
						</button>
						<button type="button" className="btn btn-sm btn-default" onClick={modalDataState?.handleCancel}>
							취소
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
