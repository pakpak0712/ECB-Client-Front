import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postMutationParams } from '@/queries/_utils';
import { QueryKeyFunctionType } from '@/types/Queries.types';

export default function useInvalidateFromMutation<T>(queryKeyFunction: QueryKeyFunctionType, key: string, params: T) {
	const queryClient = useQueryClient();
	const postMutation = useMutation({
		mutationFn: () => postMutationParams([...queryKeyFunction[key](), params]),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeyFunction.list());
		},
	});

	return postMutation;
}
