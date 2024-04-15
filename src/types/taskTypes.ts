export type UUID = string;

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
	title: string;
	id: UUID;
	// Stored parentId so that when we need to modify the task, we don't need to pass the parentId as a prop (It's easy to forget to pass it)
	parentId: UUID;
	completed: boolean;
	// The duration of a pomodoro in minutes
	pomodoroTime: number;
	// How many pomodoros have been completed
	pomodoroCount: number;
	// How long the task has been spent
	timeSpent: number;
	// The estimated number of pomodoros required to complete the task (provided by the user)
	estimatedCycle: number;
	// The due date of the task
	dueDate: string;
	// TODO: Add more properties as needed
	// Description is optional
	description?: string;
	// Default priority is low
	priority: Priority;
};
