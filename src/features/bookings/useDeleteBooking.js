import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingApi,
		// NOTE: as soon as it's successful
		onSuccess: () => {
			toast.success('Booking successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}

/*
	NOTE: Mutations are actions that a user can do in your application. You can imagine a mutation as an action to change or create something.
	*/
