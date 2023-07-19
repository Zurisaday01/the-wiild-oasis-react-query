import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from './ButtonIcon';
import { MdOutlineDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{isDarkMode ? <BsSun /> : <MdOutlineDarkMode />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
