import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as gen from 'gen-engine';
import { useSetRecoilState, useRecoilValue  } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';
import access, { translate } from 'plugins/access';
 
import { inspectorState } from './tree/atoms';
import { Typography, Tooltip, Icon } from '@material-ui/core';
import { isUndefined } from 'lodash';
 
import WidgetHeader from 'plugins/tools/WidgetHeader';
import Inspector from './Inspector';

window.gen = gen;

const Widget = styled.div`
	height: 50%;
	display: flex;
	flex-direction: column;
	margin-bottom: 10;
	transition: all .15s ease-in-out;
`;

const WidgetCont = styled.div`
	width: 100%;
	flex: 1;
	overflow: auto;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${access.color('borders.primary')};
	border-radius: 4px;
	    align-items: center;
    display: flex;
    flex-direction: column;
`;

const FieldListItem = styled(Typography)`
	cursor: pointer;
	position: relative;
    color: #333;
    //border-left: 5px solid ${ props => props.selected ? '#bac4ce': 'transparent' };
    background: ${ access.color('backgrounds.light') };
	display: flex;
    align-items: center;
    margin: 10px 0 0 !important;
    min-height: 35px !important;
    height: 35px !important;
	width: 80%;
	border-radius: 4px;
	padding: 0 10px;
	font-size: .85rem !important;
	:hover {
		//border-top-left-radius: 0px;
		//border-bottom-left-radius: 0px;
		//border-left: 5px solid #bac4ce;
		background: ${ access.color('backgrounds.code') };
	}
`;

const PreviewIcon = styled(Icon)`
	position: absolute;
	right: 25px;
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

	${FieldListItem}:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;

const FieldsBox = () => {

	const [fields, setFields] = useState([]);
	const setInspectorData = useSetRecoilState(inspectorState);
	const schema = useRecoilValue(selectedSchema); 

	const getFields =  async () => {
		if (!schema || !schema.schemaJson) {
			setFields([]);
			return;
		}
		const res = Object.keys(schema.schemaJson);
		setFields(res); 
	};

	useEffect(() => {
		getFields();
	}, [schema]);

	const handleOnPreview = async (e, field) => {
		e.stopPropagation();
		console.log(schema.schemaJson);
		const field_value = schema.schemaJson[field];
		const type = field_value.type;
		//const generatedValue = await gen.generate({ [field]: field_value }, 1)[0];
		//const generatorType = await gen.types.getTypeByKey(type);

		const item = {
			key: field,
			type: field_value
		};

		setInspectorData(item);
	};
	const handleCloseInspector = e => {
		setInspectorData({});
	};
	const renderField = field => field === 'empty' ? null : (
		<FieldListItem key={field} onClick={e => handleOnPreview(e, field)} >
			{ field }
			<Tooltip title={ translate('Preview') }>
				<PreviewIcon fontSize={ 'small' } onClick={ e => handleOnPreview(e, field) } >ondemand_video</PreviewIcon>
			</Tooltip>
		</FieldListItem>
	);

	if (!schema || isUndefined(schema)) return null;

	return (
		<Widget>
			<WidgetHeader title={schema.name} icon={'playlist_add'} onIconClick={e => handleOnPreview(e, 'empty') }/>
			<WidgetCont>
				{ fields && fields.map(renderField) }
			</WidgetCont>

			<Inspector onClose={ handleCloseInspector }/>
		</Widget>
	);
};

export default FieldsBox;
