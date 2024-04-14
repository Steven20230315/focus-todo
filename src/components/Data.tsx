import { useWorkManagerContext } from '../hooks/useWorkManagerContext';
import { v4 as uuidv4 } from 'uuid';
import { type FormEvent } from 'react';
export default function Data() {
	const workManagerContext = useWorkManagerContext();
	console.log(workManagerContext.folders);
	console.log(workManagerContext.projects);
	const handleCreateFolder = () => {};

	const handleCreateProject = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		// FormDataEntryValue = string | File. So we need to use type cast to tell typeScript it is a string
		workManagerContext.createProject(formData.get('title') as string);
    console.log( formData.get( 'title' ) );
    // reset the form after submit
    e.currentTarget.reset();
	};
	return (
		<div>
			test
			<button onClick={() => workManagerContext.createFolder('test')}>
				Create Folder
			</button>
			<button onClick={() => workManagerContext.createProject('test')}>
				Create Project
			</button>
			<form onSubmit={handleCreateProject}>
				<input type='text' name='title' />
				<button type='submit'>Create Project</button>
			</form>
		</div>
	);
}
