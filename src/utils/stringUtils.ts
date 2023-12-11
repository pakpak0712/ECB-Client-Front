/**
 * 정규식 외에 값은 빈 문자열로 교체하는 함수
 * @param value 입력 값
 * @param regEx 정규표현식
 */
export const replaceCharacterRegEx = (originValue: string | number, regEx: RegExp) => {
	const convertedString = originValue.toString();
	return convertedString.replace(regEx, '');
};

/**
 * 숫자, 영어만 입력 가능하게 변환하는 함수
 * @param originValue 입력 값
 * */
export const formatOnlyNumberEnglish = (originValue: string | number) => {
	return replaceCharacterRegEx(originValue, /[^0-9a-zA-Z\-_]/g);
};

/**
 * 숫자만 입력 가능하게 변환하는 함수
 * @param originValue 입력 값
 * */
export const formatOnlyNumber = (max = 100000000000) => {
	return (originValue: string | number): number => {
		const convertedNumber = Number(replaceCharacterRegEx(originValue, /[^0-9]/g));
		return convertedNumber > max ? max : convertedNumber;
	};
};

/**
 * MAC 주소 형식으로 자동 하이픈 추가
 * @param originValue 입력 값
 * */
export const formatOnlyMacAddress = (originValue: string | number): string => {
	const replacedCharacter = replaceCharacterRegEx(originValue, /[^0-9a-zA-z]/g).toUpperCase();
	const slicedString = replacedCharacter.substr(0, 12);
	// eslint-disable-next-line
	return slicedString.replace(/(\w{2})(?=\w)/g, '$1:');
};

/**
 * 전화/휴대폰번호 형식으로 자동 하이픈 추가하는 함수
 * @param originValue 입력 값
 * */
export const formatOnlyPhoneNumber = (originValue: string | number): string => {
	const replacedCharacter = replaceCharacterRegEx(originValue, /[^0-9]/g);
	if (replacedCharacter.indexOf('02') === 0) {
		const slicedString = replacedCharacter.substr(0, 10);
		// eslint-disable-next-line
		return slicedString.replace(/^(\d{0,2})(\d{0,3}|\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/\-{1,2}$/g, '');
	} else {
		const slicedString = replacedCharacter.substr(0, 11);
		// eslint-disable-next-line
		return slicedString.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/\-{1,2}$/g, '');
	}
};

/**
 * 이메일 형식을 유효성 검사
 * @param email
 * @returns
 */
export const validateEmail = (email: string | number): string => {
	const emailRex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRex.test(`${email}`)) return '이메일 형식에 맞지 않습니다.';
	else return '';
};

/**
 * 이메일 형식을 유효성 검사
 * @param email
 * @returns
 */
export const validatePasswordMatch = (password: string) => {
	return (newPassword: string | number): string => {
		if (password !== newPassword) return '비밀번호가 일치하지 않습니다.';
		else return '';
	};
};
