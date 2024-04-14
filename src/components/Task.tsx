import styled from 'styled-components';
import { useState } from 'react';
import Checkbox from './Checkbox';

const Wrapper = styled.div`
	background-color: gray;
	padding: 1rem;
	border: 1px solid black;
	border-radius: 10px;
	display: flex;
	gap: 1rem;
`;


// Define an interface for the TaskTitle props
interface TaskTitleProps {
	completed: boolean;
}

const TaskTitle = styled.span<TaskTitleProps>`
	color: ${(props) => (props.completed ? 'green' : 'black')};
	text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

type Task = {
	title: string;
	id: string;
	completed: boolean;
};

type TaskProps = {
	task: Task;
	onCompleteTask: (id: string, parentId: string) => void;
	parentId: string;
	onClick: () => void;
};

export default function Task({ task, onCompleteTask, parentId, onClick }: TaskProps) {
	return (
		<Wrapper onClick={onClick}>
			<Checkbox task={task} onClick={() => onCompleteTask(task.id, parentId)} />
			{/* <button>Timer</button> */}
			<TaskTitle completed={task.completed}>{task.title}</TaskTitle>
			{/* {task.completed ? '✅' : '❌'} */}
		</Wrapper>
	);
}
