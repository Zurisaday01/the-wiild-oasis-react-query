import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingBookings, bookings = [] } = useRecentBookings();
	const {
		isLoading: isLoadingStays,
		confirmedStays = [],
		numDays,
	} = useRecentStays();
	const { cabins, isLoading: isLoadingCubins } = useCabins();

	if (isLoadingBookings || isLoadingStays || isLoadingCubins)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart
				bookings={bookings}
				numDays={numDays}
				isLoadingBookings={isLoadingBookings}
			/>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
