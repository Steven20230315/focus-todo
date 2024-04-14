import { createContext, useContext } from 'react';

// context for individual project

// Time duration of each pomodoro
type Timer = {
	duration: number;
};

// Timer state of each task
// TODO: Ensure only one timer is running
type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

// 
type Task = {
	id: string;
	title: string;
	// The duration of each pomodoro
	timersState: TimersState;
	setDuration: (duration: number) => void;
	startTimer: () => void;
	stopTimer: () => void;
};

type Project = {
	id: string;
	title: string;
	tasks: Task[];
	// Right now, a project does not have a unified timer (set pomodoro duration to all tasks).
	// In the future, user can set a unified timer in user setting or in project setting
};

type ProjectContextValue = Project & {
	addTask: (title: string, time: number) => void;
	updateTitle: (newTitle: string) => void;
};
