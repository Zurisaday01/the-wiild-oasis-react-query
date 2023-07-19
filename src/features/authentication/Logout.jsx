import ButtonIcon from '../../ui/ButtonIcon';
import { MdOutlineLogout } from 'react-icons/md';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
	const { logout, isLoading } = useLogout();
	return (
		<ButtonIcon onClick={() => logout()}>
			{!isLoading ? <MdOutlineLogout /> : <SpinnerMini />}
		</ButtonIcon>
	);
}

export default Logout;
