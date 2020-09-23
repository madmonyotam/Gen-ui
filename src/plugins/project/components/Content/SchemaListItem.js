import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as access from 'plugins/access';

import { Typography, Icon } from '@material-ui/core';

import { selectedSchemaId } from 'plugins/project/tree/atoms'; 

const ListItem = styled.div`
	position: relative;
	cursor: pointer;
	color: #333;
	border-left:  5px solid ${ props => props.selected ? access.color('colors.blueLight03') : 'transparent' };
	padding-left: ${ props => props.selected ? '10px' : '5px' };
	height: 55px;
	display: flex;
	flex-direction: column; 
	align-items: flex-start; 
	flex: 1; 
	justify-content: center;
	transition: all 0.15s ease-in-out;
	:hover {
		border-color: ${ props => props.selected ? access.color('colors.blueLight03') : 'transparent' };
		background: ${ access.color('backgrounds.light') };
	}
`;


const SchemaListItem = ({ item }) => {
	const [selectedId, setSchemaId] = useRecoilState(selectedSchemaId);
	const selected = item.schemaId === selectedId;

	return (
		<ListItem selected={ selected } onClick={ () => setSchemaId(item.schemaId) }>
			<Typography style={{ marginBottom: 5, fontSize: 14, color: '#333' }} >
				{item.name}
			</Typography>
			<Typography style={{ fontSize: 12, color: '#666' }}>3 Fields</Typography>
		</ListItem>
	);
};

SchemaListItem.propTypes = {
	item: PropTypes.object
};

SchemaListItem.defaultProps = {
	item: {}
};

export default SchemaListItem;
