import { Dispatch, SetStateAction, useEffect } from 'react';

import { titleDic } from '@/constants/dictionary';
import { useAlert } from '@/hooks/useAlert';
import { useConfirm } from '@/hooks/useConfirm';
import useInvalidateFromMutation from '@/queries/useInvalidateFromMutation';
import { QueryKeyFunctionType } from '@/types/Queries.types';
import { dictionary } from '@/utils/common';

export default function useDeleteData<T>(
	code: string,
	queryKeyFunction: QueryKeyFunctionType,
	selectData: T[],
	setSelectData: Dispatch<SetStateAction<T[]>>,
) {
	const { alertMessage } = useAlert();
	const { confirmMessage } = useConfirm();
	const codeNo = `${code}_no`;
	const title = dictionary(code, titleDic);
	const deleteNo = selectData.map((data: any) => {
		if (data && typeof data === 'object' && codeNo in data) return data[codeNo];
	});

	const deleteMutation = useInvalidateFromMutation(queryKeyFunction, 'delete', deleteNo);
	const handleDataDelete = async () => {
		if (deleteNo.length === 0) {
			alertMessage(`${title}을(를) 선택해주세요`);
		} else if (await confirmMessage(`선택하신 ${title}을(를) 삭제하실건가요?`)) {
			deleteMutation.mutate();
		}
	};

	useEffect(() => {
		if (deleteMutation.isSuccess) setSelectData([]);
	}, [deleteMutation.isSuccess]);

	const getDeleteButton = () => {
		return (
			<button type="button" className="btn btn-red" onClick={handleDataDelete}>
				삭제하기
			</button>
		);
	};

	return getDeleteButton;
}
