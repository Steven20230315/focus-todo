import styled from 'styled-components';

const Wrapper = styled.div`
	color: grey;
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		color: red;
		margin: 0;
		span {
			color: grey;
			font-size: 0.9rem;
			margin-left: 5px;
		}
	}
`;
type InfoBoxProps = {
	title: string;
	data: number;
	type: 'time' | 'task';
};

export default function InfoBox({ title, data, type }: InfoBoxProps) {
	return (
		<Wrapper>
			<h1>
				{data}
				{type === 'time' && <span>m</span>}
			</h1>
			<p>{title}</p>
		</Wrapper>
	);
}
