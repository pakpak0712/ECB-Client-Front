//import { BroadcastChannel } from 'broadcast-channel';

self.addEventListener('install', function () {
	console.log('FCM SW Install...');
	self.skipWaiting();
});

self.addEventListener('activate', function () {
	console.log('FCM SW Activate...');
});

self.addEventListener('push', function (e) {
	if (!e.data.json()) return;
	const bc = new BroadcastChannel('fcm');

	const resultData = e.data.json().data;
	//console.log('Message 1: ', resultData);

	const notificationTitle = resultData.title;
	const notificationOptions = { body: resultData.content };
	//e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));

	bc.postMessage(resultData);
	bc.close();
});

self.addEventListener('notificationclick', function (e) {
	console.log('Notification Click');

	//e.waitUntil(clients.openWindow('/'));
	e.notification.close();
});
