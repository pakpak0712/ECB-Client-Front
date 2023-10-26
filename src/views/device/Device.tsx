import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import DeviceInfo from '@/features/device/DeviceInfo';
import DeviceList from '@/features/device/DeviceList';
import ButtonRefetch from '@/features/ui/button/ButtonRefetch';
import LoadingFrame from '@/features/ui/common/LoadingFrame';
import PageBody from '@/features/ui/layout/PageBody';
import PageHeader from '@/features/ui/layout/PageHeader';
import { useContentsModal } from '@/hooks/useContentsModal';
import { SecureStorage } from '@/plugin/crypto';
import { deviceQueryKey } from '@/queries/_querykey';
import { postQueryParams } from '@/queries/_utils';
import useDeleteData from '@/queries/useDeleteData';
import { deviceIdState } from '@/state/device';
import { DeviceListType } from '@/types/Device.types';

export default function Device() {
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const initialParams = {
		searchDTO: {
			memberFlag: userInfo && userInfo.member_flag ? userInfo.member_flag.toString() : '',
			memberViewlist: userInfo && userInfo.member_viewlist ? userInfo.member_viewlist : '',
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

	const [_, setId] = useRecoilState(deviceIdState);
	const { openContentModal } = useContentsModal();

	const [params, setParams] = useState(initialParams);
	const { data, isLoading, isFetching } = useQuery({
		queryKey: [...deviceQueryKey.list(), params],
		queryFn: postQueryParams,
	});

	const [selectData, setSelectData] = useState<DeviceListType[]>([]);

	const getDeleteButton = useDeleteData('tcs', deviceQueryKey, selectData, setSelectData);

	const handleRegisterationClick = () => {
		setId(null);
		openContentModal(<DeviceInfo />);
	};

	const handleDeviceClick = (device: DeviceListType) => {
		setId(device.tcs_no);
		openContentModal(<DeviceInfo />);
	};

	const handleRefetch = () => {
		setParams(initialParams);
	};

	const refetchProps = { handleRefetch };

	const listProps = {
		initialParams,
		params,
		data: data?.deviceList,
		pageMap: data?.pageMap,
		setSelectData,
		setParams,
		handleDeviceClick,
	};

	return (
		<div className="page">
			<PageHeader title="장비 관리">
				<ButtonRefetch {...refetchProps} />
			</PageHeader>
			<PageBody title="장비 목록">
				{userInfo.member_flag === 1 && (
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-navy" onClick={handleRegisterationClick}>
							등록하기
						</button>
						{getDeleteButton()}
					</div>
				)}
				<DeviceList {...listProps} />
			</PageBody>
			{isLoading && <LoadingFrame />}
		</div>
	);
}
