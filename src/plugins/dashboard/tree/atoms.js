import { atom } from 'recoil';

export const projectState = atom({
	key: 'projectState',
	default: {}
});

export const listState = atom({
	key: 'listState',
	default: []
});

export const projectUsersList = atom({
	key: 'projectUsersList',
	default: []
});