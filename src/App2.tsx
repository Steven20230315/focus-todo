import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Project from './components/Project';
import styled from 'styled-components';
import MainNavbar from './components/MainNavbar';

const Wrapper = styled.div`
	display: grid;
	grid-template-rows: 4rem 1fr;
	height: 100vh;
	main {
		display: grid;
		grid-template-columns: 250px 1fr;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
	.project {
		display: flex;
		justify-content: center;
	}
`;
export default function App2() {
	const [projects, setProjects] = useState([
		{
			title: 'project1',
			id: '1',
			tasks: [
				{
					title: 'task1',
					id: '1',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-04-15',
					pomodoroCount: 4,
				},
				{
					title: 'task2',
					id: '2',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-04-20',
					pomodoroCount: 3,
				},
				{
					title: 'task3',
					id: '3',
					completed: true,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-04-25',
					pomodoroCount: 4,
				},
				{
					title: 'task4',
					id: '4',
					completed: true,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-01',
					pomodoroCount: 2,
				},
				{
					title: 'task5',
					id: '5',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-05',
					pomodoroCount: 7,
				},
			],
		},
		{
			title: 'project2',
			id: '2',
			tasks: [
				{
					title: 'task1',
					id: '1',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-10',
					pomodoroCount: 7,
				},
				{
					title: 'task2',
					id: '2',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-15',
					pomodoroCount: 3,
				},
				{
					title: 'task3',
					id: '3',
					completed: true,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-20',
					pomodoroCount: 4,
				},
				{
					title: 'task4',
					id: '4',
					completed: true,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-25',
					pomodoroCount: 2,
				},
				{
					title: 'task5',
					id: '5',
					completed: false,
					pomodoroTime: 25,
					timeSpent: Math.floor(Math.random() * 25),
					estimatedCycle: Math.floor(Math.random() * 11), // Ranging from 0 to 10
					dueDate: '2024-05-30',
					pomodoroCount: 7,
				},
			],
		},
	]);

	const [currentProject, setCurrentProject] = useState(projects[0]);

	const [projectTitles, setProjectTitles] = useState<string[]>([]);
	useEffect(() => {
		const titles = projects.map((project) => project.title);
		setProjectTitles(titles);
	}, [projects]);

	const handleSelectProject = (title: string) => {
		console.log(title);
		const project = projects.find((project) => project.title === title);
		if (project) {
			setCurrentProject(project);
		}
		console.log(project);
	};

	const handleAddTask = (title: string, parentId: string) => {
		setProjects((prevProjects) => {
			const projectIndex = prevProjects.findIndex(
				(project) => project.id === parentId
			);
			if (projectIndex === -1) return prevProjects;

			const newTask = {
				title,
				id: `${prevProjects[projectIndex].tasks.length + 1}`,
				completed: false,
				pomodoroTime: 25,
				timeSpent: 0,
				estimatedCycle: 0,
			};

			const newProjects = prevProjects.map((project, index) => {
				if (index === projectIndex) {
					return {
						...project,
						tasks: [...project.tasks, newTask],
					};
				}
				return project;
			});

			return newProjects;
		});
	};

	const handleCompletedTask = (taskId: string, parentId: string) => {
		setProjects((prevProjects) => {
			return prevProjects.map((project) => {
				if (project.id === parentId) {
					return {
						...project,
						tasks: project.tasks.map((task) => {
							if (task.id === taskId) {
								return { ...task, completed: !task.completed }; // Toggle completed state
							}
							return task;
						}),
					};
				}
				return project;
			});
		});
	};

	useEffect(() => {
		// Update currentProject when projects change
		const updatedProject = projects.find((p) => p.id === currentProject.id);
		if (updatedProject) {
			setCurrentProject(updatedProject);
		}
	}, [projects, currentProject.id]);

	const handleAddProject = (newProjectTitle: string) => {
		// Assuming 'projects' is stored as an array of objects
		const newProject = {
			title: newProjectTitle,
			id: `${projects.length + 1}`, // Simple ID generation logic
			tasks: [], // Starts with no tasks
		};
		setProjects([...projects, newProject]);
	};

	const handleUpdateTask = (taskId:string, parentId:string, updatedFields) => {
		setProjects((prevProjects) =>
			prevProjects.map((project) =>
				project.id === parentId
					? {
							...project,
							tasks: project.tasks.map((task) =>
								task.id === taskId ? { ...task, ...updatedFields } : task
							),}
					: project
			)
		);
	};

	return (
		<Wrapper>
			<MainNavbar />
			<main>
				<Sidebar
					projectTitles={projectTitles}
					onSelectProject={handleSelectProject}
					onAddProject={handleAddProject}
				/>
				<div className='project'>
					<Project
						project={currentProject}
						onAddTask={handleAddTask}
						onCompleteTask={handleCompletedTask}
						onUpdateTask={handleUpdateTask}
					/>
				</div>
			</main>
		</Wrapper>
	);
}
