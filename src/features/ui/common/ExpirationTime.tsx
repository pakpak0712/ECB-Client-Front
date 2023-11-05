import { useLayoutEffect, useState } from 'react';

import { useAlert } from '@/hooks/useAlert';
import { geDoubleDigits } from '@/utils/numberUtils';

export default function ExpirationTime() {
	const expiredMinutes = 60; // 만료 시간 (분)
	const initialMinutes = 60;
	const initialSeconds = 0;

	const [remainingMinutes, setRemainingMinutes] = useState(expiredMinutes);
	const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

	const { alertMessage } = useAlert();

	const timerCallback = () => {
		setRemainingSeconds((prev) => prev - 1);
		if (remainingSeconds === initialSeconds) {
			setRemainingSeconds(initialMinutes - 1);
			setRemainingMinutes((prev) => prev - 1);
		}
	};

	useLayoutEffect(() => {
		const timer = setTimeout(timerCallback, 1000);

		if (remainingMinutes <= initialSeconds && remainingSeconds <= initialSeconds) {
			clearTimeout(timer);
			(() => {
				sessionStorage.removeItem('user-storage');
				location.reload();
			})();
		}
	}, [remainingSeconds]);

	return (
		<div className="navbar-item">
			<div className="badge badge-default badge-sm">
				{geDoubleDigits(remainingMinutes)}:{geDoubleDigits(remainingSeconds)}
			</div>
		</div>
	);
}
