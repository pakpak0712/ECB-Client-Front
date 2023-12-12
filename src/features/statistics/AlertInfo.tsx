import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { statisticsQueryKey } from '@/queries/_querykey';
import { postMutation } from '@/queries/_utils';
import { alertIdState } from '@/state/alert';

export default function AlertInfo() {
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const { member_flag: memberFlag } = userInfo;
	const initialAlertInfo = {
		alertName: '',
		alertPhone: '',
		alertSimpaddr: '',
		alertDevicetype: '',
		alertMac: '',
		alertSerial: '',
		alertType: '',
		alertDate: '',
	};

	const id = useRecoilValue(alertIdState);
	const { closeContentModal } = useContentsModal();

	const [alertInfo, setAlertInfo] = useState(initialAlertInfo);

	const updateMutation = useMutation({
		mutationFn: () => postMutation([...statisticsQueryKey.alertDetail(), null, { alertNo: id }]),
		onSuccess: (data) => {
			const alertInfo = {
				alertName: data.alertName,
				alertPhone: data.alertPhone,
				alertSimpaddr: data.alertSimpaddr,
				alertDevicetype: data.alertDevicetype,
				alertMac: data.alertMac,
				alertSerial: data.alertSerial,
				alertType: data.alertType,
				alertDate: data.alertDate,
			};
			setAlertInfo(alertInfo);
		},
	});

	const handleChangeAlertInfo = (name: string, value: string | number) => {
		setAlertInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleModalClose = () => {
		setAlertInfo(initialAlertInfo);
		closeContentModal();
	};

	useEffect(() => {
		if (id) updateMutation.mutate();
		else setAlertInfo(initialAlertInfo);
	}, [id]);

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">알림 정보</h4>
			</div>
			<div className="form-info form-info-vertical px-2" style={{ maxWidth: '900px', width: '90vw' }}>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="알림장소" text={alertInfo.alertName} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="알림유형" text={alertInfo.alertType} />
						</div>
					</CustomRow>
					<CustomRow>
						{memberFlag === 1 && (
							<div className="form-grid">
								<CustomText labelTitle="MAC" text={alertInfo.alertMac} />
							</div>
						)}
						<div className="form-grid">
							<CustomText labelTitle="라우터" text={alertInfo.alertSerial} />
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomText labelTitle="전화번호" text={alertInfo.alertPhone} />
						</div>
						<div className="form-grid">
							<CustomText labelTitle="알림일시" text={alertInfo.alertDate} />
						</div>
					</CustomRow>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default" onClick={handleModalClose}>
						닫기
					</button>
				</div>
			</div>
		</>
	);
}
