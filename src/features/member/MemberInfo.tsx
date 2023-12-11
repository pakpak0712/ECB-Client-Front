import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CustomChildren from '@/features/ui/form/CustomChildren';
import CustomInput from '@/features/ui/form/CustomInput';
import CustomSelect from '@/features/ui/form/CustomSelect';
import CustomText from '@/features/ui/form/CustomText';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import useRequiredValueCheck from '@/hooks/useRequiredValueCheck';
import useViewList from '@/hooks/useViewList';
import { SecureStorage } from '@/plugin/crypto';
import { lineStationQueryKey, memberQueryKey } from '@/queries/_querykey';
import { postMutation } from '@/queries/_utils';
import useDuplicateCheck from '@/queries/useDuplicateCheck';
import useInvalidateFromMutation from '@/queries/useInvalidateFromMutation';
import { memberIdState } from '@/state/member';
import { MemberInfoDataType } from '@/types/Member.types';
import { getLineStation } from '@/utils/common';
import {
	formatOnlyNumberEnglish,
	formatOnlyPhoneNumber,
	validateEmail,
	validatePasswordMatch,
} from '@/utils/stringUtils';

export default function MemberInfo() {
	const secureStorage = new SecureStorage(localStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const initialMemberInfo = {
		memberId: '',
		memberPw: '',
		memberName: '',
		memberPhone: '',
		memberEmail: '',
		memberViewlist: '',
		memberFlag: '',
		hmId: userInfo.member_id,
	};
	const id = useRecoilValue(memberIdState);

	const isRegister = !id;
	const isModify = id ? true : false;
	const isModifyMember = id && id !== userInfo.member_no ? true : false;
	const isModifyUser = id && id === userInfo.member_no ? true : false;

	const { closeContentModal } = useContentsModal();

	const [memberInfo, setMemberInfo] = useState<MemberInfoDataType>(initialMemberInfo);
	const [savedMemberInfo, setSavedMemberInfo] = useState<MemberInfoDataType>(initialMemberInfo);
	const { initialViewList, viewList, setViewList, stationParams, handleChangeViewList } = useViewList(setMemberInfo);

	// 비밀번호 변경
	const initialPasswordChangeInfo = {
		originalMemberPw: '',
		confirmMemberPw: '',
	};
	const [passwordChangeInfo, setPasswordChangeInfo] = useState(initialPasswordChangeInfo);
	const [isPasswordChange, setIsPasswordChange] = useState(false);
	const handleChangePassword = (name: string, value: string) => {
		setPasswordChangeInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	// 회원 수정
	const updateMutation = useMutation({
		mutationFn: () => postMutation([...memberQueryKey.detail(), null, { memberNo: id }]),
		onSuccess: (data) => {
			const memberInfo = {
				...initialMemberInfo,
				memberId: data.member_id,
				memberPw: data.member_eg,
				memberName: data.member_name,
				memberPhone: data.member_phone,
				memberEmail: data.member_email,
				memberViewlist: data.member_viewList,
				memberFlag: data.member_flag,
			};
			setViewList(getLineStation(data.member_viewlist));
			setMemberInfo(memberInfo);
			setSavedMemberInfo(memberInfo);
		},
	});

	// 중복 체크
	const inputMemberIdRef = useRef<HTMLInputElement>(null);
	const isSameMemberId = !!memberInfo['memberId'].trim() && savedMemberInfo['memberId'] === memberInfo['memberId'];
	const { isDuplicateChecked, handleDuplicateCheck } = useDuplicateCheck(
		memberQueryKey.chkDup(),
		{ memberId: memberInfo.memberId },
		'아이디',
		'memberId',
		isSameMemberId,
	);

	const queryKey = isModify ? 'update' : 'insert';
	const queryParams = isModify ? { ...memberInfo, memberNo: id } : memberInfo;
	const insertMutation = useInvalidateFromMutation(memberQueryKey, queryKey, queryParams);

	const handleMemberInfoChange = (name: string, value: string) => {
		setMemberInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	// 필수값 체크
	const requiredMemberInfo: Record<string, string | string[]> = {
		memberId: '아이디',
		memberName: '이름',
		originalMemberPw: '기존 비밀번호',
		memberPw: '비밀번호',
		confirmMemberPw: '입력하신 비밀번호',
		memberPhone: '전화번호',
		memberEmail: '이메일',
		memberViewlist: ['호선', '역'],
	};
	const requiredValueCheck = useRequiredValueCheck(
		{ ...memberInfo, ...passwordChangeInfo },
		(() => {
			if (isRegister) {
				delete requiredMemberInfo.originalMemberPw;
			} else {
				delete requiredMemberInfo.memberId;
				if (!isPasswordChange) {
					delete requiredMemberInfo.memberPw;
					delete requiredMemberInfo.originalMemberPw;
					delete requiredMemberInfo.confirmMemberPw;
				} else if (isModifyMember) {
					delete requiredMemberInfo.originalMemberPw;
				}
			}
			return requiredMemberInfo;
		})(),
	);
	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (requiredValueCheck(isDuplicateChecked)) {
			insertMutation.mutate();

			if (id === userInfo.member_no) {
				secureStorage.setItem(
					'user',
					{
						...userInfo,
						member_name: memberInfo.memberName,
						member_email: memberInfo.memberEmail,
						member_viewlist: memberInfo.memberViewlist,
					},
					'data',
				);
			}
		}
	};

	const handleModalClose = () => {
		setViewList(initialViewList);
		setMemberInfo(initialMemberInfo);
		closeContentModal();
	};

	useEffect(() => {
		if (insertMutation.isSuccess) {
			handleModalClose();
		}
	}, [insertMutation.isSuccess]);

	useEffect(() => {
		if (id) {
			updateMutation.mutate();
		} else setMemberInfo(initialMemberInfo);
	}, [id]);

	return (
		<>
			<div className="modal-header">
				<h4 className="modal-title">{`회원 ${id ? '정보 수정' : '신규 등록'}`}</h4>
			</div>
			<form
				className="form-info form-info-vertical px-2"
				onSubmit={(event) => handleSubmit(event)}
				style={{ maxWidth: '900px', width: '90vw' }}
			>
				<div className="modal-body">
					<div className="info-title">기본 정보</div>
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								_ref={inputMemberIdRef}
								required={true}
								labelTitle="아이디"
								name="memberId"
								defaultValue={memberInfo.memberId}
								handlePattern={formatOnlyNumberEnglish}
								handleState={handleMemberInfoChange}
								siblings={
									<button
										type="button"
										className="btn btn-default"
										onClick={() => {
											console.log(inputMemberIdRef.current?.checkValidity());
											if (inputMemberIdRef.current?.checkValidity()) handleDuplicateCheck(memberInfo.memberId);
											else inputMemberIdRef.current?.reportValidity();
										}}
										disabled={isSameMemberId}
									>
										중복 확인
									</button>
								}
								isOnlyText={id ? true : false}
								pattern=".{5,20}"
								title="5자 이상, 20자 이하를 입력해주세요"
								readOnly={isDuplicateChecked}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								labelTitle="이름"
								name="memberName"
								defaultValue={memberInfo.memberName}
								handleState={handleMemberInfoChange}
								pattern=".{5,20}"
								title="5자 이상, 20자 이하를 입력해주세요"
							/>
						</div>
					</CustomRow>
					{(isModifyMember || isModifyUser) && (
						<CustomRow>
							<div className="form-grid">
								<CustomChildren isRequired={true} labelTitle="비밀번호">
									<button
										type="button"
										className="btn btn-default"
										onClick={() => setIsPasswordChange(!isPasswordChange)}
									>
										{`변경${isPasswordChange ? '취소' : '하기'}`}
									</button>
								</CustomChildren>
							</div>
							{isPasswordChange && isModifyUser && (
								<div className="form-grid">
									<CustomInput
										required={true}
										labelTitle={`${isModifyUser ? '기존' : ''} 비밀번호`}
										name="originalMemberPw"
										handleState={handleChangePassword}
										handlePattern={formatOnlyNumberEnglish}
										// handleValid={validatePasswordMatch(savedMemberInfo.memberPw)}
										handleValid={validatePasswordMatch(memberInfo.memberPw)}
										pattern=".{8,20}"
										title="8자 이상, 20자 이하를 입력해주세요"
										readOnly={
											validatePasswordMatch(memberInfo.memberPw)(passwordChangeInfo.originalMemberPw) ? false : true
										}
										{...(!isModifyUser ? { type: 'password' } : {})}
									/>
								</div>
							)}
						</CustomRow>
					)}
					{(isRegister || isPasswordChange) && (
						<CustomRow>
							<div className="form-grid">
								<CustomInput
									required={true}
									labelTitle={`${isModify ? '신규' : ''} 비밀번호`}
									name="memberPw"
									defaultValue=""
									handleState={handleMemberInfoChange}
									handlePattern={formatOnlyNumberEnglish}
									pattern=".{8,20}"
									title="8자 이상, 20자 이하를 입력해주세요"
									type="password"
								/>
							</div>
							<div className="form-grid">
								<CustomInput
									required={true}
									labelTitle={`${isModify ? '신규' : ''} 비밀번호 확인`}
									name="confirmMemberPw"
									defaultValue={passwordChangeInfo.confirmMemberPw}
									handleState={handleChangePassword}
									handlePattern={formatOnlyNumberEnglish}
									handleValid={validatePasswordMatch(memberInfo.memberPw)}
									pattern=".{8,20}"
									title="8자 이상, 20자 이하를 입력해주세요"
									type="password"
								/>
							</div>
						</CustomRow>
					)}
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								required={true}
								labelTitle="전화번호"
								name="memberPhone"
								defaultValue={memberInfo.memberPhone}
								handleState={handleMemberInfoChange}
								handlePattern={formatOnlyPhoneNumber}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								labelTitle="이메일"
								name="memberEmail"
								defaultValue={memberInfo.memberEmail}
								handleState={handleMemberInfoChange}
								handleValid={validateEmail}
							/>
						</div>
					</CustomRow>
					{userInfo.member_flag === 1 && (isRegister || isModifyMember) && (
						<>
							<div className="info-title">관리역 정보</div>

							{viewList.line === '전체' ? (
								<CustomRow>
									<div className="form-grid">
										<CustomText labelTitle="호선/역" text="전체" />
									</div>
								</CustomRow>
							) : (
								<CustomRow>
									<div className="form-grid">
										<CustomSelect
											required={true}
											labelTitle="호선"
											name="memberViewlist-line"
											defaultValue={viewList.line}
											handleState={handleChangeViewList}
											enableBlankSelect={true}
											optionFetch={{
												queryKey: [...lineStationQueryKey.lineList()],
												dataKey: 'lineList',
											}}
										/>
									</div>
									<div className="form-grid">
										<CustomSelect
											required={true}
											labelTitle="역"
											name="memberViewlist-station"
											defaultValue={viewList.station}
											handleState={handleChangeViewList}
											enableBlankSelect={true}
											disabled={!viewList.line}
											optionFetch={{
												queryKey: [...lineStationQueryKey.sttList(), stationParams],
												dataKey: 'sttList',
											}}
										/>
									</div>
								</CustomRow>
							)}
						</>
					)}
				</div>
				<div className="modal-footer">
					<button type="submit" className="btn btn-navy">
						{id ? '수정' : '등록'}
					</button>
					<button type="button" className="btn btn-default" onClick={handleModalClose}>
						취소
					</button>
				</div>
			</form>
		</>
	);
}
