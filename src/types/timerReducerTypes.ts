import { type TaskTimerInfo } from './';

export type StartTimerAction = {
	type: 'START_TIMER';
	payload: TaskTimerInfo;
};

export type StopTimerAction = {
	type: 'STOP_TIMER';
};

export type TimerReducerAction = StartTimerAction | StopTimerAction;
