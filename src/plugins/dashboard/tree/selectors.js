import { selector } from 'recoil';
import { getProjects } from '../actions';

export const projectList = selector({
	key: 'projectList',
	get: async () => {
		const email = localStorage.getItem('gen-user-email');
		const response = await getProjects(email);
		return response;
	}
}); 