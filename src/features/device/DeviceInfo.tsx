import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { compAddressDic, deviceTypeDic } from '@/constants/dictionary';
import { initialViewList } from '@/constants/initial';
import CustomInput from '@/features/ui/form/CustomInput';
import CustomOptionAfterFetch from '@/features/ui/form/CustomOptionAfterFetch';
import CustomSelect from '@/features/ui/form/CustomSelect';
import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import useRequiredValueCheck from '@/hooks/useRequiredValueCheck';
import useUserInfoFromSession from '@/hooks/useUserInfoFromSession';
import useSubwayData from '@/hooks/useViewList';
import { deviceQueryKey, lineStationQueryKey } from '@/queries/_querykey';
import { postMutationQueryString } from '@/queries/_utils';
import useDuplicateCheck from '@/queries/useDuplicateCheck';
import useInvalidateFromMutation from '@/queries/useInvalidateFromMutation';
import { deviceIdState } from '@/state/device';
import { getValueOrEmptyFromObject } from '@/utils/objectUtils';
import { formatOnlyMacAddress, formatOnlyPhoneNumber } from '@/utils/stringUtils';

export default function DeviceInfo() {
	const userInfo = useUserInfoFromSession();
	const initialDeviceInfo = {
		tcsDeviceType: deviceTypeDic[0].value,
		tcsName: getValueOrEmptyFromObject(userInfo, 'member_viewlist'),
		tcsDate: '',
		tcsMatchPhone: '',
		tcsSimpAddr: getValueOrEmptyFromObject(userInfo, 'member_viewlist'),
		tcsCompAddr: '',
		tcsMac: '',
		tcsSerial: '',
		tcsMemo: '',
	};

	const id = useRecoilValue(deviceIdState);
	const { closeContentModal } = useContentsModal();

	const [deviceInfo, setDeviceInfo] = useState(initialDeviceInfo);
	const [savedDeviceInfo, setSavedDeviceInfo] = useState(initialDeviceInfo);
	const { viewList, setViewList, stationParams, setViewListFromData, handleChangeViewList } =
		useSubwayData(setDeviceInfo);

	// 상세 정보 가져오기
	const updateMutation = useMutation({
		mutationFn: () => postMutationQueryString([...deviceQueryKey.detail(), { tcsNo: id }]),
		onSuccess: (data) => {
			const deviceInfo = {
				tcsDeviceType: deviceTypeDic[0].value,
				tcsName: data.tcs_name,
				tcsDate: data.tcs_ALdate,
				tcsMatchPhone: data.tcs_matchPhone,
				tcsSimpAddr: data.tcs_simpAddr,
				tcsCompAddr: data.tcs_compAddr?.trim(),
				tcsMac: data.tcs_mac,
				tcsSerial: data.tcs_serial,
				tcsMemo: data.tcs_memo,
			};
			setViewListFromData(data.tcs_simpAddr);
			setDeviceInfo(deviceInfo);
			setSavedDeviceInfo(deviceInfo);
		},
	});

	// 중복 체크
	const { isDuplicateChecked, handleDuplicateCheck } = useDuplicateCheck(
		deviceQueryKey.chkDup(),
		{ tcsMac: deviceInfo.tcsMac },
		'MAC 주소',
		'deviceMac',
		savedDeviceInfo['tcsMac'] === deviceInfo['tcsMac'],
	);

	// 등록/수정
	const insertQueryKey = id ? 'update' : 'insert';
	const insertQueryParams = id ? { ...deviceInfo, tcsNo: id } : deviceInfo;
	const insertMutation = useInvalidateFromMutation(deviceQueryKey, insertQueryKey, insertQueryParams);

	const handleChangeDeviceInfo = (name: string, value: string | number) => {
		setDeviceInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	// 필수값 체크
	const requiredDeviceInfo: Record<string, string | string[]> = {
		tcsSimpAddr: ['호선', '역'],
		tcsCompAddr: ['장소'],
		tcsMac: 'MAC',
		tcsMatchPhone: '전화번호',
		tcsSerial: '라우트',
	};
	const requiredValueCheck = useRequiredValueCheck(deviceInfo, requiredDeviceInfo);
	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (requiredValueCheck(isDuplicateChecked)) {
			insertMutation.mutate();
		}
	};

	const handleModalClose = () => {
		setViewList(initialViewList);
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

	useEffect(() => {
		if (!viewList.station) {
			setDeviceInfo((prev) => {
				return { ...prev, tcsCompAddr: '' };
			});
		}
	}, [viewList]);

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">{`장비 ${id ? '정보 수정' : '신규 등록'}`}</h4>
			</div>
			<form
				className="form-info form-info-vertical px-2"
				onSubmit={(event) => handleSubmit(event)}
				style={{ maxWidth: '900px', width: '90vw' }}
			>
				<div className="modal-body">
					<CustomRow>
						<div className="form-grid">
							<CustomSelect
								title="장비 종류"
								name="tcsDeviceType"
								defaultValue={deviceInfo.tcsDeviceType}
								handleState={handleChangeDeviceInfo}
								childrenOption={deviceTypeDic}
								readOnly={true}
							/>
						</div>
						<div className="form-grid">
							<CustomText
								title="설치장소"
								name="tcsName"
								text={`${deviceInfo.tcsSimpAddr} ${deviceInfo.tcsCompAddr}`}
								handleState={handleChangeDeviceInfo}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomSelect
								required={true}
								title="호선"
								name="tcsSimpAddr-line"
								defaultValue={viewList.line}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeViewList}
								enableBlankSelect={true}
								disabled={initialDeviceInfo.tcsSimpAddr ? true : false}
							>
								<CustomOptionAfterFetch queryKey={[...lineStationQueryKey.lineList()]} dataKey="lineList" />
							</CustomSelect>
						</div>
						<div className="form-grid">
							<CustomSelect
								required={true}
								title="역"
								name="tcsSimpAddr-station"
								defaultValue={viewList.station}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeViewList}
								enableBlankSelect={true}
								disabled={!viewList.line || (initialDeviceInfo.tcsSimpAddr ? true : false)}
							>
								<CustomOptionAfterFetch
									queryKey={[...lineStationQueryKey.sttList(), stationParams]}
									dataKey="sttList"
								/>
							</CustomSelect>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomSelect
								required={true}
								title="장소"
								name="tcsCompAddr"
								defaultValue={deviceInfo.tcsCompAddr}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeDeviceInfo}
								childrenOption={compAddressDic}
								enableBlankSelect={true}
								disabled={!viewList.station}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="MAC"
								name="tcsMac"
								defaultValue={deviceInfo.tcsMac}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeDeviceInfo}
								handlePattern={formatOnlyMacAddress}
								siblings={
									<button
										type="button"
										className="btn btn-default"
										onClick={() => handleDuplicateCheck(deviceInfo.tcsMac)}
										disabled={savedDeviceInfo['tcsMac'] === deviceInfo['tcsMac']}
									>
										중복 확인
									</button>
								}
								minLength={17}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="전화번호"
								name="tcsMatchPhone"
								defaultValue={deviceInfo.tcsMatchPhone}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeDeviceInfo}
								handlePattern={formatOnlyPhoneNumber}
								minLength={11}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="라우터"
								name="tcsSerial"
								defaultValue={deviceInfo.tcsSerial}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeDeviceInfo}
								handlePattern={formatOnlyPhoneNumber}
								minLength={11}
							/>
						</div>
					</CustomRow>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								title="메모"
								name="tcsMemo"
								defaultValue={deviceInfo.tcsMemo}
								readOnly={userInfo.member_flag !== 1}
								handleState={handleChangeDeviceInfo}
								maxLength={30}
							/>
						</div>
					</CustomRow>
				</div>
				<div className="modal-footer">
					{userInfo.member_flag === 1 && (
						<button type="submit" className="btn btn-navy">
							{id ? '수정' : '등록'}
						</button>
					)}
					<button type="button" className="btn btn-default" onClick={handleModalClose}>
						{userInfo.member_flag === 1 ? '취소' : '닫기'}
					</button>
				</div>
			</form>
		</>
	);
}
