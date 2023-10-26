import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import AliveInfo from '@/features/statistics/AliveInfo';
import AliveList from '@/features/statistics/AliveList';
import ButtonRefetch from '@/features/ui/button/ButtonRefetch';
import LoadingFrame from '@/features/ui/common/LoadingFrame';
import PageBody from '@/features/ui/layout/PageBody';
import PageHeader from '@/features/ui/layout/PageHeader';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { statisticsQueryKey } from '@/queries/_querykey';
import { postQueryParams } from '@/queries/_utils';
import { aliveIdState } from '@/state/alive';
import { AliveListType } from '@/types/Statistics.types';
import { getValueOrEmptyFromObject } from '@/utils/objectUtils';

export default function Alive() {
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

	const [_, setId] = useRecoilState(aliveIdState);
	const { openContentModal } = useContentsModal();

	const [params, setParams] = useState(initialParams);
	const { data, isLoading, isFetching } = useQuery({
		queryKey: [...statisticsQueryKey.aliveList(), params],
		queryFn: postQueryParams,
	});

	const handleAliveClick = (alive: AliveListType) => {
		setId(alive.aliveNo);
		openContentModal(<AliveInfo />);
	};

	const handleRefetch = () => {
		setParams(initialParams);
	};

	const refetchProps = { handleRefetch };

	const listProps = {
		initialParams,
		params,
		data: data?.aliveList,
		pageMap: data?.pageMap,
		setParams,
		handleAliveClick,
	};

	return (
		<div className="page">
			<PageHeader title="고장 통계">
				<ButtonRefetch {...refetchProps} />
			</PageHeader>
			<PageBody title="고장 목록">
				<AliveList {...listProps} />
			</PageBody>
			{isLoading && <LoadingFrame />}
		</div>
	);
}
