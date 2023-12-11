import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';

interface Props {
	data: any;
}

export default function PushModal({ data }: Props) {
	const { closeContentModal, goAlertLink } = useContentsModal();

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">{data.data.title}</h4>
				<button
					type="button"
					className="btn-close btn-close-white"
					aria-label="Close"
					onClick={() => closeContentModal()}
				></button>
			</div>
			<div
				className="form-info form-info-vertical px-2"
				style={{ maxWidth: '600px', width: '90vw' }}
				onClick={() => goAlertLink()}
			>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="장소" text={data.data.alertName} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="알람" text={data.data.alertType} />
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="전화번호" text={data.data.alertPhone} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="일시" text={data.data.alertDate} />
						</div>
					</CustomRow>
				</div>
			</div>
		</>
	);
}
