import { type TimerReducerAction, type TimerState } from '../types';

export default function timerReducer(
	state: TimerState,
	action: TimerReducerAction
): TimerState {
	switch (action.type) {
		case 'START_TIMER': {
			const { ownerId, duration } = action.payload;
			console.log('ownerId', ownerId, 'duration', duration);
			return {
				...state,
				isRunning: true,
				ownerId: ownerId,
				duration,
				startTime: Date.now(),
			};
		}
		case 'STOP_TIMER': {
			return {
				...state,
				isRunning: false,
				ownerId: null,
				duration: null,
				startTime: null,
			};
		}
		default:
			return state;
	}
}
