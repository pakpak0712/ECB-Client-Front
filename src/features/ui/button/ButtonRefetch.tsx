import { useState } from 'react';

import { getTodayTime } from '@/utils/dateUtils';

interface PropsType {
	handleRefetch: () => void;
}

export default function ButtonRefetch({ handleRefetch }: PropsType) {
	const [refetchTime, setRefetchTime] = useState(getTodayTime());
	const handleRefresh = () => {
		handleRefetch();
		setRefetchTime(getTodayTime());
	};
	return (
		<>
			<button type="button" className="btn btn-skyblue btn-sm" onClick={() => handleRefresh()}>
				<i className="fa-solid fa-arrows-rotate me-2"></i>
				새로고침
			</button>
			<p className="mt-1 mb-0">
				<small>
					최근 업데이트 시간: <span className="">{refetchTime}</span>
				</small>
			</p>
		</>
	);
}
