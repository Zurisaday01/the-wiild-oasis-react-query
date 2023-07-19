import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			// STEP 1 : send message
			toast.success('User account successfully updated');
			// STEP 2: fetch manually the data to stop image delay
			queryClient.setQueryData(['user'], user);
			// STEP 3: reload
			// queryClient.invalidateQueries({
			// 	queryKey: ['user'],
			// });
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateUser };
}
