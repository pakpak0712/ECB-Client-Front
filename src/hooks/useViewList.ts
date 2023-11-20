import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { initialParams } from '@/constants/initial';
import { SecureStorage } from '@/plugin/crypto';
import { getLineStation } from '@/utils/common';

// type handleChangeDeviceInfoType = (name: string, value: string | number) => void;

export default function useViewList<T>(setStateAction: Dispatch<SetStateAction<T>>) {
	const { id } = useParams();
	const secureStorage = new SecureStorage(sessionStorage);
	const userInfo = secureStorage.getItem('user-storage', 'user-storage');
	const initialViewList = getLineStation(userInfo && userInfo.member_viewlist ? userInfo.member_viewlist : '');
	const [viewList, setViewList] = useState(initialViewList);
	const [propertyKey, setPropertyKey] = useState('');
	const [stationParams, setStationParams] = useState(initialParams);

	const handleChangeViewList = (name: string, value: string) => {
		const splitedName = name.split('-');
		const viewListName = splitedName[0];
		const viewListKey = splitedName[1];
		setViewList((prev) => {
			if (viewListKey === 'line') {
				return { [viewListKey]: value, station: '' };
			} else {
				return { ...prev, [viewListKey]: value };
			}
		});
		setPropertyKey(viewListName);
	};

	useEffect(() => {
		setStateAction((prev) => {
			return { ...prev, [propertyKey]: `${viewList.line} ${viewList.station}` };
		});
		if (viewList.line) {
			const lineCode = viewList.line.replaceAll(/[^0-9]/g, '');
			setStationParams((prev) => {
				return { ...prev, searchDTO: { ...prev.searchDTO, searchType: lineCode } };
			});
		}
	}, [viewList]);

	useEffect(() => {
		if (!id) setViewList(initialViewList);
	}, [id]);

	return { initialViewList, viewList, setViewList, stationParams, handleChangeViewList };
}
