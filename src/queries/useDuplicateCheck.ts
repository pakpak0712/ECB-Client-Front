import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAlert } from '@/hooks/useAlert';
import { postMutation } from '@/queries/_utils';

export default function useDuplicateCheck<T>(
	queryKey: T[],
	queryString: Record<string, string>,
	title: string,
	duplicateDataKey: string,
	isSameValue: boolean,
) {
	const [isDuplicateChecked, setIsDuplicateChecked] = useState(isSameValue);

	const { alertMessage } = useAlert();
	const duplicateMutation = useMutation(
		() => {
			const mutationKey = [...queryKey, null, queryString];
			return postMutation(mutationKey);
		},
		{
			onSuccess: (data) => {
				if (data[duplicateDataKey]) {
					alertMessage(`이미 사용중인 ${title}입니다. 다른 ${title}를 사용해주세요.`);
					setIsDuplicateChecked(false);
				} else {
					alertMessage(`사용 가능한 ${title}입니다.`);
					setIsDuplicateChecked(true);
				}
			},
		},
	);

	const handleDuplicateCheck = (value: string) => {
		if (value) duplicateMutation.mutate();
		else alertMessage(`${title}를 입력해주세요.`);
	};

	useEffect(() => {
		setIsDuplicateChecked(isSameValue);
	}, [isSameValue]);

	return { isDuplicateChecked, handleDuplicateCheck };
}
