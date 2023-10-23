import { useAlert } from '@/hooks/useAlert';

export default function useRequiredValueCheck(
	dataObject: Record<string, string | number>,
	requiredObject: Record<string, string | string[]>,
) {
	const { alertMessage } = useAlert();
	const requiredValueCheck = (isDuplicateChecked?: boolean) => {
		for (const key in requiredObject) {
			if (key.indexOf('iewlist') >= 0 || key.indexOf('Addr') >= 0) {
				if (dataObject[key]) {
					const splitViewList = dataObject[key].toString().split(' ');
					const emptyIndex = splitViewList.findIndex((viewList) => !viewList);
					if (emptyIndex >= 0) {
						alertMessage(`${requiredObject[key][emptyIndex]}을 선택해주세요`);
						return false;
					}
				}
			} else {
				if (!dataObject[key]) {
					alertMessage(`${requiredObject[key]}를 입력해주세요`);
					return false;
				} else if (!isDuplicateChecked) {
					alertMessage(`${requiredObject[key]} 중복체크를 진행해주세요`);
					return false;
				}
			}
		}
		return true;
	};
	return requiredValueCheck;
}
