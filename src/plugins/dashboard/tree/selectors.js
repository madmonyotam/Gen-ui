import { selector } from 'recoil'; 
import { selectedProjectId, projectListState, projectUsersState } from './atoms';
import { modifyAllContributeByDate, sumAllContribute } from 'plugins/dashboard/adapters/contributes';


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

export const contributeByDate = selector({
	key: 'contributeByDate',
	get: ({ get }) => {
		const users = get(projectUsersState);

		return modifyAllContributeByDate(users);
	}
});

export const collaborators = selector({
	key: 'collaborators',
	get: ({ get }) => {
		const users = get(projectUsersState);

		const modifyUsers = users.map((user) => {
			const modify = { ...user };
			modify.contribute = sumAllContribute(user.contribute);
			return modify;
		});
		
		return modifyUsers;
	}
});



