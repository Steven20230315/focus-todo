import { Node, Root, Folder, Project, Task } from './Test';
import { createContext, useContext } from 'react';


type WorkManagerContextType = {
	root: Root;
};

const WorkManagerContext = createContext<WorkManagerContextType>({
	root: new Root(),
});
