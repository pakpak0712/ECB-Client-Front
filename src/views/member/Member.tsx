import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { default as MemberInfo } from '@/features/member/MemberInfo';
import MemberList from '@/features/member/MemberList';
import ButtonRefetch from '@/features/ui/button/ButtonRefetch';
import LoadingFrame from '@/features/ui/common/LoadingFrame';
import PageBody from '@/features/ui/layout/PageBody';
import PageHeader from '@/features/ui/layout/PageHeader';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { memberQueryKey } from '@/queries/_querykey';
import { postQuery } from '@/queries/_utils';
import useDeleteData from '@/queries/useDeleteData';
import { memberIdState } from '@/state/member';
import { MemberListType } from '@/types/Member.types';
import { getValueOrEmptyFromObject } from '@/utils/objectUtils';

export default function Member() {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const initialParams = {
		searchDTO: {
			memberFlag: getValueOrEmptyFromObject(userInfo, 'member_flag'),
			memberViewlist: getValueOrEmptyFromObject(userInfo, 'member_viewlist'),
			searchType: '',
			searchWord: '',
		},
		orderDTO: {
			orderType: '',
			orderWord: '',
		},
		pageDTO: {
			curPage: 1,
			pagePerRow: 10,
		},
	};
	const [_, setId] = useRecoilState(memberIdState);
	const { openContentModal } = useContentsModal();

	const [params, setParams] = useState(initialParams);
	const { data, isLoading, isFetching } = useQuery({
		queryKey: [...memberQueryKey.list(), params],
		queryFn: postQuery,
	});
	const [selectData, setSelectData] = useState<MemberListType[]>([]);

	const getDeleteButton = useDeleteData(userInfo.member_id, 'member', memberQueryKey, selectData, setSelectData);

	const handleRegisterationClick = () => {
		setId(null);
		openContentModal(<MemberInfo />);
	};

	const handleMemberClick = (member: MemberListType) => {
		setId(member.member_no);
		openContentModal(<MemberInfo />);
	};

	const listProps = {
		initialParams,
		params,
		data: data?.memberList,
		pageMap: data?.pageMap,
		setSelectData,
		setParams,
		handleMemberClick,
	};

	return (
		<div className="page">
			<PageHeader title="회원 관리">
				<ButtonRefetch />
			</PageHeader>
			<PageBody title="회원 목록">
				<div className="d-flex justify-content-end">
					<button type="button" className="btn btn-navy" onClick={handleRegisterationClick}>
						등록하기
					</button>
					{getDeleteButton()}
				</div>
				<MemberList {...listProps} />
			</PageBody>
			{isLoading && <LoadingFrame />}
		</div>
	);
}
