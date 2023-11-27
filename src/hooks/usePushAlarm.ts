export const usePushAlarm = () => {
	const fcm = () => {
		const bc = new BroadcastChannel('fcm');
		bc.onmessage = function (e) {
			// console.log 에 BroadcastChannel Data 만 잘 찍힌다면 마무리 개발이 가능할듯..?
			console.log(e);
		};

		bc.close();
	};

	return { fcm };
};
