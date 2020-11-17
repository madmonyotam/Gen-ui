import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import access, { translate } from 'plugins/access';

import { Typography, Icon, Tooltip } from '@material-ui/core';

import { selectedLibId, librariesState } from 'plugins/project/tree/atoms';
import actions from 'plugins/project/actions';

const LibraryCard = styled.div`
	position: relative;
	cursor: pointer;
	color: #333;
	box-shadow: ${props => props.selected ? '0px 0px 12px -5px rgba(0, 0, 0, 0.2)' : 'none'};
	text-shadow: ${props => props.selected ? '-.5px -.5px 1px #fefefe' : '.5px .5px 1px #fefefe'};
	border:  1px solid rgba(186,196,206, ${props => props.selected ? '0.25' : '0.15'});
	padding: 5px 10px;
	margin-bottom: 10px;
	border-radius: 4px;
	height: 25px;
	display: flex;
	/* flex-direction: column; */
	background: ${props => props.selected ? access.color('colors.blueLight03') : access.color('backgrounds.code')} ;
	transition: all 0.15s ease-in-out;
`;



const DeleteIcon = styled(Icon)`
	position: absolute;
	right: 10px;
	top: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: all 0.05s linear;
	transform: scale(0.95) translate3d(0, -50%, 0);
	transform-origin: center center;
	color: #777;
	opacity: 0;

	${ LibraryCard }:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;



const LiraryListItem = ({ library }) => {

	const [selectedId, setLibId] = useRecoilState(selectedLibId);
	const [libraries, setLibraries] = useRecoilState(librariesState);
	const selected = selectedId === library.id;

	const { libsActions: { removeLibrary } } = actions;

	const handleSelect = () => {
		if (selected) return;
		setLibId(library.id); 
	};

	const deleteLibrary = async e => {
		e.stopPropagation();
		const success = await removeLibrary(library.id, library.createdBy);
		if (success) {
			const list = libraries.filter(l => l.id !== library.id);
			setLibraries(list);
		}
	};

	return (
		<LibraryCard onClick={ handleSelect } selected={ selected } >

			{/* <div style={{ display: 'flex', alignItems: 'center' }} > */}
			<Icon fontSize={'small'} >{selected ? 'folder_open' : 'folder'}</Icon>
			<Typography style={{ marginLeft: 5, fontSize: 15, color: '#333' }} >
				{library.name}
			</Typography>
			{/* </div> */}
			<Tooltip title={translate('Delete')}>
				<DeleteIcon fontSize={'small'} onClick={deleteLibrary}>delete</DeleteIcon>
			</Tooltip>
		</LibraryCard>
	);
};

LiraryListItem.propTypes = {
	library: PropTypes.object
};

LiraryListItem.defaultProps = {
	library: {}
};

export default LiraryListItem;
