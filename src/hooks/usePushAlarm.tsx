import { useEffect, useState } from 'react';

import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';

interface PushData {
	title: string;
	alertName: string;
	alertType: string;
	alertPhone: string;
	alertDate: string;
}

export default function usePushAlarm() {
	const [pushList, setPushList] = useState<PushData[]>([]);
	const [isShow, setIsShow] = useState(false);
	const [messageData, setMessageData] = useState<PushData>();

	const closeAlarm = () => {
		if (pushList.length === 1) setIsShow(false);
		const removePushList = pushList.slice(0, -1);
		setPushList(removePushList);
	};

	const renderPushAlarm = () => {
		return (
			<div className={`modal modal-push modal-dim fade ${isShow ? 'show' : ''}`}>
				<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 'none' }}>
					{pushList.map((item: PushData, index: number) => {
						return (
							<div
								key={`push-modal-${index}`}
								className="modal-content w-auto m-auto"
								style={{ top: `${index + 1}vh`, left: `${index + 1}vw`, minWidth: '40vw' }}
							>
								<div className="modal-header">
									<h4 className="modal-title">{item.title}</h4>
									<button
										type="button"
										className="btn-close btn-close-white"
										aria-label="Close"
										onClick={closeAlarm}
									></button>
								</div>
								<div
									className="form-info form-info-vertical px-2"
									//onClick={() => goAlertLink()}
								>
									<div className="modal-body">
										<CustomRow>
											<div className="form-grid">
												<CustomText labelTitle="알림장소" text={item.alertName} />
											</div>
											<div className="form-grid">
												<CustomText labelTitle="알림유형" text={item.alertType} style={{ height: '100%' }} />
											</div>
										</CustomRow>
										<CustomRow>
											<div className="form-grid">
												<CustomText labelTitle="전화번호" text={item.alertPhone} />
											</div>
											<div className="form-grid">
												<CustomText labelTitle="알림일시" text={item.alertDate} />
											</div>
										</CustomRow>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	useEffect(() => {
		if (messageData) {
			if (!isShow) setIsShow(true);
			const pushData = {
				title: messageData.title,
				alertName: messageData.alertName,
				alertType: messageData.alertType,
				alertPhone: messageData.alertPhone,
				alertDate: messageData.alertDate,
			};
			setPushList([...pushList, pushData]);
		}
	}, [messageData]);

	return { renderPushAlarm, setMessageData };
}
