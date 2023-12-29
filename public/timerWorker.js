self.onmessage = function (e) {
	let delay = e.data;
	//console.log(e);

	let timer = setTimeout(() => {
		postMessage(null);

		clearTimeout(timer);
	}, delay);
};
