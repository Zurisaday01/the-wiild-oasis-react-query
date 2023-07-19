import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// FILTER
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };

	// method: 'gt'

	// SORT
	const sortByRaw = searchParams.get('sortBy') || 'start_date-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// FETCHING
	const {
		data: { data: bookings, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	// PREV PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	// whenever the bookings changes in the database
	// and whenever the filter value changes it will refetch the data

	return { isLoading, error, bookings, count };
}

// Prefeching: we fetch the next page before we even render it and store the data in chache
