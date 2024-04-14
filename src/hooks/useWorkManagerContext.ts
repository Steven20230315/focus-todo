import { WorkManagerContext } from '../context/WorkManagerContext1';
import { useContext } from 'react';

// Fast refresh only works when a file only exports components.
export function useWorkManagerContext() {
	const workManagerCtx = useContext(WorkManagerContext);
	// Check if the context has been created. If workManagerCtx pass this test, typeScript won't complain that workMangerCtx might be null when using this hook
	if (workManagerCtx === null) {
		throw new Error(
			'useWorkManagerContext must be used within a WorkManagerProvider'
		);
	}

	return workManagerCtx;
}
