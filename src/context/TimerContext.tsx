import { createContext, useReducer } from 'react';
import { type Timer, type TimerState, type UUID } from '../types';
import timerReducer from '../reducers/timer-reducer';
//  Only one timer can be running at a time.

// Context
const TimerContext = createContext<Timer | null>(null);

// ****************************************************************************
// TimerContext Provider with default value

type TimersContextProviderProps = {
	children: React.ReactNode;
};

// Initialize the state
const initialState: TimerState = {
	isRunning: false,
	ownerId: null,
	duration: null,
	startTime: null,
};

// This is a component that provides the TimerContext.It accepts children as props and return the context provider to the context consumer.
function TimersContextProvider({ children }: TimersContextProviderProps) {
	const [timerState, dispatch] = useReducer(timerReducer, initialState);

	const startTimer = (ownerId: UUID, duration: number) => {
		dispatch({ type: 'START_TIMER', payload: { ownerId, duration } });
	};

	const stopTimer = () => {
		dispatch({ type: 'STOP_TIMER' });
	};

	const timer: Timer = {
		...timerState,
		startTimer,
		stopTimer,
	};

	return (
		<TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
	);
}

export default TimersContextProvider;
export { TimerContext };
