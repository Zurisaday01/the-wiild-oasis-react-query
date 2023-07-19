/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { CgMoreVerticalAlt } from 'react-icons/cg';
import { createPortal } from 'react-dom';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${props => props.position.x}px;
	top: ${props => props.position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

// STEP 1: create context
const MenusContex = createContext();

// STEP 2: compount component
function Menus({ children }) {
	const [openId, setOpenId] = useState('');
	const [position, setPosition] = useState(null);

	const close = () => setOpenId('');
	const open = setOpenId;

	return (
		<MenusContex.Provider
			value={{ openId, close, open, position, setPosition }}>
			{children}
		</MenusContex.Provider>
	);
}

// STEP 3: children of the compount component
function Menu({ children }) {
	return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
	const { openId, close, open, setPosition } = useContext(MenusContex);

	function handleClick(e) {
		e.stopPropagation();
		const positionBtn = e.target.closest('button').getBoundingClientRect();

		setPosition({
			x: window.innerWidth - positionBtn.width - positionBtn.x,
			y: positionBtn.y + positionBtn.height + 8,
		});

		// (1)if the id stored doesn't exist or (2)it's different from the current id stored
		// (1)menu has not been open
		// (2)there is another menu open
		// if so, stored a new Id =means= open the current menu

		openId === '' || openId !== id ? open(id) : close();
	}

	return (
		<StyledToggle onClick={handleClick}>
			<CgMoreVerticalAlt />
		</StyledToggle>
	);
}
function List({ children, id }) {
	const { openId, position, close } = useContext(MenusContex);

	const listRef = useOutsideClick(close, false);

	if (openId !== id) return null;

	return createPortal(
		<StyledList ref={listRef} position={position}>
			{children}
		</StyledList>,
		document.body
	);
}

function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContex);
	function handleClick() {
		// STEP 1: render function if exists
		onClick?.();
		// STEP 2: close menu
		close();
	}
	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

// STEP 4: Pass children as props
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

/*
MENU

Toggle id
List id


*/
