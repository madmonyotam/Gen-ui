/* eslint-disable no-fallthrough */
import React, { useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBranch } from 'baobab-react/hooks';

import * as access from 'plugins/access';
import styled from 'styled-components';

import Column from 'plugins/Layouts/Column';
import SearchBar from 'plugins/menuPanel/SearchBar';
import ListItem from 'plugins/menuPanel/ListItem';
import AddRow from 'plugins/menuPanel/AddRow';
import BottomBarMenu from 'plugins/menuPanel/BottomBarMenu';
import Inspector from 'plugins/menuPanel/inspector/Inspector';

import * as libsActions from 'tree/actions/libs';
import * as catsActions from 'tree/actions/cats';
import * as itemsActions from 'tree/actions/items';
// import { get } from "plugins/requests";
import Request from 'plugins/request';

//import useFetch from 'plugins/request/useFetch'


const CollapseColumn = styled(Column)`
  min-width: 50px;
  transition: flex ${access.time('schemaPanel.collapse')}ms;
  overflow-x: hidden;
`;

function LeftPanel({ viewKey }) {
	const { libs, dispatch } = useBranch({ libs: ['libs'] });
	const { projectName } = useBranch({ projectName: ['projectName'] });
	const { cats } = useBranch({ cats: ['cats'] });
	const { items } = useBranch({ items: ['items'] });
	const { focus } = useBranch({ focus: ['focus'] });
	const { collapse } = useBranch({ collapse: ['collapse'] });

	// const stableDispatch = useCallback(dispatch, []); 

	// const [res, setFetch] = useFetch();
	// console.log(res)
	//const [res, onChange] = useFetch('/getAllLibraries');

	// useEffect(() => {
	//   Request.get('/getAllLibraries')
	//         .then(res => { 
	//           stableDispatch(libsActions.setLibs, res.data);
	//         })
	// }, [stableDispatch]);

	const RenderList = () => {

		const getListOf = () => {
			let listOf = 'libs';
			if(focus.lib){
				listOf = 'cats';
			}
			if(focus.cat){
				listOf = 'items';
			}
			if(focus.item){
				listOf = 'inspector';
			}
    
			return listOf;
		};

		const handleClickOnLib = label => {
			dispatch(libsActions.getCategoriesFromLibrary, label);
		};

		const handleClickOnCat = label => {
			dispatch(catsActions.getItemsFromCategory, label);
			dispatch(catsActions.setKey, { newKey: 'showSchema', schemaName: label });
		};

		const handleClickOnItem = label => {
			dispatch(itemsActions.setItemToFocus, label);
		};

		const handleRemoveLib = label => {
			dispatch(libsActions.removeLib, label);
		};

		const handleRemoveCat = label => {
			dispatch(catsActions.removeCategory, label);
		};

		const handleRemoveItem = label => {
			dispatch(itemsActions.removeItem, label);
		};

		const handleEditLib = (oldName, newName) => {
			dispatch(libsActions.editLib, { oldName, newName });
		};

		const handleEditCat = (oldName, newName) => {
			dispatch(catsActions.editCategory, { oldName, newName });
		};

		const handleEditItem = (oldName, newName) => {
			dispatch(itemsActions.editItem, { oldName, newName });
		};

		switch (getListOf()) {
		case 'libs':
			if (libs) {
				return libs.map(label => (
					<ListItem
						key={label}
						label={label}
						handleRowClick={handleClickOnLib}
						handleRemove={handleRemoveLib}
						handleEdit={handleEditLib}
					/>
				));
			}

		case 'cats':
			console.log('cats ->', cats);
			return cats.map(label => (
				<ListItem
					key={label}
					parent={focus.lib}
					label={label}
					handleRowClick={handleClickOnCat}
					handleRemove={handleRemoveCat}
					handleEdit={handleEditCat}
				/>
			));
		case 'items':
			console.log(items);
			return Object.keys(items).map(label => (
				<ListItem
					key={label}
					parent={focus.cat}
					label={label}
					handleRowClick={handleClickOnItem}
					handleRemove={handleRemoveItem}
					handleEdit={handleEditItem}
				/>
			));
		case 'inspector':
			return <Inspector item={items[focus.item]} />;
		default:
			return null;
		}
	};

	const RenderAddRow = () => {
		let addTo = !focus.lib ? 'libs' : 'cats';
		if (focus.lib) {
			addTo = !focus.cat ? 'cats' : 'items';
		}

		const handleAddLib = value => {
			value = value.trim();
			dispatch(libsActions.addLib, value);
		};

		const handleAddCat = value => {
			value = value.trim();
			dispatch(catsActions.addCategory, value);
		};

		const handleAddItem = value => {
			value = value.trim();
			dispatch(itemsActions.addItem, value);
		};

		switch (addTo) {
		case 'libs':
			return (
				<AddRow
					label={access.translate('Add Library')}
					handleAdd={handleAddLib}
				/>
			);
		case 'cats':
			return (
				<AddRow
					label={access.translate('Add Schema')}
					handleAdd={handleAddCat}
				/>
			);
		case 'items':
			return (
				<AddRow
					label={access.translate('Add Field')}
					handleAdd={handleAddItem}
				/>
			);
		default:
			return;
		}
	};

	const handleBack = () => {
		const { lib, cat, item } = focus;

		if(item) {
			dispatch(itemsActions.setItemToFocus, null);
		} else if (cat) {
			dispatch(catsActions.setCatToFocus, null);
		} else if (lib) {
			dispatch(libsActions.setLibToFocus, null);
		}
	};

	const getLabel = () => {
		const { lib, cat } = focus;
		if (lib && cat) return `${lib} - ${cat}`;
		if (lib) return lib;
		return projectName;
	};

	const getFlex = () => {
		if (collapse) {
			return access.dim('flexCollapse.leftPanel');
		}

		return access.dim('flexViews.leftPanel');
	};

	const zIndex = access.dim('zIndexViews.leftPanel');
	const flex = getFlex();
	const label = getLabel();

	const renderContent = () => {
		if (collapse) {
			return (
				<Fragment>
					<CollapseColumn
						flex={1}
						background={access.color('bottomBar.bg')}
					></CollapseColumn>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<RenderAddRow />
				<Column flex={1}>
					<RenderList />
				</Column>
			</Fragment>
		);
	};

	return (
		<CollapseColumn
			flex={flex}
			zIndex={zIndex}
			background={access.color('menuPanel.bg')}
		>
			<SearchBar label={label} nested={focus.lib} onBack={handleBack} />
			{ renderContent() }
			<BottomBarMenu viewKey={viewKey} />
		</CollapseColumn>
	);
}

LeftPanel.propTypes = {
	viewKey: PropTypes.string.isRequired
};

export default LeftPanel;
