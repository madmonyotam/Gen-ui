import { selector } from 'recoil';
import { selectedLibId, librariesState } from './atoms';


export const normalizedLib = selector({
	key: 'normalizedLib',
	get: ({ get }) => {
		const list = get(librariesState).reduce((obj, lib) => {
			const newObject = { ...obj, [lib.id]: lib };
			return newObject;
		}, {});

		return list;

	}
});

export const selectedLibrary = selector({
	key: 'selectedLibrary',
	get: ({ get }) => {
		const id = get(selectedLibId);
		const libraries = get(normalizedLib);
		return libraries[id];
	}
});

