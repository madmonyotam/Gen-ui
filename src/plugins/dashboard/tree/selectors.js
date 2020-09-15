import { selector } from 'recoil'; 
import { projectListState } from './atoms';

export const existingProjectNames = selector({
	key: 'existingProjectNames',
	get: ({ get }) => {
		const list = get(projectListState);
		return list.map(proj => proj.name.toLowerCase());
	},
	// set: ({ set }, newList) => {
	// 	set(listState, )
	// }
});  

/*
export const projectUsersList = selectorFamily({
	key: 'projectUsersList',
	get: projectId => async () => {

	}
});*/