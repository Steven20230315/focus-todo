import styled from 'styled-components';
import { type FormEvent, useState, useEffect, useMemo } from 'react';
import NodeComponent from './components/NodeComponent';
import { Root, Folder, Project, Task } from './context/Test';
import ProjectPage from './components/ProjectPage';
import RootComponent from './components/RootComponent';
import CurrentPage from './components/CurrentPage';
// import WorkManagerProvider from './context/WorkManagerContext1';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 200px 1fr;
`;

function App() {
	// Initialize root and create dummy data. Use useMemo to prevent unnecessary re-renders
	const root = useMemo(() => {
		const newRoot = new Root();
		// Creating folders
		for (let i = 1; i <= 3; i++) {
			const folder = new Folder(`Folder ${i}`, newRoot);
			newRoot.add(folder); // Assuming add method is available to append children to a node

			// Creating projects within each folder
			for (let j = 1; j <= 3; j++) {
				const project = new Project(`Project ${i}-${j}`, folder);
				folder.add(project); // Adding the project to the current folder

				// Creating tasks within each project
				for (let k = 1; k <= 3; k++) {
					const task = new Task(`Task ${i}-${j}-${k}`, k * 10, project);
					project.add(task); // Adding the task to the current project
				}
			}
		}
		return newRoot;
	}, []);
	const [rootData, setRootData] = useState<Root>(root);
	const [folders, setFolders] = useState<Folder[]>([]);
	// TODO:Rename this later
	const [selectedNode, setSelectedNode] = useState<Folder | Project | Task| null>(null);

	useEffect(() => {
		setFolders(
			root.children.filter((child) => child.role === 'folder') as Folder[]
		);
	}, [root.children]);
	const handleCreateFolder = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newFolder = new Folder(formData.get('title') as string, root);
		root.add(newFolder);
		console.log(root.children);
		setFolders([...folders, newFolder]); // Update folders state
	};

	const handleCreateProject = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const folderId = formData.get('folderId') as string;
		const title = formData.get('title') as string;
		if (folderId === root.id) {
			root.add(new Project(title, root));
			console.log('Project created under:', root);
			return;
		}
		const parentFolder = folders.find((folder) => folder.id === folderId);
		if (parentFolder) {
			parentFolder.add(new Project(title, parentFolder));
			console.log('Project created under:', parentFolder);
		} else {
			console.error('Folder not found');
		}
	};

	const handleNodeClick = (node: Folder | Project | Task) => {
		if (
			node instanceof Folder ||
			node instanceof Project ||
			node instanceof Task
		) {
			setSelectedNode(node);
		}
	};

	const updateProjectTitle = (projectId: string, newTitle: string) => {
		root.updateProjectTitle(projectId, newTitle);
		// You may need to trigger a state update to refresh the UI if required
	};

	const addTaskToProject = (projectId: string, title: string, time: number) => {
		root.addTaskToProject(projectId, title, time);
		// Trigger UI update if necessary
	};
	return (
		<>
			<Wrapper>
				{/* ******************************************************** Add new folder and project */}
				<form onSubmit={handleCreateFolder} autoComplete='off'>
					<input type='text' placeholder='Create Folder' name='title' />
					<button type='submit'>Create Folder</button>
				</form>
				<form onSubmit={handleCreateProject} autoComplete='off'>
					<input
						type='text'
						placeholder='Project Title'
						name='title'
						required
					/>
					<select name='folderId' required>
						<option value=''>Select Folder</option>
						<option value={root.id}>Root</option>
						{folders.map((folder) => (
							<option key={folder.id} value={folder.id}>
								{folder.title}
							</option>
						))}
					</select>
					<button type='submit'>Create Project</button>
				</form>

				{/* ******************************************************** Add new folder and project */}

				<div>
					<RootComponent root={root} onNodeSelect={handleNodeClick} />
				</div>
				<ProjectPage
					selectedNode={selectedNode}
					onUpdateProjectTitle={updateProjectTitle}
					onAddTaskToProject={addTaskToProject}
				></ProjectPage>
				<CurrentPage project={root.children[0].children[0]}></CurrentPage>
			</Wrapper>
		</>
	);
}

export default App;
