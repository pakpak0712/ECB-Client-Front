import { Location, NavigateFunction } from 'react-router-dom';

import { MenuPermissionType } from '@/types/User.types';

export const hookReceiver: {
	navigate: NavigateFunction | null;
	location: Location | null;
	setLoading: (val: boolean) => void;
	roles: MenuPermissionType[];
} = {
	navigate: null,
	location: null,
	setLoading: (val: boolean) => val,
	roles: [],
};
