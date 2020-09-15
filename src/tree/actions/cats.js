import * as gen from 'gen-engine';
import { get } from 'plugins/requests';
import { updateSchemasOnEngine } from 'tree/actions/engine';

function setCatToSelected(tree,cat) {
	tree.set(['selectedCategory'], cat);
}

export function generateFromCat(tree,category, amount = 1) {
	const library = tree.get(['focus', 'lib']);

	const data = gen.generate([library, category],amount);
	tree.set('mockData',data);
}

export function setCats(tree, cats) {
	tree.set(['cats'], cats);
}

export function setCatToFocus(tree, cat) {
	tree.set(['focus', 'cat'], cat);

	if(cat){
		setCatToSelected(tree,cat);
	}
}

export function addCategory(tree, category) {
	const library = tree.get(['focus', 'lib']);

	get('/addCategory', { library, category })
		.then(res => {
			tree.set('cats', res.data);
			updateSchemasOnEngine();
		})
		.catch(err => {
			console.log(err.response.data.message);
		});
}

export function editCategory(tree, data) {
	const library = tree.get(['focus', 'lib']);
	const selectedCategory = tree.get('selectedCategory');
	const {oldName, newName} = data;

	get('/editCategory', {library, oldName, newName }).then(res => {
		tree.set('cats', res.data);
		updateSchemasOnEngine();

		if(selectedCategory === oldName){
			tree.set('selectedCategory', newName);
		}
	});
}

export function removeCategory(tree, category) {
	const library = tree.get(['focus', 'lib']);

	get('/removeCategory', { library, category }).then(res => {
		tree.set('cats', res.data);
		updateSchemasOnEngine();
	});
}

export function getItemsFromCategory(tree, category) {
	const library = tree.get(['focus', 'lib']);

	get('/getSchema', { library, category }).then(res => {
		tree.set('items', res.data);
		setTimeout(() => {
			tree.set(['focus', 'cat'], category);
			setCatToSelected(tree,category);
			generateFromCat(tree,category);
		});
	});
}

export function setKey(tree, { newKey }) {
	const viewKey = tree.get('viewKey');
	
	if(viewKey !== newKey){
		tree.set('viewKey',newKey);
	}
}
