import { useState } from 'react';
import NodeComponent from './NodeComponent';
import { Root, Folder, Project, Task } from '../context/Test';
type RootComponentProps = {
	root: Root;
	onNodeSelect: (node: Folder | Project | Task) => void; // Handling selection
};

const RootComponent = ({ root, onNodeSelect }: RootComponentProps) => {
	const [selectedNode, setSelectedNode] = useState<
		Folder | Project | Task | null
	>(null);

	const handleNodeClick = (node: Folder | Project | Task) => {
		setSelectedNode(node);
		onNodeSelect(node);
	};

	return (
		<div>
			{root.children.map((child) => (
				<NodeComponent
					key={child.id}
					node={child}
					onNodeClick={handleNodeClick}
					selectedNode={selectedNode}
				/>
			))}
		</div>
	);
};

export default RootComponent;
