import * as gen from 'gen-engine';

import { get } from 'plugins/requests';
import { updateSchemasOnEngine } from 'tree/actions/engine';

export function setItems(tree, items) {
	tree.set(['items'], items);
}

export function generate(tree, { items, amount = 1 }) {
	tree.set('mockData', gen.generate(items,amount));
}

export function tempGenerate(items) {
	console.log('items :>> ', items);
	return gen.generate(items,1);
}

function replaceSchema(tree, items) {
	const library = tree.get('selectedLibrary');
	const category = tree.get('selectedCategory');

	get('/replaceSchema', { schema: items, library, category })
		.then(res => {
			tree.set('items', res.data);
			updateSchemasOnEngine();
		})
		.catch(err => {
			//TODO: notify type does not exist
			console.error(err.response);
		});
}

export function onSchemaChange(tree, items) {
	generate(tree, { items, amount: 1 });
	replaceSchema(tree, items);
}

function getValueByRendererType(renderer) {
	switch (renderer.type) {
		case 'number':
			return 10;
		case 'string':
			return renderer.placeholder;
		case 'autocompleteArray':
		case 'array':
			return [];

		default:
			return renderer.placeholder;
	}
}

function getAdditionalFields(type) {
	const { renderer } = type;

	if (!renderer) return {};

	if (renderer.type) {
		return { value: getValueByRendererType(renderer) };
	}

	let AdditionalFields = { value: {} };
	for (const key in renderer) {
		const innerRenderer = renderer[key];
		AdditionalFields.value[key] = getValueByRendererType(innerRenderer);
	}

	return AdditionalFields;
}

export function onAddFromPack(tree, type) {
	get('/getTypeByKey', { type }).then(res => {
		const additionalFields = getAdditionalFields(res.data);
		const num = Math.floor(Math.random() * 100);

		let items = { ...tree.get('items') };
		items[`${type}-${num}`] = {
			type: type,
			...additionalFields
		};

		onSchemaChange(tree, items);
	});
}

export function changeDragState(tree, value) {
	tree.set('drag', value);
}

export function setItemToFocus(tree, item) {
	tree.set(['focus', 'item'], item);
}

export function setSelected(tree, item) {
	const cat = tree.get(['focus', 'cat']);
	tree.set(['selected'], `${cat}:${item}`);
}

export function editItem(tree, data) {
	const library = tree.get(['focus', 'lib']);
	const category = tree.get(['focus', 'cat']);

	const {oldName, newName} = data;

	get('/editItem', {library, category, oldName, newName }).then(res => {
		tree.set('items', res.data);
		updateSchemasOnEngine();
	});
}

export function addItem(tree, value) {
	const library = tree.get(['focus', 'lib']);
	const category = tree.get(['focus', 'cat']);

	const field = JSON.stringify({[value]:{}}, null, 2);

	get('/addItem', { library, category, field })
		.then(res => {
			tree.set('items', res.data);
			updateSchemasOnEngine();
		})
		.catch(err => {
			console.error(err.response);
		});
}

export function removeItem(tree, field) {
	const focus = tree.get(['focus']);
	const library = focus.lib;
	const category = focus.cat;

	get('/removeFromSchema', { library, category, field }).then(res => {
		tree.set('items', res.data);
		updateSchemasOnEngine();
		generate(tree, { items: res.data, amount: 1 });
	});
}
