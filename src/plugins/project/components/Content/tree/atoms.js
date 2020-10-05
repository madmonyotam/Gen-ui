import { atom } from 'recoil';

export const inspectorState = atom({
	key: 'inspectorState',
	default: {}
});

export const typesState = atom({
	key: 'typesState',
	default: []
});

export const generatedDataState = atom({
	key: 'generatedDataState',
	default: ''
});

export const generateAmountState = atom({
	key: 'generateAmountState',
	default: 5
});
