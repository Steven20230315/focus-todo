import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export const useTimerContext = () => {
	const timer = useContext(TimerContext);

	if (!timer) {
		throw new Error(
			'useTimerContext must be used within a TimerContextProvider'
		);
	}

	return timer;
};
