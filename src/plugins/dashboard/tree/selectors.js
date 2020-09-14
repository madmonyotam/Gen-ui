import { selector, selectorFamily } from 'recoil'; 
import { getProjects, getProjectUsers } from '../actions';
import { listState } from './atoms';

export const projectList = selector({
	key: 'projectList',
	get: async () => {
		const email = localStorage.getItem('gen-user-email');
		const response = await getProjects(email);
		return response;
	} 
}); 

export const existingNames = selector({
	key: 'existingNames',
	get: ({ get }) => {
		const list = get(listState);
		const existingProjects = list.map(proj => proj.name.toLowerCase());
		return existingProjects;
	}
});

// export const projectUsersList = selector({
// 	key: 'projectUsersList',
// 	get: ({ get }) => {

// 	}
// });