import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as access from 'plugins/access';

import { Typography, Icon, Tooltip } from '@material-ui/core';

import { selectedSchemaId, schemasState } from 'plugins/project/tree/atoms'; 
import actions from 'plugins/project/actions';

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

	${ ListItem }:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;



const SchemaListItem = ({ item }) => {
	const [selectedId, setSchemaId] = useRecoilState(selectedSchemaId);
	const [schemas, setSchemas] = useRecoilState(schemasState);

	const selected = item.schemaId === selectedId;
	const numFields = item.schemaJson ? Object.keys(item.schemaJson).length : 0;

	const { schemasActions: { removeSchema } } = actions;

	const deleteSchema = async e => {
		e.stopPropagation();
		const success = await removeSchema(item.schemaId, item.createdBy);
		if (success) {
			const list = schemas.filter(s => s.schemaId !== item.schemaId);
			setSchemas(list);
		}
	};

	return (
		<ListItem selected={ selected } onClick={ () => setSchemaId(item.schemaId) }>
			<Typography style={{ marginBottom: 5, fontSize: 14, color: '#333' }} >
				{item.name}
			</Typography>
			<Typography style={{ fontSize: 12, color: '#777' }}>{numFields} Fields</Typography>

			<Tooltip title={ access.translate('Delete') }>
				<DeleteIcon fontSize={'small'} onClick={deleteSchema}>delete</DeleteIcon>
			</Tooltip>
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
