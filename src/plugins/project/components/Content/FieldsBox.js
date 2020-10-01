import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as gen from 'gen-engine';
import { useRecoilState, useRecoilValue, /*useSetRecoilState*/ } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';
import * as access from 'plugins/access';

// import { typesState } from './tree/atoms';
// import { countedTypes } from './tree/selectors';
// import { getTypesFromSchema } from './utils';

import { fieldDrawerState } from 'plugins/project/tree/atoms';
import { Typography, Tooltip, Icon,  Button } from '@material-ui/core';
import { isUndefined } from 'lodash';

// import { filter, groupBy } from 'lodash';
// import { get } from 'plugins/requests';

import WidgetHeader from 'plugins/tools/WidgetHeader';

const Typo = styled(Typography)`
	cursor: pointer;
	position: relative;
    color: #333;
    border-left: 5px solid transparent;
	display: flex;
    align-items: center;
    margin: 10px 0 !important;
    height: 35px;
    padding: 5px 0 0 10px;
	font-size: .85rem !important;
	:hover {
	    border-left: 5px solid #bac4ce;
		background: ${ access.color('backgrounds.light') };
	}
`;

window.gen = gen;

const WidgetCont = styled.div`
	width: 100%;
	flex: 1;
	overflow: auto;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${access.color('borders.primary')};
	border-radius: 4px;
`;


const PreviewIcon = styled(Icon)`
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

	${Typo}:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;



const FieldsBox = () => {
	const [fields, setFields] = useState([]);
	const [fieldDrawerId, setFieldDrawer] = useRecoilState(fieldDrawerState);
	// const setTypes = useSetRecoilState(typesState);
	const schema = useRecoilValue(selectedSchema);
	// const legend = useRecoilValue(countedTypes);
	// console.log('legend', legend);

	const getFields =  async () => {
		if (!schema || !schema.schemaJson) {
			setFields([]);
			return;
		}
		const res = Object.keys(schema.schemaJson);
		setFields(res);
		console.debug({
			'gen.types >> ': gen.types
		});
		console.log('gen->types->getTypesArrangeByGroups >>', gen.types.getTypesArrangeByGroups());
		// const types = await getTypesFromSchema(schema.schemaJson);
		// setTypes(types);
	};

	useEffect(() => {
		getFields();
	}, [schema]);

	const handleOnPreview = (e, field) => {
		e.stopPropagation();
		alert(field);
	};

	const setDrawerId = field => {
		if (fieldDrawerId === field) setFieldDrawer(null);
		else setFieldDrawer(field);
	};

	const renderField = field => field === 'empty' ? null : (
		<Typo key={ field } onClick={ () => setDrawerId(field) } >
			{ field }
			<Tooltip title={ access.translate('Preview') }>
				<PreviewIcon fontSize={ 'small' } onClick={ e => handleOnPreview(e, field) } >ondemand_video</PreviewIcon>
			</Tooltip>
		</Typo>
	);

	const renderFields = () => {
		let filtered = fields;
		if (fieldDrawerId) {
			filtered = fields.filter(field => field === fieldDrawerId);
		} 
		return (
			<>
				{
					fieldDrawerId ? renderField(fieldDrawerId) : filtered.map(renderField) 
				}
			</>
		);
	};

	if (!schema || isUndefined(schema)) return null;

	return (
		<div style={{
			height: fieldDrawerId ? '65%' : '45%',
			display: 'flex',
			flexDirection: 'column',
			transition: 'all .15s ease-in-out'
		}}>
			<WidgetHeader title={schema.name} icon={ 'playlist_add' } onIconClick={ () => setDrawerId('empty') }/>
			<WidgetCont>
				{renderFields()}
			</WidgetCont>
		</div>
	);
};

export default FieldsBox;
