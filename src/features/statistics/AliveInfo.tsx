import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { statisticsQueryKey } from '@/queries/_querykey';
import { postMutation } from '@/queries/_utils';
import { aliveIdState } from '@/state/alive';

const initialAliveInfo = {
	aliveName: '',
	alivePhone: '',
	aliveSimpaddr: '',
	aliveDevicetype: '',
	aliveMac: '',
	aliveSerial: '',
	aliveType: '',
	aliveDate: '',
};

export default function AliveInfo() {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const { member_flag: memberFlag } = userInfo;
	const id = useRecoilValue(aliveIdState);
	const { closeContentModal } = useContentsModal();
	const [aliveInfo, setAliveInfo] = useState(initialAliveInfo);

	const updateMutation = useMutation({
		mutationFn: () => postMutation([...statisticsQueryKey.aliveDetail(), null, { aliveNo: id }]),
		onSuccess: (data) => {
			const aliveInfo = {
				aliveName: data.aliveName,
				alivePhone: data.alivePhone,
				aliveSimpaddr: data.aliveSimpaddr,
				aliveDevicetype: data.aliveDevicetype,
				aliveMac: data.aliveMac,
				aliveSerial: data.aliveSerial,
				aliveType: data.aliveType,
				aliveDate: data.aliveDate,
			};
			setAliveInfo(aliveInfo);
		},
	});

	const handleChangeAliveInfo = (name: string, value: string | number) => {
		setAliveInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleModalClose = () => {
		setAliveInfo(initialAliveInfo);
		closeContentModal();
	};

	useEffect(() => {
		if (id) updateMutation.mutate();
		else setAliveInfo(initialAliveInfo);
	}, [id]);

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">고장 정보</h4>
			</div>
			<div className="form-info form-info-vertical px-2" style={{ maxWidth: '900px', width: '90vw' }}>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomText title="고장장소" text={aliveInfo.aliveName} />
						</div>
						{memberFlag === 1 && (
							<div className="form-grid">
								<CustomText title="MAC" text={aliveInfo.aliveMac} />
							</div>
						)}
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomText title="전화번호" text={aliveInfo.alivePhone} />
						</div>
						<div className="form-grid">
							<CustomText title="라우터" text={aliveInfo.aliveSerial} />
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomText title="고장일시" text={aliveInfo.aliveDate} />
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
