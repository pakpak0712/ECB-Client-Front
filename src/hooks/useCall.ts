interface WebAppInterface {
	closeApp(toast: string): never;
	call(tel: string): never;
}

declare let android: WebAppInterface;
const useCall = () => {
	const isMobile = /Mobi/i.test(window.navigator.userAgent);

	const call = (phoneNumber: string) => {
		android.call(phoneNumber);
	};

	return { call, isMobile };
};

export default useCall;
