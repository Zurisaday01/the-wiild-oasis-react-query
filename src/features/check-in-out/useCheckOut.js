import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckOut() {
	const queryClient = useQueryClient();

	const { mutate: checkOut, isCheckingOut } = useMutation({
		mutationFn: bookingId =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		onSuccess: data => {
			toast.success(`Booking #${data.id} successfully checked out`);
			queryClient.invalidateQueries({ active: true });
		},

		onError: () => toast.error('There was an error while checking out'),
	});

	return { isCheckingOut, checkOut };
}
