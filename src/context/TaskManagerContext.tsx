import { useMemo, createContext, useReducer } from 'react';
import {
	type TaskManager,
	type TaskManagerState,
	type Task,
	type Project,
} from '../types';
import taskManagerReducer from '../reducers/task-manager-reducer';
import useTasksGenerator from '../hooks/useTasksGenerator';

// This make no difference in JavaScript, as it's still a string. But in TypeScript, when I create ID through uuid, I'll need to explicitly type it as UUID.

// ****************************************************************************
// Context

const TaskManagerContext = createContext<TaskManager | null>(null);

// ****************************************************************************
// Provider
const TaskManagerProvider = ({ children }: { children: React.ReactNode }) => {
	const { projects, tasks } = useTasksGenerator();
	const currentTask = useMemo(
		() => tasks.filter((task: Task) => task.parentId === projects[0].id),
		[tasks, projects]
	);
	const initialState: TaskManagerState = {
		currentProject: projects[0] ?? null,
		currentTask: null,
		currentTasks: currentTask,
		projects: projects,
		tasks: tasks,
	};
	const [taskManagerState, dispatch] = useReducer(
		taskManagerReducer,
		initialState
	);

	const addProject = (project: Project) => {
		dispatch({ type: 'ADD_PROJECT', payload: project });
	};

	const addTask = (task: Task) => {
		dispatch({ type: 'ADD_TASK', payload: task });
	};

	const setCurrentProject = (project: Project) => {
		dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
	};

	const setCurrentTask = (task: Task) => {
		dispatch({ type: 'SET_CURRENT_TASK', payload: task });
	};

	const setProjects = (projects: Project[]) => {
		dispatch({ type: 'SET_PROJECTS', payload: projects });
	};

	const setTasks = (tasks: Task[]) => {
		dispatch({ type: 'SET_TASKS', payload: tasks });
	};

	const setCurrentTasks = (tasks: Task[]) => {
		dispatch({ type: 'SET_CURRENT_TASKS', payload: tasks });
	};
	const editProject = (project: Project) => {
		dispatch({ type: 'EDIT_PROJECT', payload: project });
	};

	const editTask = (task: Task) => {
		dispatch({ type: 'EDIT_TASK', payload: task });
	};
	// To prevent unwanted rerendering
	const value = useMemo(
		() => ({
			...taskManagerState,
			addProject,
			addTask,
			setCurrentProject,
			setCurrentTask,
			setCurrentTasks,
			setProjects,
			setTasks,
			editProject,
			editTask,
		}),
		[taskManagerState]
	);
	return (
		<TaskManagerContext.Provider value={value}>
			{children}
		</TaskManagerContext.Provider>
	);
};

export default TaskManagerProvider;
export { TaskManagerContext };
// ****************************************************************************
