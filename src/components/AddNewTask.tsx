import styled from 'styled-components';

const Wrapper = styled.form`
	display: flex;
	background-color: white;
	border-radius: 10px;
	padding: 1rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	color: grey;
	input {
		flex: 1;
		min-width: 0; /* Ensure that the input can shrink */
		width: fit-content; /* Adjust width to fit content */
		border: none;
		outline: none;
	}
	&:hover,
	&:focus-within {
		border: 1.5px red solid;
	}
`;

type AddNewTaskProps = {
	onAddTask: (title: string, parentId: string) => void;
	parentId: string;
	projectName: string;
};

export default function AddNewTask({
	projectName,
	onAddTask,
	parentId,
}: AddNewTaskProps ) {
	
	const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const title = event.currentTarget.task.value;
		onAddTask(title, parentId);
		event.currentTarget.reset();
	}



	return (
		<Wrapper onSubmit={handleAddTask} >
			+
			<input
				type='text'
				name='task'
				placeholder={`Add a task to "${projectName}", press [Enter] to add`}
			/>
		</Wrapper>
	);
}
