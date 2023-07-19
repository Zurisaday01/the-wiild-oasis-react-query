import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import { toast } from 'react-hot-toast';

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Setting successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['settings'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateSetting };
}
