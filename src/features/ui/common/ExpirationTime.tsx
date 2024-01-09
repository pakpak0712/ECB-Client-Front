import { useLayoutEffect, useState } from 'react';

import { SecureStorage } from '@/plugin/crypto';
import { geDoubleDigits } from '@/utils/numberUtils';

const isMobile = /Mobi/i.test(window.navigator.userAgent);

const startDate: any = new Date();

export default function ExpirationTime() {
	const userStorage = new SecureStorage(localStorage).getItem('user-storage', 'user-storage');
	const { member_token: memberToken } = userStorage;

	const [remainingMinutes, setRemainingMinutes] = useState(60);
	const [remainingSeconds, setRemainingSeconds] = useState(0);

	const timerCallback = () => {
		const nowDate: any = new Date();
		const diffSeconds: any = nowDate - startDate;
		//console.log('diffDate: ' + diffDate);

		setRemainingMinutes(59 - (Math.floor(diffSeconds / (1000 * 60)) % 60));
		setRemainingSeconds(60 - (Math.floor(diffSeconds / 1000) % 60));
		//console.log(geDoubleDigits(remainingMinutes) + ':' + geDoubleDigits(remainingSeconds));
	};

	const timerWorker: Worker = new Worker(new URL('src/utils/timerWorker.ts', import.meta.url));
	timerWorker.postMessage(1000);

	useLayoutEffect(() => {
		timerWorker.onmessage = (e) => {
			timerCallback();
			timerWorker.terminate();

			if (remainingMinutes < 0) {
				(() => {
					localStorage.removeItem('user-storage');

					if (!isMobile) {
						location.href = '/login';
					} else {
						location.href = '/login?firebaseToken=' + memberToken;
					}
				})();
			}
		};
	}, [remainingSeconds]);

	return (
		<div className="navbar-item">
			<div className="badge badge-default badge-sm">
				{geDoubleDigits(remainingMinutes)}:{geDoubleDigits(remainingSeconds)}
			</div>
		</div>
	);
}
