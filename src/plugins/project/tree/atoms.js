import { atom } from 'recoil';

export const projectState = atom({
	key: 'projectState',
	default: undefined
});

export const librariesState = atom({
	key: 'librariesState',
	default: []
});

export const schemasState = atom({
	key: 'schemasState',
	default: []
});

export const selectedLibId = atom({
	key: 'selectedLibId',
	default: undefined
});


export const selectedSchemaId = atom({
	key: 'selectedSchemaId',
	default: undefined
});

