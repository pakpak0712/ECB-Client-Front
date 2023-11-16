import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Dispatch, SetStateAction } from 'react';

import { SecureStorage } from '@/plugin/crypto';
import { getValueOrEmptyFromObject } from '@/utils/objectUtils';

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
let firebaseMessaging: Messaging;

navigator.serviceWorker.register('/firebase-messaging-sw.js').then((swReg2) => {
	console.log('Firebase ServiceWorker Is Registered');
	//console.log(swReg2);
});

interface WebAppInterface {
	closeApp(toast: string): never;
}
declare let android: WebAppInterface;

const isMobile = /Mobi/i.test(window.navigator.userAgent);
export async function requestPermission(setState: Dispatch<SetStateAction<string>>) {
	const userStorage = new SecureStorage(sessionStorage).getItem('user-storage', 'user-storage');
	const memberToken = getValueOrEmptyFromObject(userStorage, 'member_token');
	console.log('memberToken: ' + memberToken);
	const firebaseToken = new URLSearchParams(window.location.search).get('firebaseToken');

	const AppFirebaseToken = memberToken ? memberToken : firebaseToken;
	console.log('AppFirebaseToken: ' + AppFirebaseToken);

	if (AppFirebaseToken) {
		console.log('11111');
		setState(AppFirebaseToken);
		return;
	} else {
		console.log('22222');
		// WEB
		if (!isMobile) {
			firebaseMessaging = getMessaging(firebaseApp);
			await Notification.requestPermission()
				.then(async (permission) => {
					if (permission === 'granted') {
						console.log('알림 권한이 허용됨');

						const WebFirebaseToken = await getToken(firebaseMessaging, {
							vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
						});
						console.log('WebFirebaseToken: ' + WebFirebaseToken);

						if (WebFirebaseToken) {
							setState(WebFirebaseToken);
						} else {
							console.log('토큰 획득에 실패함');
						}

						onMessage(firebaseMessaging, (payload) => {
							console.log('메시지가 도착하였습니다.', payload);
						});
					} else {
						console.log('알림 권한이 허용되지 않음');
					}
				})
				.catch((err) => {
					console.log(err);
					location.reload();
				});
		} else {
			android.closeApp('앱을 다시 시작해주세요.');
		}
	}
}
