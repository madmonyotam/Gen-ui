import { atom } from 'recoil';

export const selectedProjectId = atom({
	key: 'selectedProjectId',
	default: undefined
});

export const projectListState = atom({
	key: 'projectList',
	default: []
});

export const projectUsersState = atom({
	key: 'projectUsersState',
	default: []
});

export const librariesPackState = atom({
	key: 'librariesPackState',
	default: []
});


