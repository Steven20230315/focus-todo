import Task from './Task';
import styled from 'styled-components';
import Record from './Record';
import { useState, useEffect } from 'react';
import AddNewTask from './AddNewTask';
import { CiClock1 } from 'react-icons/ci';
import { IoCalendar } from 'react-icons/io5';
import { GiTomato } from 'react-icons/gi';
const Wrapper = styled.div`
	/* margin: 1rem auto;
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.completed {
		color: green;
		cursor: pointer;
	} */
	margin: 0 auto;
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 1rem;

	.main-content {
		flex: 2; /* Takes 2/3 of the space */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0 2rem;
	}
`;

// TODO:Add new interface
const TaskInfo = styled.div<{ $show }>`
	flex: 1; // Takes 1/3 of the space
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	display: ${({ $show }) => ($show ? 'block' : 'none')}; // Conditional display
	& > div {
		margin: 1rem;
	}

	form {
		margin: 1rem;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		& > input {
			background-color: transparent;
			border: none;
			outline: none;
			color: black;
		}
	}

	.input_field {
		display: flex;
		justify-content: space-between;
	}
`;

type Task = {
	title: string;
	id: string;
	completed: boolean;
	pomodoroTime: number;
	pomodoroCount: number;
	timeSpent: number;
	estimatedCycle: number;
	dueDate: string;
};

type ProjectProps = {
	project: {
		title: string;
		id: string;
		tasks: Array<{
			title: string;
			id: string;
			completed: boolean;
			pomodoroTime: number;
			timeSpent: number;
			estimatedCycle: number;
			dueDate: string;
			pomodoroCount: number;
		}>;
	};
	onAddTask: (title: string, parentId: string) => void;
	onCompleteTask: (id: string, parentId: string) => void;
	onUpdateTask: (
		taskId: string,
		parentId: string,
		updatedTask: Partial<Task>
	) => void;
};

export default function Project({
	project,
	onAddTask,
	onCompleteTask,
	onUpdateTask,
}: ProjectProps) {
	const [remainingTasks, setRemainingTasks] = useState(0);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [completedTasks, setCompletedTasks] = useState(0);
	const [showCompleted, setShowCompleted] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [estimatedTime, setEstimatedTime] = useState(0);
	// const [tasks, setTasks] = useState(project.tasks);

	useEffect(() => {
		// Calculate remaining tasks
		const remaining = project.tasks.filter((task) => !task.completed).length;
		setRemainingTasks(remaining);

		// Calculate elapsed time
		const elapsed = project.tasks.reduce((totalTime, task) => {
			if (task.completed) {
				return totalTime + task.timeSpent;
			}
			return totalTime;
		}, 0);
		setElapsedTime(elapsed);

		// Calculate completed tasks
		const completed = project.tasks.filter((task) => task.completed).length;
		setCompletedTasks(completed);

		const estimated = project.tasks.reduce((total, task) => {
			return total + task.pomodoroTime * task.pomodoroCount;
		}, 0);

		setEstimatedTime(estimated);
	}, [project.tasks, project]);

	const handleSelectTask = (task: Task) => {
		setSelectedTask(task);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const updatedPomodoroTime = event.currentTarget.pomodoroTime.value;
		const updatedDueDate = event.currentTarget.dueDate.value;
		const updatedPomodoroCount = event.currentTarget.pomodoroCount.value;

		onUpdateTask(selectedTask!.id, project.id, {
			pomodoroTime: parseInt(updatedPomodoroTime, 10),
			dueDate: updatedDueDate,
			pomodoroCount: parseInt(updatedPomodoroCount, 10),
		});

		setSelectedTask(null);
	};
	return (
		<Wrapper>
			<div className='main-content'>
				<h1>
					{project.title.charAt(0).toUpperCase() + project.title.slice(1)}
				</h1>
				<Record
					estimatedTime={estimatedTime}
					remainingTasks={remainingTasks}
					elapsedTime={elapsedTime}
					completedTasks={completedTasks}
				/>
				<AddNewTask
					projectName={project.title}
					onAddTask={onAddTask}
					parentId={project.id}
				/>

				{project.tasks
					.filter((task) => !task.completed)
					.map((task) => (
						<Task
							parentId={project.id}
							key={task.id}
							task={task}
							onCompleteTask={onCompleteTask}
							onClick={() => handleSelectTask(task)}
						/>
					))}

				<div
					className='completed'
					onClick={() => setShowCompleted(!showCompleted)}
				>
					{showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
				</div>
				{showCompleted &&
					project.tasks
						.filter((task) => task.completed)
						.map((task) => (
							<Task
								parentId={project.id}
								key={task.id}
								task={task}
								onCompleteTask={onCompleteTask}
								onClick={() => handleSelectTask(task)}
							/>
						))}
			</div>
			<TaskInfo $show={!!selectedTask}>
				{selectedTask && (
					<>
						<div>
							<h2>{selectedTask.title}</h2>
						</div>
						<hr />
						<div>
							<form action='' onSubmit={handleSubmit}>
								<div className='input_field'>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											alignItems: 'center',
											fontSize: '1.5rem',
										}}
									>
										<CiClock1 />
										<span>Pomodoro length</span>
										<input
											style={{ borderRadius: '5px', padding: '0.5rem' }}
											type='number'
											name='pomodoroTime'
											defaultValue={selectedTask.pomodoroTime}
											id=''
										/>
										minute
									</div>
								</div>
								<div className='input_field'>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											alignItems: 'center',
											fontSize: '1.5rem',
										}}
									>
										<GiTomato />
										<span>Pomodoro Count</span>
										<input
											style={{ borderRadius: '5px', padding: '0.5rem' }}
											type='number'
											name='pomodoroCount'
											defaultValue={selectedTask.pomodoroCount}
											id=''
										/>

									</div>
								</div>
								<div className='input_field'>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											alignItems: 'center',
											fontSize: '1.5rem',
										}}
									>
										<IoCalendar />
										<span>Due Date</span>
										<input
											style={{ borderRadius: '5px', padding: '0.5rem' }}
											type='date'
											name='dueDate'
											id=''
											defaultValue={selectedTask.dueDate}
										/>
									</div>
								</div>
								<button
									type='submit'
									style={{
										marginTop: '1rem',
										width: '55px',
										height: '30px',
										backgroundColor: 'green',
										color: 'white',
										marginLeft: 'auto',
										borderRadius: '5px',
										border: 'none',
									}}
								>
									Save
								</button>
							</form>
						</div>
						{/* Render more task details here */}
					</>
				)}
			</TaskInfo>
		</Wrapper>
	);
}
