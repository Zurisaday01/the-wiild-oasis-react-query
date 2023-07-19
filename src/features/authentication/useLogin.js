import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
	const navigate = useNavigate();
	const queyClient = useQueryClient();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: data => {
			// Manually set some data in the react query cache
			// the next data loaded to the cache should be user, but in getting the data here it is stored in cache and when cheching for user in Auth it will not have to fetch the data
			queyClient.setQueryData(['user'], data.user);
			navigate('/dashboard', { replace: true });
		},
		onError: err => {
			console.log('ERROR', err);
			toast.error('Provided email or password are incorrect');
		},
	});

	return { login, isLoading };
}
