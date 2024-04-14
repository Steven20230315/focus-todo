import { type ReactNode, createContext, useContext } from 'react';

type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimer: () => void;
	stopTimer: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

// ************************************************************************
// Context Provider
type TimersContextProviderProps = {
	children: ReactNode;
};
export default function TimersContextProvider({ children }: TimersContextProviderProps) {
	const contextValue = {
		isRunning: false,
		timers: [],
		addTimer: (timerData: Timer) => {
			// contextValue.timers.push( timerData );
			console.log(timerData);
		},
		startTimer: () => {},
		stopTimer: () => {},
	};

	return (
		<TimersContext.Provider value={contextValue}>
			{children}
		</TimersContext.Provider>
	);
}
// ************************************************************************
