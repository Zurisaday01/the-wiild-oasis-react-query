import { useUser } from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	// we can only call this inside a function or a useEffect
	const navigate = useNavigate();

	// STEP 1: Load the authenticated user to cache
	const { isLoading, isAuthenticated } = useUser();

	// STEP 3: If there is NOT authenticated user, redirect to the /login

	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isAuthenticated, isLoading, navigate]
	);

	// STEP 2: While loading, show a spinner

	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	// STEP 4: If there IS a user, render the app

	return children;
}

export default ProtectedRoute;
