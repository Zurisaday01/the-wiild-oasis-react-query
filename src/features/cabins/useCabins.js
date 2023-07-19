import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	const {
		data: cabins,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
		// NOTE: queryKey needs to be an array
		//       queryFn needs to return the data that we'll store in cache
	});

	return { isLoading, error, cabins };
}
