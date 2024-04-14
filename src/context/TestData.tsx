import React, { type FormEvent, useState, useEffect, useMemo } from 'react';
import { Root, Folder, Project, Task } from './Test';
import { NodeComponent } from '../components/NodeComponent';
export default function TestData() {
	// const root = new Root();
	const root = useMemo(() => new Root(), []); // Create root instance only once
	// console.log(folder, project, task);

	const [folders, setFolders] = useState<Folder[]>([]);

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

	const handleCreateTask = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const parentId = formData.get('parentId') as string;
		const title = formData.get('title') as string;
		const time = Number(formData.get('time') as string);
		const parent = folders.find((folder) => folder.id === parentId);
		if (parent) {
			parent.add(new Task(title, time, parent));
		}
	};

	return (
		<div>
			<form onSubmit={handleCreateFolder} autoComplete='off'>
				<input type='text' placeholder='Create Folder' name='title' />
				<button type='submit'>Create Folder</button>
			</form>
			<form onSubmit={handleCreateProject} autoComplete='off'>
				<input type='text' placeholder='Project Title' name='title' required />
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
			<form onSubmit={handleCreateTask} autoComplete='off'>
				<input type="text" placeholder='Task Title' name='title' />
				<input type="number" placeholder='Task Time' name='time' />
				<button type='submit'>Create Task</button>
			</form>
			<NodeComponent node={root} />
		</div>
	);
}
