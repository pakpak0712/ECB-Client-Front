import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import AlertInfo from '@/features/statistics/AlertInfo';
import AlertList from '@/features/statistics/AlertList';
import ButtonRefetch from '@/features/ui/button/ButtonRefetch';
import LoadingFrame from '@/features/ui/common/LoadingFrame';
import PageBody from '@/features/ui/layout/PageBody';
import PageHeader from '@/features/ui/layout/PageHeader';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { statisticsQueryKey } from '@/queries/_querykey';
import { postQuery } from '@/queries/_utils';
import { alertIdState } from '@/state/alert';
import { AlertListType } from '@/types/Statistics.types';
import { getValueOrEmptyFromObject } from '@/utils/objectUtils';

export default function Alert() {
	const secureStorage = new SecureStorage(localStorage);
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
	const [_, setId] = useRecoilState(alertIdState);
	const { openContentModal } = useContentsModal();

	const [params, setParams] = useState(initialParams);
	const { data, isLoading } = useQuery({
		queryKey: [...statisticsQueryKey.alertList(), params],
		queryFn: postQuery,
	});

	const handleAlertClick = (alert: AlertListType) => {
		setId(alert.alertNo);
		openContentModal(<AlertInfo />);
	};

	const listProps = {
		initialParams,
		params,
		data: data?.alertList,
		pageMap: data?.pageMap,
		setParams,
		handleAlertClick,
	};

	return (
		<div className="page">
			<PageHeader title="알림 관리">
				<ButtonRefetch />
			</PageHeader>
			<PageBody title="알림 목록">
				<AlertList {...listProps} />
			</PageBody>
			{isLoading && <LoadingFrame />}
		</div>
	);
}
