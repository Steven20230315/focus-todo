import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const ModalContent = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
	cursor: pointer;
  position: relative;
  right: 0;
  top: -16px;
	background-color: red;
	color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
	&:hover {
    opacity: 0.7;
	}
`;

type ModalProps = {
	show: boolean;
	children: React.ReactNode;
	onClose: () => void;
};

const Modal = ({ show, children, onClose }: ModalProps) => {
	if (!show) return null;

	return (
		<ModalBackdrop onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				{children}
				<CloseButton onClick={onClose}>Cancel</CloseButton>
			</ModalContent>
		</ModalBackdrop>
	);
};

export default Modal;
