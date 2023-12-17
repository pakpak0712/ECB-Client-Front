import { useMutation } from '@tanstack/react-query';

import { postMutation } from '@/queries/_utils';

interface Props<T, J> {
	queryKey: T[];
	params: J;
}

export default function ButtonExcel<T, J>({ queryKey, params }: Props<T, J>) {
	const excelMutation = useMutation(
		() => {
			const mutationKey = [...queryKey, params];
			return postMutation(mutationKey);
		},
		{
			onSuccess: (data) => {
				console.log('Excel Data: ', data);
			},
		},
	);
	return (
		<>
			<button type="button" className="btn btn-green btn-sm" onClick={() => excelMutation.mutate()}>
				<i className="fa-solid fa-file-excel me-2"></i>
				엑셀 다운로드
			</button>
		</>
	);
}
