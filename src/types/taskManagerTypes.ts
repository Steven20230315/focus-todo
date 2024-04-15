import { type Task, type Project } from './';

export type TaskManagerState = {
	currentProject: Project | null;
	currentTask: Task | null;
	currentTasks: Task[] | [];
	projects: Project[] | [];
	tasks: Task[] | [];
};

export type TaskManagerAction = {
	addProject: (project: Project) => void;
	addTask: (task: Task) => void;
	setCurrentProject: (project: Project) => void;
	setCurrentTask: (task: Task) => void;
	setCurrentTasks: (tasks: Task[]) => void;
	// Any modification of tasks or projects
	setProjects: (projects: Project[]) => void;
	setTasks: (tasks: Task[]) => void;
	editProject: (project: Project) => void;
	editTask: (task: Task) => void;
};

export type TaskManager = TaskManagerState & TaskManagerAction;
