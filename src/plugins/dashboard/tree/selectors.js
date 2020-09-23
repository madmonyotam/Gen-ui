import { sortBy } from 'lodash';
import { selector } from 'recoil'; 
import { selectedProjectId, projectListState, projectUsersState, librariesState } from './atoms';
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
		const users = get(projectUsersState) || []; //TODO handle Error

		return modifyAllContributeByDate(users);
	}
});

export const collaborators = selector({
	key: 'collaborators',
	get: ({ get }) => {
		const users = get(projectUsersState) || []; //TODO handle Error

		const modifyUsers = users.map((user) => {
			const modify = { ...user };
			modify.contribute = sumAllContribute(user.contribute);
			return modify;
		});
		
		return sortBy(modifyUsers,'contribute').reverse();
	}
});

export const librariesForPack = selector({
	key: 'librariesForPack',
	get: ({ get }) => {
		const libs = get(librariesState);
		const modifiedLibs = modifyLibsToPack(libs);

		return modifiedLibs;
	}
});

const modifyLibsToPack = (libs) => {
	
	const modifyData = {
		name: 'project',
		value: 1,
		children: [],
		id: 'project',
		level: 0
	};

	libs.forEach(lib => {

		const schemasValue = Math.random() * 100;   // lib.schemas.length;

		const modifedLib = {
			name: lib.name,
			nameKey: lib.name,
			value: 1 + schemasValue,
			children: [],
			id: lib.id,
			level: 1
		};

		modifyData.value += modifedLib.value;
		modifyData.children.push(modifedLib); 
	});

	return modifyData;
};



