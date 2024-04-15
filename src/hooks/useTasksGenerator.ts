import { useMemo } from 'react';
import { type Project, type Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

const useTasksGenerator = () => {
	const data = useMemo(() => {
		const projects: Project[] = [];
		const tasks: Task[] = [];

		for (let i = 0; i < 10; i++) {
			projects.push({ id: uuidv4(), title: `Project ${i + 1}`, tasks: [] });
		}

		for (const project of projects) {
			for (let i = 0; i < 5; i++) {
				tasks.push({
					id: uuidv4(),
					title: `Task ${i + 1} in ${project.title}`,
					parentId: project.id,
					completed: false,
					pomodoroTime: 25,
					timeSpent: 0,
					estimatedCycle: 0,
					dueDate: '2024-04-15',
					pomodoroCount: 0,
					priority: 'low',
				});
			}
		}

		return { projects, tasks };
	}, []); // Empty dependency array ensures this runs only once

	return data;
};

export default useTasksGenerator;
