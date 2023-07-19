import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useBooking } from './useBooking';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckOut } from '../check-in-out/useCheckOut';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { isLoading, booking } = useBooking();
	const navigate = useNavigate();

	const moveBack = useMoveBack();
	const { isDeleting, deleteBooking } = useDeleteBooking();

	const { isCheckingOut, checkOut } = useCheckOut();
	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resource='booking' />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === 'checked-in' && (
					<Button
						disabled={isCheckingOut}
						icon={<AiOutlineArrowUp />}
						onClick={() => checkOut(bookingId)}>
						Check out
					</Button>
				)}
				{status === 'unconfirmed' && (
					<Button
						variation='primary'
						onClick={() => navigate(`/checkIn/${bookingId}`)}>
						Check in
					</Button>
				)}
				<Modal>
					<Modal.Open opens='delete'>
						<Button variation='danger'>Delete booking</Button>
					</Modal.Open>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='booking'
							onConfirm={() =>
								deleteBooking(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>
				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
