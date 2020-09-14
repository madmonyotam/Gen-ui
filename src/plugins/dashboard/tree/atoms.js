import { atom } from 'recoil';

export const projectState = atom({
	key: 'projectState',
	default: {}
});

export const projectListState = atom({
	key: 'projectListState',
	default: []
});

