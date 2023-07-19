import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Cabin successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isEditing, editCabin };
}
