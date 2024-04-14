import React from 'react';
import styled from 'styled-components';

const LinkWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	border-radius: 10px;

	&:hover {
		background-color: lightgray;
	}
	.title {
		display: flex;
		gap: 1rem;
	}
	.info {
		color: black;
	}
`;

type LinkProps = {
	title: string;
	icon: React.ReactNode;
	onClick: () => void;
};

export default function Link({ title, icon, onClick }: LinkProps) {
	return (
		<LinkWrapper onClick={onClick}>
			<div className='title'>
				{icon}
				{title}
			</div>
			<div className='info'>m</div>
		</LinkWrapper>
	);
}
