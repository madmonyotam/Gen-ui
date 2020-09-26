export const getTypesFromSchema = json => {
	const vals = Object.values(json, item => item.type);
	const listed = vals.map(it => it.type);
	return listed ;
}