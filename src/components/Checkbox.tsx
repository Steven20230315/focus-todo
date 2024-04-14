import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa6';
import { useState } from 'react';

const CheckboxWrapper = styled.span`
	button {
		background-color: white;
		height: 20px;
		width: 20px;
		border: 1px solid black;
		border-radius: 10px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		&:hover {
			background-color: lightgray;
		}
	}
`;

type CheckboxProps = {
	task: {
		title: string;
		id: string;
		completed: boolean;
	};
	onClick: () => void;
};

export default function Checkbox({ task, onClick }: CheckboxProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<CheckboxWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			<button>{task.completed || isHovered ? <FaCheck /> : null}</button>
		</CheckboxWrapper>
	);
}
