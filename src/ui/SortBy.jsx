import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
	const [seachParams, setSearchParams] = useSearchParams();

	// NOTE: in case we don't have a query string set (when we firt visit cabins page)
	const sortBy = seachParams.get('sortBy') || '';

	function handleChange(e) {
		seachParams.set('sortBy', e.target.value);
		setSearchParams(seachParams);
	}

	return (
		<Select
			options={options}
			value={sortBy}
			type='white'
			onChange={handleChange}
		/>
	);
}

export default SortBy;
