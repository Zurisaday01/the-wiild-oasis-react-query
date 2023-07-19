/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledFormRowVertical = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&:not(:last-child) {
		margin-bottom: 3rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

function FormRowVertical({ children, label }) {
	return (
		<StyledFormRowVertical>
			<Label htmlFor={children.props?.id}>{label}</Label>
			{children}
		</StyledFormRowVertical>
	);
}

export default FormRowVertical;
