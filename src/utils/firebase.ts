import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken, onMessage } from 'firebase/messaging';
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

let firebaseApp;
let firebaseMessaging: Messaging;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
	firebaseApp = initializeApp(firebaseConfig);
	firebaseMessaging = getMessaging(firebaseApp);
}

export async function requestPermission(setState: Dispatch<SetStateAction<string>>) {
	const AppFirebaseToken = new URLSearchParams(window.location.search).get('firebaseToken');
	console.log('AppFirebaseToken: ' + AppFirebaseToken);

	if (AppFirebaseToken) {
		console.log('11111');
		setState(AppFirebaseToken);
		return;
	} else {
		console.log('22222');
		const firebasePermission = await Notification.requestPermission();
		if (firebasePermission === 'denied') {
			console.log('알림 권한이 허용되지 않음');
			return;
		}
		console.log('알림 권한이 허용됨');

		const WebFirebaseToken = await getToken(firebaseMessaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
		console.log('WebFirebaseToken: ' + WebFirebaseToken);

		if (WebFirebaseToken) {
			setState(WebFirebaseToken);
		} else {
			console.log('토큰 획득에 실패함');
		}

		onMessage(firebaseMessaging, (payload) => {
			console.log('메시지가 도착하였습니다.', payload);
		});
	}
}
