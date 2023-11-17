self.addEventListener('install', function () {
	console.log('FCM SW Install...');
	self.skipWaiting();
});

self.addEventListener('activate', function () {
	console.log('FCM SW Activate...');
});

self.addEventListener('push', function (e) {
	//console.log('Push: ', e.data.json());
	if (!e.data.json()) return;

	const resultData = e.data.json().notification;
	const notificationTitle = resultData.title;
	const notificationOptions = { body: resultData.body };
	console.log('Push 123: ', { resultData, notificationTitle, notificationOptions });

	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (e) {
	console.log('Notification Click');

	e.notification.close();
	//e.waitUntil(clients.openWindow('/'));
});
