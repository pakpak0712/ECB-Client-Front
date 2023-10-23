/**
 * 오늘 날짜+시간 반환
 * @param separate { string }   구분자
 */
export const getTodayTime = (separate = '-'): string => {
	const now = new Date();
	return `
		${now.getFullYear()}${separate}
		${(now.getMonth() + 1).toString().padStart(2, '0')}${separate}
		${now.getDate().toString().padStart(2, '0')} 
		${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}
	`;
};
