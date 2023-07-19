import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCreateCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createOrEditCabin,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Cabin successfully created');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createCabin };
}
