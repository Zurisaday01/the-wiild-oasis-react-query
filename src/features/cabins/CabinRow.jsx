/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { HiDuplicate } from 'react-icons/hi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useCreateCabin } from './useCreateCabin';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const {
		id: cabinId,
		name,
		max_capacity,
		regular_price,
		discount,
		image,
		description,
	} = cabin || {};

	const { isDeleting, deleteCabin } = useDeleteCabin();

	const { isCreating, createCabin } = useCreateCabin();

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			max_capacity,
			regular_price,
			discount,
			image,
			description,
		});
	}

	if (cabin)
		return (
			<>
				<Table.Row>
					<Img src={image} />
					<Cabin>{name}</Cabin>
					<div>Fits up to {max_capacity}</div>
					<Price>{formatCurrency(regular_price)}</Price>
					<Discount>
						{discount ? formatCurrency(discount) : <span>&mdash;</span>}
					</Discount>
					<div>
						{/* Could be either the Modal first or Menus.Menu */}
						<Modal>
							<Menus.Menu>
								<Menus.Toggle id={cabinId} />

								<Menus.List id={cabinId}>
									{/* DUPLICATE */}
									<Menus.Button
										icon={<HiDuplicate />}
										onClick={handleDuplicate}>
										Duplicate
									</Menus.Button>
									{/* EDIT */}
									<Modal.Open opens='edit'>
										<Menus.Button icon={<MdEdit />}>Edit</Menus.Button>
									</Modal.Open>
									{/* DELETE */}
									<Modal.Open opens='delete'>
										<Menus.Button icon={<MdDelete />}>Delete</Menus.Button>
									</Modal.Open>
								</Menus.List>

								{/* WINDOWS ARE OUTSIDE OF THE MENU LIST */}
								<Modal.Window name='edit'>
									<CreateCabinForm cabinToEdit={cabin} />
								</Modal.Window>

								<Modal.Window name='delete'>
									<ConfirmDelete
										resourceName='cabin'
										onConfirm={() => deleteCabin(cabinId)}
										disabled={isDeleting}
									/>
								</Modal.Window>
							</Menus.Menu>
						</Modal>
					</div>
				</Table.Row>
			</>
		);
}

export default CabinRow;
