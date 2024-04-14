import { v4 as uuidv4 } from 'uuid';

class Node {
	public id: string;
	// Make role immutable and publicly readable
	public readonly role?: 'root' | 'folder' | 'project' | 'task';
	public children: Node[];

	constructor(
		role: 'root' | 'folder' | 'project' | 'task',
		public title: string
	) {
		this.id = uuidv4();
		this.role = role;
		this.title = title;
		this.children = [];
	}

	public add(node: Node) {
		this.children.push(node);
	}

	public remove(node: Node) {
		this.children = this.children.filter((child) => child !== node);
	}
}

export class Root extends Node {
	constructor() {
		super('root', 'Root');
	}
	public updateProjectTitle(projectId: string, newTitle: string) {
		const project = this.findNode(projectId);
		if (project && project.role === 'project') {
			project.title = newTitle;
		}
	}

	public addTaskToProject(projectId: string, title: string, time: number) {
		const project = this.findNode(projectId);
		if (project && project.role === 'project') {
			const task = new Task(title, time, project as Project);
			project.add(task);
		}
	}

	public findNode(id: string): Node | undefined {
		// A recursive function to find a node by id
		function search(node: Node): Node | undefined {
			if (node.id === id) return node;
			for (const child of node.children) {
				const result = search(child);
				if (result) return result;
			}
		}
		return search(this);
	}
}

export class Folder extends Node {
	constructor(title: string, public parent: Root) {
		super('folder', title);
		if (parent && parent.role !== 'root') {
			throw new Error('Parent must be a root node');
		}
	}
}

export class Project extends Node {
	constructor(title: string, public parent?: Folder | Root) {
		super('project', title); // Pass 'project' as the role to the superclass
		if (parent && parent.role !== 'root' && parent.role !== 'folder') {
			throw new Error(
				"Parent of Project must be a Node with role 'root' or 'folder'"
			);
		}
	}
	updateTitle(newTitle: string) {
		this.title = newTitle;
	}

	addTask(title: string, time: number) {
		const task = new Task(title, time, this);
		this.add(task);
	}
}

export class Task extends Node {
	constructor(title: string, public time: number, public parent: Project) {
		super('task', title); // Pass 'task' as the role to the superclass
		if (parent && parent.role !== 'project') {
			throw new Error("Parent of Task must be a Node with role 'project'");
		}
	}
}
