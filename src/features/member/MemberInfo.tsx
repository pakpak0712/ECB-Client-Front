import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CustomChildren from '@/features/ui/form/CustomChildren';
import CustomInput from '@/features/ui/form/CustomInput';
import CustomOptionAfterFetch from '@/features/ui/form/CustomOptionAfterFetch';
import CustomSelect from '@/features/ui/form/CustomSelect';
import CustomRow from '@/features/ui/layout/CustomRow';
import { useContentsModal } from '@/hooks/useContentsModal';
import useRequiredValueCheck from '@/hooks/useRequiredValueCheck';
import useUserInfoFromSession from '@/hooks/useUserInfoFromSession';
import useViewList from '@/hooks/useViewList';
import { SecureStorage } from '@/plugin/crypto';
import { lineStationQueryKey, memberQueryKey } from '@/queries/_querykey';
import { postMutationQueryString } from '@/queries/_utils';
import useDuplicateCheck from '@/queries/useDuplicateCheck';
import useInvalidateFromMutation from '@/queries/useInvalidateFromMutation';
import { memberIdState } from '@/state/member';
import { MemberInfoDataType } from '@/types/Member.types';
import {
	formatOnlyNumberEnglish,
	formatOnlyPhoneNumber,
	validateEmail,
	validatePasswordMatch,
} from '@/utils/stringUtils';

export default function MemberInfo() {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = useUserInfoFromSession();
	const initialMemberInfo = {
		memberId: '',
		memberPw: '',
		memberName: '',
		memberPhone: '',
		memberEmail: '',
		memberViewlist: '',
		memberFlag: '',
	};
	const id = useRecoilValue(memberIdState);

	const isRegister = !id;
	const isModify = id ? true : false;
	const isModifyMember = id && id !== userInfo.member_no ? true : false;
	const isModifyUser = id && id === userInfo.member_no ? true : false;

	const { closeContentModal } = useContentsModal();

	const [memberInfo, setMemberInfo] = useState<MemberInfoDataType>(initialMemberInfo);
	const [savedMemberInfo, setSavedMemberInfo] = useState<MemberInfoDataType>(initialMemberInfo);
	const { initialViewList, viewList, setViewList, stationParams, setViewListFromData, handleChangeViewList } =
		useViewList(setMemberInfo);

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
		mutationFn: () => postMutationQueryString([...memberQueryKey.detail(), { memberNo: id }]),
		onSuccess: (data) => {
			const memberInfo = {
				memberId: data.member_id,
				memberPw: data.member_pw,
				memberName: data.member_name,
				memberPhone: data.member_phone,
				memberEmail: data.member_email,
				memberViewlist: data.member_viewList,
				memberFlag: data.member_flag,
			};
			setViewListFromData(data.member_viewlist);
			setMemberInfo(memberInfo);
			setSavedMemberInfo(memberInfo);
		},
	});

	// 중복 체크
	const { isDuplicateChecked, handleDuplicateCheck } = useDuplicateCheck(
		memberQueryKey.chkDup(),
		{ memberId: memberInfo.memberId },
		'아이디',
		'memberId',
		savedMemberInfo['memberId'] === memberInfo['memberId'],
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
		originalMemberPw: '기존 비밀번호',
		memberPw: '비밀번호',
		memberName: '이름',
		memberPhone: '전화번호',
		memberEmail: '이메일',
		memberViewlist: ['호선', '역'],
		confirmMemberPw: '입력하신 비밀번호',
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
								required={true}
								title="아이디"
								name="memberId"
								defaultValue={memberInfo.memberId}
								handlePattern={formatOnlyNumberEnglish}
								handleState={handleMemberInfoChange}
								siblings={
									<button
										type="button"
										className="btn btn-default"
										onClick={() => handleDuplicateCheck(memberInfo.memberId)}
										disabled={savedMemberInfo['memberId'] === memberInfo['memberId']}
									>
										중복 확인
									</button>
								}
								readOnly={id ? true : false}
								minLength={5}
								maxLength={20}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="이름"
								name="memberName"
								defaultValue={memberInfo.memberName}
								handleState={handleMemberInfoChange}
								minLength={5}
								maxLength={20}
							/>
						</div>
					</CustomRow>
					{(isModifyMember || isModifyUser) && (
						<CustomRow>
							<div className="form-grid">
								<CustomChildren required={true} title="비밀번호">
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
										title={`${isModifyUser ? '기존' : ''} 비밀번호`}
										name="originalMemberPw"
										handleState={handleChangePassword}
										handlePattern={formatOnlyNumberEnglish}
										// handleValid={validatePasswordMatch(savedMemberInfo.memberPw)}
										handleValid={validatePasswordMatch('12341234')}
										minLength={8}
										maxLength={20}
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
									title={`${isModify ? '신규' : ''} 비밀번호`}
									name="memberPw"
									defaultValue={memberInfo.memberPw}
									handleState={handleMemberInfoChange}
									handlePattern={formatOnlyNumberEnglish}
									minLength={8}
									maxLength={20}
								/>
							</div>
							<div className="form-grid">
								<CustomInput
									required={true}
									title={`${isModify ? '신규' : ''} 비밀번호 확인`}
									name="confirmMemberPw"
									defaultValue={passwordChangeInfo.confirmMemberPw}
									handleState={handleChangePassword}
									handlePattern={formatOnlyNumberEnglish}
									handleValid={validatePasswordMatch(memberInfo.memberPw)}
									minLength={8}
									maxLength={20}
								/>
							</div>
						</CustomRow>
					)}
					<CustomRow>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="전화번호"
								name="memberPhone"
								defaultValue={memberInfo.memberPhone}
								handleState={handleMemberInfoChange}
								handlePattern={formatOnlyPhoneNumber}
							/>
						</div>
						<div className="form-grid">
							<CustomInput
								required={true}
								title="이메일"
								name="memberEmail"
								defaultValue={memberInfo.memberEmail}
								handleState={handleMemberInfoChange}
								handleValid={validateEmail}
							/>
						</div>
					</CustomRow>
					{isModifyMember && (
						<>
							<div className="info-title">관리역 정보</div>
							<CustomRow>
								<div className="form-grid">
									<CustomSelect
										required={true}
										title="호선"
										name="memberViewlist-line"
										defaultValue={viewList.line}
										handleState={handleChangeViewList}
										enableBlankSelect={true}
									>
										<CustomOptionAfterFetch queryKey={[...lineStationQueryKey.lineList()]} dataKey="lineList" />
									</CustomSelect>
								</div>
								<div className="form-grid">
									<CustomSelect
										required={true}
										title="역"
										name="memberViewlist-station"
										defaultValue={viewList.station}
										handleState={handleChangeViewList}
										enableBlankSelect={true}
										disabled={!viewList.line}
									>
										<CustomOptionAfterFetch
											queryKey={[...lineStationQueryKey.sttList(), stationParams]}
											dataKey="sttList"
										/>
									</CustomSelect>
								</div>
							</CustomRow>
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
