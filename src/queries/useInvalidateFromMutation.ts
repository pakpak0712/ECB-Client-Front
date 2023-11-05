import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postMutation } from '@/queries/_utils';
import { QueryKeyFunctionType } from '@/types/Queries.types';

export default function useInvalidateFromMutation<T>(
	queryKeyFunction: QueryKeyFunctionType,
	key: string,
	requestBody: T,
	queryString?: Record<string, string>,
) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => postMutation([...queryKeyFunction[key](), requestBody, queryString || null]),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeyFunction.list());
		},
	});
}
