import { atom, selector } from 'recoil';

export const Project = atom({
	key: 'projectState',
	default: {}
});

export const ProjectList = atom({
	key: 'projectListState',
	default: []
});
