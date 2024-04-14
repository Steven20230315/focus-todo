import React from 'react';
import styled from 'styled-components';
import { SlSettings } from 'react-icons/sl';

const Wrapper = styled.div`
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	background-color: white;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export default function MainNavbar() {
	return (
		<Wrapper>
			<div>user</div>
			<div>
				<SlSettings />
			</div>
		</Wrapper>
	);
}
