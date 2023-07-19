/* eslint-disable react/prop-types */
import Stat from './Stat';
import {
	BsBriefcaseFill,
	BsFillCalendarCheckFill,
	BsBarChart,
} from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// STEP 1
	const numBookings = bookings.length;

	// STEP 2
	// total prices of all bookings
	const sales = bookings.reduce((acc, booking) => acc + booking.total_price, 0);

	// STEP 3
	const checkins = confirmedStays.length;

	// STEP 4
	const occupation =
		confirmedStays.reduce((acc, current) => acc + current.num_nights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				icon={<BsBriefcaseFill />}
				title='Booking'
				value={numBookings}
				color='blue'
			/>
			<Stat
				icon={<FaMoneyBill />}
				title='Sales'
				value={formatCurrency(sales)}
				color='green'
			/>
			<Stat
				icon={<BsFillCalendarCheckFill />}
				title='Check ins'
				value={checkins}
				color='indigo'
			/>
			<Stat
				icon={<BsBarChart />}
				title='Occupancy'
				value={Math.round(occupation * 100) + '%'}
				color='yellow'
			/>
		</>
	);
}

export default Stats;
