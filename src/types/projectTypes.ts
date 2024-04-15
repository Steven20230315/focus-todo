import { type UUID } from './taskTypes';

export type Project = {
	title: string;
	id: UUID;
	parentId?: UUID;
	tasks: UUID[];
};
