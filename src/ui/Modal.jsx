/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

// NOTE: React portal: lets you render some children into a different part of the DOM.

// Why use it?
// In order to avoid conflicts with css { overflow: hidden }
// if your component parent has { overflow: hidden } the model will be cut off

// portal to outside of the DOM
// it shares place with the root

// STEP 1: Create a context
const ModalContext = createContext();

// STEP 2: Create parent component
function Modal({ children }) {
	// the window's name
	// <Modal.Window name='cabin-form'>
	const [openName, setOpenName] = useState('');

	// When it's closed it returns to the default state
	const close = () => setOpenName('');
	// Opening a window is the same as setting the open name
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

// STEP 3: Create child components
function Open({ children, opens: opensWindowName }) {
	// NOTE: We need to add this open function to the children
	const { open } = useContext(ModalContext);
	// cloneElement lets you to create a new element based on another one, NOTE: must not overuse
	const childrenWithNewProp = cloneElement(children, {
		onClick: () => open(opensWindowName),
	});

	return childrenWithNewProp;
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const windowRef = useOutsideClick(close);

	if (name !== openName) return null;

	// Modal will be a direct child element of the body element
	return createPortal(
		<Overlay>
			<StyledModal ref={windowRef}>
				<Button onClick={close}>
					<IoClose />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

// STEP 4: Add child components as properties to the parent component

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// document.querySelector

/*
NOTE

!window doesn't contain the element that was clicked
so, the element clicked was the overlay

document.eventListener('click', (e) => {
	
	!window(ref).contains(e.target)

  click ↓ get the element (e.target)
	____________________________
	|	.						|
	|		____________		|
	|		|			|		|
	|		| windowRef	|		|
	|		|			|		|
	|		TTTTTTTTTTTT		|
	|							|
	TTTTTTTTTTTTTTTTTTTTTTTTTTTT
})



*/

/*
NOTE: 

useRef - does not return a rerender of a component

{current: value}

it allows as to get the updated value without waiting for the rerender

useRef does not cause a component to rerender

Never use ref inside of a return function

DOM element

<input ref={inputRef} />

useEffect()
{current: input}

	inputRef.current.focus()
[]

access to components and call functions in those components

input.focues()



Lifecycle

Mounting = the element is render by the render method = rendering component = the component appears in the screen
Updating = component is updated
Unmounting = the component is remove from the DOM = the component stop appearing in the screen


useEffect
	shows what's inside when the component mounts


[] empty dependencies
render only once when the component mounts

return function will be execute when the component unmounts

*/
