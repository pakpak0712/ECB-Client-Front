export const commonQueryKey = (() => {
	return {
		login: () => ['login'],
	};
})();

// 회원 쿼리키
export const memberQueryKey = (() => {
	const endpoint = 'member';
	return {
		list: () => [endpoint, 'list'], // 회원 목록
		detail: () => [endpoint, 'detail'], // 회원 상세
		chkDup: () => [endpoint, 'chkIdDup'], // ID 중복 확인
		delete: () => [endpoint, 'delete'], // 회원 삭제
		update: () => [endpoint, 'update'], // 회원 수정
		insert: () => [endpoint, 'insert'], // 회원 등록
		changeStt: () => [endpoint, 'changeStt'], // 관리역 수정
	};
})();

// 비상벨 쿼리키
export const deviceQueryKey = (() => {
	const endpoint = 'device';
	return {
		list: () => [endpoint, 'list'], // 비상벨 목록
		detail: () => [endpoint, 'detail'], // 비상벨 상세
		chkDup: () => [endpoint, 'chkMacDup'], // MAC 중복 확인
		delete: () => [endpoint, 'delete'], // 비상벨 삭제
		update: () => [endpoint, 'update'], // 비상벨 수정
		insert: () => [endpoint, 'insert'], // 비상벨 등록
		excel: () => [endpoint, 'excel'], // 엑셀 다운로드
	};
})();

// 통계 쿼리키
export const statisticsQueryKey = (() => {
	const endpoint = 'statistics';
	const alert = 'alert';
	const alive = 'alive';
	return {
		alertList: () => [endpoint, alert, 'list'], // 알림 목록
		alertDetail: () => [endpoint, alert, 'detail'], // 알림 상세
		alertExcel: () => [endpoint, 'excel'], // 엑셀 다운로드
		aliveList: () => [endpoint, alive, 'list'], // 고장 목록
		aliveDetail: () => [endpoint, alive, 'detail'], // 고장 상세
	};
})();

// 역/호선 쿼리키
export const lineStationQueryKey = (() => {
	const endpoint = 'ls';
	return {
		lineList: () => [endpoint, 'lineList'], // 호선 목록
		lineDetail: () => [endpoint, 'lineDetail'], // 호선 상세
		lineDelete: () => [endpoint, 'lineDelete'], // 호선 삭제
		lineUpdate: () => [endpoint, 'lineUpdate'], // 호선 수정
		lineInsert: () => [endpoint, 'lineInsert'], // 호선 등록
		chkLineDup: () => [endpoint, 'chkLineDup'], // 호선 중복 확인
		sttList: () => [endpoint, 'sttList'], // 역 목록
		sttDetail: () => [endpoint, 'sttDetail'], // 역 상세
		sttDelete: () => [endpoint, 'sttDelete'], // 역 삭제
		sttUpdate: () => [endpoint, 'sttUpdate'], // 역 수정
		sttInsert: () => [endpoint, 'sttInsert'], // 역 등록
		chkSttDup: () => [endpoint, 'chkSttDup'], // 역 중복 확인
	};
})();
