import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deviceTypeDic } from '@/constants/dictionary';
import CustomInput from '@/features/ui/form/CustomInput';
import CustomSelect from '@/features/ui/form/CustomSelect';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import useRequiredValueCheck from '@/hooks/useRequiredValueCheck';
import { SecureStorage } from '@/plugin/crypto';
import { deviceQueryKey } from '@/queries/_querykey';
import { postMutation } from '@/queries/_utils';
import useDuplicateCheck from '@/queries/useDuplicateCheck';
import useInvalidateFromMutation from '@/queries/useInvalidateFromMutation';
import { deviceIdState } from '@/state/device';
import { DeviceInfoDataType } from '@/types/Device.types';
import { formatOnlyMacAddress, formatOnlyPhoneNumber } from '@/utils/stringUtils';

export default function DeviceInfo() {
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const { member_flag: memberFlag } = userInfo;
	const isAdmin = memberFlag === 1;

	const initialDeviceInfo = {
		tcsDeviceType: '',
		tcsName: '',
		tcsDate: '',
		tcsMatchPhone: '',
		tcsSimpAddr: '',
		tcsCompAddr: ' ',
		tcsMoreAddr: '',
		tcsNum: '',
		tcsMac: '',
		tcsSerial: '',
		tcsMemo: '',
		tcsMap: '',
		hmId: userInfo.member_id,
	};

	const id = useRecoilValue(deviceIdState);

	const { closeContentModal } = useContentsModal();

	const [deviceInfo, setDeviceInfo] = useState<DeviceInfoDataType>(initialDeviceInfo);
	const [savedDeviceInfo, setSavedDeviceInfo] = useState<DeviceInfoDataType>(initialDeviceInfo);

	// 상세 정보 가져오기
	const updateMutation = useMutation({
		mutationFn: () => postMutation([...deviceQueryKey.detail(), null, { tcsNo: id }]),
		onSuccess: (data) => {
			const deviceInfo = {
				...initialDeviceInfo,
				tcsDeviceType: data.tcs_deviceType,
				tcsName: data.tcs_name,
				tcsDate: data.tcs_ALdate,
				tcsMatchPhone: data.tcs_matchPhone,
				tcsSimpAddr: data.tcs_simpAddr,
				tcsCompAddr: data.tcs_compAddr?.trim(),
				tcsMoreAddr: data.tcs_moreAddr,
				tcsNum: data.tcs_num,
				tcsMac: data.tcs_mac,
				tcsSerial: data.tcs_serial,
				tcsMemo: data.tcs_memo,
				tcsMap: data.tcs_map,
			};
			setDeviceInfo(deviceInfo);
			setSavedDeviceInfo(deviceInfo);
		},
	});

	// 중복 체크
	const inputMacRef = useRef<HTMLInputElement>(null);
	const isSameTcsMac = !!deviceInfo['tcsMac'].trim() && savedDeviceInfo['tcsMac'] === deviceInfo['tcsMac'];
	const { isDuplicateChecked, handleDuplicateCheck } = useDuplicateCheck(
		deviceQueryKey.chkDup(),
		{ tcsMac: deviceInfo.tcsMac },
		'MAC 주소',
		'deviceMac',
		isSameTcsMac,
	);

	// 등록/수정
	const insertQueryKey = id ? 'update' : 'insert';
	const insertQueryParams = id ? { ...deviceInfo, tcsNo: id } : deviceInfo;
	const insertMutation = useInvalidateFromMutation(deviceQueryKey, insertQueryKey, insertQueryParams);

	const handleChangeDeviceInfo = (name: string, value: string) => {
		setDeviceInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	// 필수값 체크
	const requiredDeviceInfo: Record<string, string | string[]> = {
		tcsMac: 'MAC 주소',
	};
	const requiredValueCheck = useRequiredValueCheck(deviceInfo, requiredDeviceInfo);
	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (requiredValueCheck(isDuplicateChecked)) {
			insertMutation.mutate();
		}
	};

	const handleModalClose = () => {
		setDeviceInfo(initialDeviceInfo);
		closeContentModal();
	};

	useEffect(() => {
		if (insertMutation.isSuccess) {
			handleModalClose();
		}
	}, [insertMutation.isSuccess]);

	useEffect(() => {
		if (id) updateMutation.mutate();
		else setDeviceInfo(initialDeviceInfo);
	}, [id]);

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">
					{isAdmin ? `비상벨 ${id ? '정보 수정' : '신규 등록'}` : ''}
					{!isAdmin ? `비상벨 ${id ? '정보' : '신규 등록'}` : ''}
				</h4>
			</div>
			<form
				className="form-info form-info-vertical px-2"
				onSubmit={(event) => handleSubmit(event)}
				style={{ maxWidth: '900px', width: '90vw' }}
			>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								labelTitle="구매자"
								name="tcsName"
								defaultValue={`${deviceInfo.tcsName}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
						<div className="form-grid">
							<CustomSelect
								labelTitle="설치모델"
								name="tcsDeviceType"
								defaultValue={deviceInfo.tcsDeviceType}
								handleState={handleChangeDeviceInfo}
								optionDictionary={deviceTypeDic}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								labelTitle="설치장소"
								name="tcsSimpAddr"
								defaultValue={`${deviceInfo.tcsSimpAddr}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								labelTitle="설치주소"
								name="tcsCompAddr"
								defaultValue={`${deviceInfo.tcsCompAddr}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								labelTitle="세부설치위치"
								name="tcsMoreAddr"
								defaultValue={`${deviceInfo.tcsMoreAddr}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								labelTitle="설치수량(S)"
								name="tcsNum"
								defaultValue={`${deviceInfo.tcsNum}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						{isAdmin && (
							<div className="form-grid">
								<CustomInput
									_ref={inputMacRef}
									required={true}
									labelTitle="MAC 주소"
									name="tcsMac"
									defaultValue={deviceInfo.tcsMac}
									isOnlyText={memberFlag !== 1}
									handleState={handleChangeDeviceInfo}
									handlePattern={formatOnlyMacAddress}
									siblings={
										<button
											type="button"
											className="btn btn-default"
											onClick={() => {
												if (inputMacRef.current?.checkValidity()) handleDuplicateCheck(deviceInfo.tcsMac);
												else inputMacRef.current?.reportValidity();
											}}
											disabled={isSameTcsMac}
										>
											중복 확인
										</button>
									}
									pattern=".{17,17}"
									title="12 자리를 맞춰서 입력해주세요."
									readOnly={!isSameTcsMac && isDuplicateChecked}
								/>
							</div>
						)}
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								required={true}
								labelTitle="라우터번호"
								name="tcsSerial"
								defaultValue={deviceInfo.tcsSerial}
								isOnlyText={memberFlag !== 1}
								handleState={handleChangeDeviceInfo}
								handlePattern={formatOnlyPhoneNumber}
								pattern=".{11,}"
								title="9자 이상을 입력해주세요."
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								labelTitle="전화번호"
								name="tcsMatchPhone"
								defaultValue={deviceInfo.tcsMatchPhone}
								isOnlyText={memberFlag !== 1}
								handleState={handleChangeDeviceInfo}
								handlePattern={formatOnlyPhoneNumber}
								minLength={11}
							/>
						</div>
					</CustomRow>
					{isAdmin && (
						<CustomRow>
							<div className="form-grid">
								<CustomInput
									labelTitle="메모"
									name="tcsMemo"
									defaultValue={deviceInfo.tcsMemo}
									isOnlyText={memberFlag !== 1}
									handleState={handleChangeDeviceInfo}
									pattern=".{0,1000}"
									title="1000자 이하로 입력해주세요."
								/>
							</div>
						</CustomRow>
					)}
					{isAdmin && (
						<CustomRow>
							<div className="form-grid">
								<CustomInput
									labelTitle="지도 (위치)"
									name="tcsMap"
									defaultValue={deviceInfo.tcsMap}
									isOnlyText={memberFlag !== 1}
									handleState={handleChangeDeviceInfo}
									pattern=".{0,1000}"
									title="1000자 이하로 입력해주세요."
								/>
							</div>
						</CustomRow>
					)}
				</div>
				<div className="modal-footer">
					{isAdmin && (
						<button type="submit" className="btn btn-navy">
							{id ? '수정' : '등록'}
						</button>
					)}
					<button type="button" className="btn btn-default" onClick={handleModalClose}>
						{isAdmin ? '취소' : '닫기'}
					</button>
				</div>
			</form>
		</>
	);
}
