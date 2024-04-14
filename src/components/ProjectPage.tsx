import Tasks from './Tasks';
import Record from './Record';
import AddNewTask from './AddNewTask';
import { Folder, Project, Task } from '../context/Test';

// TODO: Should not accept null.
type ProjectPageProps = {
	selectedNode: Folder | Project | Task ;
	onUpdateProjectTitle: (projectId: string, newTitle: string) => void;
	onAddTaskToProject: (projectId: string, title: string, time: number) => void;
};

export default function ProjectPage({
	selectedNode,
	onUpdateProjectTitle,
	onAddTaskToProject,
}: ProjectPageProps) {
	return (
		<div>
			<h1>Title + Sorting Option</h1>
			<h1>
				{selectedNode ? selectedNode.title : 'Select a Project or Folder'}
			</h1>
			<button
				onClick={() => onUpdateProjectTitle(selectedNode.id, 'New Title')}
			>
				Update Title
			</button>
			<button
				onClick={() => onAddTaskToProject(selectedNode.id, 'New Task', 30)}
			>
				Add Task
			</button>
			<Record></Record>
			<AddNewTask title='Tasks'></AddNewTask>

			<Tasks></Tasks>
		</div>
	);
}
