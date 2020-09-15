import { selector, selectorFamily } from 'recoil'; 
import { getProjects, getProjectUsers } from '../actions';
// import { listState } from './atoms';

export const projectList = selectorFamily({
	key: 'projectList',
	get: email => async () => {
		const response = await getProjects(email);
		return response;
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