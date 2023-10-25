import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Dispatch, SetStateAction } from 'react';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseMessaging = getMessaging(firebaseApp);

export async function requestPermission(setState: Dispatch<SetStateAction<string>>) {
	console.log('알림 권한 허용 요청 중...');

	const firebasePermission = await Notification.requestPermission();
	if (firebasePermission === 'denied') {
		console.log('알림 권한이 허용되지 않음');
		return;
	}
	console.log('알림 권한이 허용됨');

	const firebaseToken = await getToken(firebaseMessaging, {
		vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
	});

	if (firebaseToken) {
		setState(firebaseToken);
	} else console.log('토큰 획득에 실패함');

	onMessage(firebaseMessaging, (payload) => {
		console.log('메시지가 도착하였습니다.', payload);
		//
	});
}
