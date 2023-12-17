import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { usePushModal } from '@/hooks/usePushModal';

interface Props {
	data: any;
}

export default function PushModalContents({ data }: Props) {
	const { closePushModal, goAlertLink } = usePushModal();

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">{data.data.title}</h4>
				<button
					type="button"
					className="btn-close btn-close-white"
					aria-label="Close"
					onClick={() => closePushModal()}
				></button>
			</div>
			<div
				className="form-info form-info-vertical px-2"
				//onClick={() => goAlertLink()}
			>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="알림장소" text={data.data.alertName} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="알림유형" text={data.data.alertType} style={{ height: '100%' }} />
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="전화번호" text={data.data.alertPhone} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="알림일시" text={data.data.alertDate} />
						</div>
					</CustomRow>
				</div>
			</div>
		</>
	);
}
