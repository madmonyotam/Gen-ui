import { selector } from 'recoil';
import { selectedLibId, librariesState, selectedSchemaId, schemasState } from './atoms';

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


export const normalizedSchema = selector({
	key: 'normalizedSchema',
	get: ({ get }) => {
		const list = get(schemasState).reduce((obj, schema) => {
			const newObject = { ...obj, [schema.schemaId]: schema };
			return newObject;
		}, {});

		return list;

	}
});

export const selectedSchema = selector({
	key: 'selectedSchema',
	get: async ({ get }) => {
		const id = get(selectedSchemaId);
		const schemas = get(normalizedSchema);
		return schemas[id];
	}
});

