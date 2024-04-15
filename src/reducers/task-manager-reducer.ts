import {
	type TaskManagerReducerAction,
	type TaskManagerState,
	type Project,
	type Task,
} from '../types';

export default function taskManagerReducer(
	state: TaskManagerState,
	action: TaskManagerReducerAction
) {
	if (action.type === 'ADD_PROJECT') {
		return {
			...state,
			projects: [...state.projects, action.payload],
		};
	}
	if (action.type === 'ADD_TASK') {
		return {
			...state,
			currentTasks: [...state.currentTasks, action.payload],
			tasks: [...state.tasks, action.payload],
		};
	}

	if (action.type === 'SET_CURRENT_PROJECT') {
		const currentProjectId = action.payload.id;
		const currentTasks = state.tasks.filter(
			(task: Task) => task.parentId === currentProjectId
		);

		return {
			...state,
			currentTasks: currentTasks,
			currentProject: action.payload,
		};
	}

	if (action.type === 'SET_CURRENT_TASK') {
		return {
			...state,
			currentTask: action.payload,
		};
	}

	if (action.type === 'SET_PROJECTS') {
		return {
			...state,
			projects: action.payload,
		};
	}

	if (action.type === 'SET_TASKS') {
		return {
			...state,
			tasks: action.payload,
		};
	}

	if (action.type === 'EDIT_PROJECT') {
		return {
			...state,
			projects: state.projects.map((project: Project) => {
				if (project.id === action.payload.id) {
					return action.payload;
				}
				return project;
			}),
		};
	}

	if (action.type === 'EDIT_TASK') {
		return {
			...state,
			tasks: state.tasks.map((task: Task) => {
				if (task.id === action.payload.id) {
					return action.payload;
				}
				return task;
			}),
		};
	}

	if (action.type === 'SET_CURRENT_TASKS') {
		return {
			...state,
			currentTasks: action.payload,
		};
	}

	// default case
	return state;
}
