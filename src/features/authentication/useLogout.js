import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate('/login', { replace: true });
		},
	});

	return { logout, isLoading };
}

// navigate("/some/where", { replace: true })
//  the current entry in the history stack will be replaced with the new one, it means that if you try to go back to the previous page you won't be able to.
