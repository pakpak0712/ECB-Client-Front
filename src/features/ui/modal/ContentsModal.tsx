import { useContentsModal } from '@/hooks/useContentsModal';

export default function ContentsModal() {
	const { modalDataState } = useContentsModal();
	return (
		<div className={`modal modal-dim fade ${modalDataState?.isShow ? 'show' : ''}`}>
			<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 'none' }}>
				<div className="modal-content w-auto m-auto" style={{ minWidth: '40vw' }}>
					{modalDataState?.content && modalDataState.content}
				</div>
			</div>
		</div>
	);
}
