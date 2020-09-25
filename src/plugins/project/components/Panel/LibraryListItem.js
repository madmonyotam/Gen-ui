import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as access from 'plugins/access';

import { Typography, Icon } from '@material-ui/core';

import { selectedLibId } from 'plugins/project/tree/atoms';

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
	flex-direction: column;
	background: ${props => props.selected ? access.color('colors.blueLight03') : access.color('backgrounds.code')} ;
	transition: all 0.15s ease-in-out;
`;


const LiraryListItem = ({ library }) => {

	const [selectedId, setLibId] = useRecoilState(selectedLibId);
	const selected = selectedId === library.id;
	const handleSelect = () => {
		if (selected) return;
		setLibId(library.id); 
	}
	return (
		<LibraryCard onClick={ handleSelect } selected={ selected } >

			<div style={{ display: 'flex', alignItems: 'center' }} >
				<Icon fontSize={'small'} >{selected ? 'folder_open' : 'folder'}</Icon>
				<Typography style={{ marginLeft: 5, fontSize: 15, color: '#333' }} >
					{library.name}
				</Typography>
			</div>
			
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
