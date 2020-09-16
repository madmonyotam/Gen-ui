import { selector } from 'recoil'; 
import { selectedProjectId, projectListState } from './atoms';


export const normalizedProject = selector({
	key: 'normalizedProject',
	get: ({ get }) => {
		const list = get(projectListState).reduce((obj, project) => {
			const newObject = { ...obj, [project.id]: project };
			return newObject;
		}, {});
		
		return list;

	}
});

export const selectedProject = selector({
	key: 'selectedProject',
	get: ({ get }) => {
		const id = get(selectedProjectId);
		const projects = get(normalizedProject);
		return projects[id];
	}
});

