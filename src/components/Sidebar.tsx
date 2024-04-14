import styled from 'styled-components';
import { PiSunThin } from 'react-icons/pi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import Link from './Link';
import { useState } from 'react';
import Modal from './Modal';
const SidebarWrapper = styled.nav`
	background-color: white;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 250px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	.link {
		font-size: 1.5rem;
		border-radius: 10px;
	}

	.button {
		margin-top: auto;
		cursor: pointer;
		padding: 1rem;
		border-radius: 10px;
		&:hover {
			background-color: lightgray;
		}
	}

	.modal_form {
		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		& > button {
			width: 3rem;
			border: none;
			border-radius: 5px;
			padding: 5px 10px;
      cursor: pointer;
      background-color: #15dd15;
      color: white;
      position: relative; 
      left: 135px;
      top: 11px;
		}
	}
	.modal_input {
		border-radius: 5px;
		padding: 0.5rem;
	}
`;

const Links = [
	{ title: 'Today', icon: <PiSunThin color='green' /> },
	{ title: 'Tomorrow', icon: <FaRegCalendarAlt color='red' /> },
	{ title: 'This Week', icon: <BsCalendarCheck /> },
	{ title: 'Complete', icon: <BsCalendarCheck color='grey' /> },
];

type SidebarProps = {
	projectTitles: string[];
	onSelectProject: (title: string) => void;
	onAddProject: (title: string) => void;
};
export default function Sidebar({
	projectTitles,
	onSelectProject,
	onAddProject,
}: SidebarProps) {
	const [showModal, setShowModal] = useState(false);
	const [newProjectTitle, setNewProjectTitle] = useState('');

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const submitNewProject = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onAddProject(newProjectTitle); // Use the state directly
		setNewProjectTitle(''); // Reset input after submission
		closeModal(); // Close modal on submit
	};

	return (
		<SidebarWrapper>
			{/* {Links.map(({ title, icon }) => (
				<Link
					icon={icon}
					key={title}
					title={title}
					onClick={() => onSelectProject(title)}
				/>
			))} */}

			{projectTitles.map((title) => (
				<Link
					icon={<GoDotFill color='blue' />}
					key={title}
					title={title}
					onClick={() => onSelectProject(title)}
				/>
			))}
			<div className='button' onClick={openModal}>
				+ Add new project
			</div>

			<Modal show={showModal} onClose={closeModal}>
				<h2>Add New Project</h2>
				<form className='modal_form' onSubmit={submitNewProject}>
					<input
						className='modal_input'
						type='text'
						placeholder='Enter project name'
						name='title'
						value={newProjectTitle}
						onChange={(e) => setNewProjectTitle(e.target.value)}
					/>
					<button type='submit'>Save</button>
				</form>
			</Modal>
		</SidebarWrapper>
	);
}
