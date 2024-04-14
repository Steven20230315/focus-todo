import React, { useState } from 'react';
import { Root, Folder, Project, Task } from '../context/Test.tsx';
import styled from 'styled-components';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { AiOutlineCaretUp } from 'react-icons/ai';
const Wrapper = styled.div<{
	$role: 'folder' | 'project' | 'task';
	$isSelected: boolean;
}>`
	margin-left: 20px;
	color: ${({ $role, $isSelected }) =>
		$isSelected
			? 'gold' // Highlight selected node
			: $role === 'folder'
			? 'blue'
			: $role === 'project'
			? 'green'
			: $role === 'task'
			? 'orange'
			: 'purple'};
	border: ${({ $isSelected }) =>
		$isSelected ? '2px solid gold' : 'none'}; // Add border if selected
`;

const CaretIcon = styled.div<{ $isOpen: boolean }>`
	display: inline;
	transition: transform 0.3s ease-in-out;
	transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
	margin-left: 5px;
`;

type NodeComponentProps = {
	node: Folder | Project | Task;
	onNodeClick: (node: Folder | Project | Task) => void;
	selectedNode: Folder | Project | Task | null; // Optional, based on usage
};

// TODO: Update State management so that it will re-render when a new node is added
// Recursive component to render the node and its children
const NodeComponent = ({
	node,
	onNodeClick,
	selectedNode,
}: NodeComponentProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation(); // Prevent toggle from propagating click to node click
		setIsOpen(!isOpen);
	};

	const handleNodeClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation(); // Prevent further propagation
		onNodeClick(node);
	};

	return (
		<Wrapper
			$role={node.role}
			onClick={handleNodeClick}
			$isSelected={node === selectedNode}
		>
			<div style={{ cursor: 'pointer' }}>
				{node.title}
				{node.children.length > 0 && (
					<div onClick={toggle}>
						<CaretIcon $isOpen={isOpen}>
							{isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
						</CaretIcon>
					</div>
				)}
			</div>
			{isOpen && (
				<div>
					{node.children.map((child) => (
						<NodeComponent
							key={child.id}
							node={child}
							onNodeClick={onNodeClick}
							selectedNode={selectedNode}
						/>
					))}
				</div>
			)}
		</Wrapper>
	);
};

export default NodeComponent;
