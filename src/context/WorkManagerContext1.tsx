import {
	type ReactNode,
	useState,
	useReducer,
	useContext,
	createContext,
} from 'react';


import { v4 as uuidv4 } from 'uuid';

type Task = {
	title: string;
	completed: boolean;
	time: number;
	id: string;
	parentId: string;
};

// Project is a standalone unit. It doesn't have to be part of a folder
type Project = {
	title: string;
	tasks: Array<Task>;
	projectId: string;
	parentId?: string;
};

// Folder can have multiple projects or no project
type Folder = {
	title: string;
	projects?: Array<Project>;
};

type WorkManagerContextType = {
	data: Array<Folder | Project>;
} & {
	createFolder: (title: string) => void;
	createProject: (title: string) => void;
	createTask: (
		title: string,
		time: number,
		id: string,
		parentId: string
	) => void;
	deleteTask: (parentId: string, id: string) => void;
	updateTask: (
		parentId: string,
		id: string,
		title: string,
		time: number
	) => void;
	updateProject: (id: string, title: string) => void;
	updateFolder: (id: string, title: string) => void;
	deleteProject: (id: string) => void;
	deleteFolder: (id: string) => void;
};

export const WorkManagerContext = createContext<WorkManagerContextType | null>(
	null
);

//
type WorkManagerProviderProps = {
	children: ReactNode;
};

// Component function that manages the work manager state and make the context available
export default function WorkManagerProvider({
	children,
}: WorkManagerProviderProps) {
	const ctx: WorkManagerContextType = {
		data: [],
		createFolder(title) {
			this.folders.push({
				title: title,
			});
		},
		createProject(title) {
			this.data.push({
				title: title,
				tasks: [],
				projectId: uuidv4(),
			});
		},
		createTask(title, time, id, parentId) {
			this.projects.forEach((project) => {
				if (project.projectId === parentId) {
					project.tasks.push({
						title: title,
						completed: false,
						time: time,
						id: id,
						parentId: parentId,
					});
				}
			});
		},
		deleteTask(parentId, id) {
			this.projects.forEach((project) => {
				if (project.projectId === parentId) {
					project.tasks = project.tasks.filter((task) => task.id !== id);
				}
			});
		},
		updateTask(parentId, id, title, time) {
			this.projects.forEach((project) => {
				if (project.projectId === parentId) {
					project.tasks.forEach((task) => {
						if (task.id === id) {
							task.title = title;
							task.time = time;
						}
					});
				}
			});
		},
		updateProject(id, title) {
			this.data.forEach((project) => {
				if (project.projectId === id) {
					project.title = title;
				}
			});
		},
		updateFolder(id, title) {
			this.folders.forEach((folder) => {
				if (folder.title === id) {
					folder.title = title;
				}
			});
		},
		deleteProject(id) {
			this.projects = this.projects.filter(
				(project) => project.projectId !== id
			);
		},
		deleteFolder(id) {
			this.folders = this.folders.filter((folder) => folder.title !== id);
		},
	};
	return (
		<WorkManagerContext.Provider value={ctx}>
			{children}
		</WorkManagerContext.Provider>
	);
}
