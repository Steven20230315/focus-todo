import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
	justify-content: space-between;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	padding: 1rem 5rem;
	border-radius: 10px;
`;
import InfoBox from './InfoBox';

type RecordProps = {
	remainingTasks: number;
	elapsedTime: number;
	completedTasks: number;
	estimatedTime: number;
};

export default function Record({
	remainingTasks,
	elapsedTime,
	completedTasks,
	estimatedTime,
}: RecordProps) {
	return (
		<Wrapper>
			<InfoBox title='Estimated Time' data={estimatedTime} type='time' />
			<InfoBox title='Remaining Task' data={remainingTasks} type='task'/>
			<InfoBox title='Elapsed Time' data={elapsedTime} type='time' />
			<InfoBox title='Completed' data={completedTasks} type='task' />
		</Wrapper>
	);
}
