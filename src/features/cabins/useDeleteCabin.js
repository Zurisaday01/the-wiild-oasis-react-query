import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		// NOTE: as soon as it's successful
		onSuccess: () => {
			toast.success('Cabin successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}

/*
	NOTE: Mutations are actions that a user can do in your application. You can imagine a mutation as an action to change or create something.
	*/
