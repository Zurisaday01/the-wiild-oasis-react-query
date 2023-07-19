/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${props =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();

	// setting the active prop
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	// NOTE when I click I want to change the URL
	function handleClick(value) {
		// STEP: set the query string
		searchParams.set(filterField, value);
		// !IMPORTANT
		if (searchParams.get('page')) searchParams.set('page', 1);
		setSearchParams(searchParams);

		// You are using the filter when you are in another page, the filter will search the 1 page
	}

	return (
		<StyledFilter>
			{options.map(option => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					active={currentFilter === option.value}
					disabled={currentFilter === option.value}>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter;
