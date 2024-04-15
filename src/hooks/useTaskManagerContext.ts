import { useContext } from 'react';
import { TaskManagerContext } from '../context/TaskManagerContext';

export const useTaskManagerContext = () => {
	const taskManager = useContext(TaskManagerContext);

	if (!taskManager) {
		throw new Error(
			'useTaskManagerContext must be used within a TaskManagerContextProvider'
		);
	}

	return taskManager;
};
