self.addEventListener('install', function () {
	console.log('FCM SW Install...');
	self.skipWaiting();
});

self.addEventListener('activate', function () {
	console.log('FCM SW Activate...');
});

self.addEventListener('push', function (e) {
	if (!e.data.json()) return;

	const resultData = e.data.json().data;
	console.log('Message 1: ', resultData);
	const channel = new BroadcastChannel('sw-message');
	channel.postMessage(resultData);

	const notificationTitle = resultData.title;
	const notificationOptions = { body: resultData.content };
	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (e) {
	console.log('Notification Click');

	//e.waitUntil(clients.openWindow('/'));
	e.notification.close();
});
