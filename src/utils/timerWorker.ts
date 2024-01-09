import { clearInterval, setInterval } from 'worker-timers';

onmessage = function (e) {
	const delay = e.data;

	const timerWorker = setInterval(() => {
		postMessage('timerWorker');
		clearInterval(timerWorker);
	}, delay);
};

export {};
