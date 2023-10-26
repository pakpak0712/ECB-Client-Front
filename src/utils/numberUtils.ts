/**
 * 한 자리 수의 숫자 앞 0을 붙이는 함수
 * @param number number
 * @returns string
 */
export const geDoubleDigits = (number: number) => {
	if (number < 10) {
		return '0' + number;
	}
	return number.toString();
};
