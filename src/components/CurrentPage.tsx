import React from 'react';
import { Project } from '../context/Test';

type CurrentPageProps = {
	project: Project;
};

export default function CurrentPage({ project }: CurrentPageProps) {
	return <div>{project.title}</div>;
}
