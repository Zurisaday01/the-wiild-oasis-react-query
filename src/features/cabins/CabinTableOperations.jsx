import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function CabinTableOperations() {
	return (
		<>
			{/* FILTER */}
			<Filter
				filterField='discount'
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'no-discount', label: 'No discount' },
					{ value: 'with-discount', label: 'With discount' },
				]}
			/>
			{/* SORT BY */}
			<SortBy
				options={[
					{ value: 'name-asc', label: 'Sort by name (A-Z)' },
					{ value: 'name-desc', label: 'Sort by name (Z-A)' },
					{ value: 'regular_price-asc', label: 'Sort by price (low first)' },
					{ value: 'regular_price-desc', label: 'Sort by price (high first)' },
					{ value: 'max_capacity-asc', label: 'Sort by capacity (low first)' },
					{
						value: 'max_capacity-desc',
						label: 'Sort by capacity (high first)',
					},
				]}
			/>
		</>
	);
}

export default CabinTableOperations;

/*
NOTE

to filter cabins we need to modify the url to change the query string according to the value of the filter option we are selecting

I am filtering the table according to the discound

QueryString

?discound=all

Options
!all
!no-discount
!with-discount

*/
