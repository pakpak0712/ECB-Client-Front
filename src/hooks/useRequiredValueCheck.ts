import { useAlert } from '@/hooks/useAlert';

export default function useRequiredValueCheck(
	dataObject: Record<string, string | number>,
	requiredObject: Record<string, string | string[]>,
) {
	const { alertMessage } = useAlert();
	const requiredValueCheck = (isDuplicateChecked?: boolean) => {
		for (const key in requiredObject) {
			if (!dataObject[key]) {
				alertMessage(`${requiredObject[key]}를 입력해주세요`);
				return false;
			} else if (!isDuplicateChecked) {
				alertMessage(`${requiredObject[key]} 중복체크를 진행해주세요`);
				return false;
			}
		}
		return true;
	};
	return requiredValueCheck;
}
