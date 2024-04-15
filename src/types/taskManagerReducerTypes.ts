import { type Project, type Task } from './';

// I will add more details to this later. The distinction between each action will be more clear.
export type AddProjectAction = {
	type: 'ADD_PROJECT';
	payload: Project;
};

export type AddTaskAction = {
	type: 'ADD_TASK';
	payload: Task;
};

export type SetCurrentProjectAction = {
	type: 'SET_CURRENT_PROJECT';
	payload: Project;
};

export type SetCurrentTaskAction = {
	type: 'SET_CURRENT_TASK';
	payload: Task;
};

export type SetProjectsAction = {
	type: 'SET_PROJECTS';
	payload: Project[];
};

export type SetTasksAction = {
	type: 'SET_TASKS';
	// To access project Id
	payload: Task[];
};

export type EditProjectAction = {
	type: 'EDIT_PROJECT';
	payload: Project;
};

export type EditTaskAction = {
	type: 'EDIT_TASK';
	payload: Task;
};

export type SetCurrentTasksAction = {
	type: 'SET_CURRENT_TASKS';
	payload: Task[];
};

export type TaskManagerReducerAction =
	| AddProjectAction
	| AddTaskAction
	| SetCurrentProjectAction
	| SetCurrentTaskAction
	| SetProjectsAction
	| SetTasksAction
	| EditProjectAction
	| EditTaskAction
	| SetCurrentTasksAction;
