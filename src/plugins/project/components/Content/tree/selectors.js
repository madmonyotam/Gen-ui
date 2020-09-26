import { selector } from 'recoil';
import { typesState } from './atoms';
import { groupBy } from 'lodash';

export const countedTypes = selector({
	key: 'countedTypes',
	get: ({ get }) => {
		const types = get(typesState);
		const grouped = groupBy(types);
		let mapped = [];
		Object.keys(grouped).map( (key, i) => {
			mapped.push({
				key: key,
				count: grouped[key].length
			});
		});
		return mapped;
	}
	
});
