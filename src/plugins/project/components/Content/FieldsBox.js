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
import DataBox from 'plugins/dashboard/components/project/metadata/data-box';
import WidgetHeader from 'plugins/tools/WidgetHeader';
// import { filter } from 'lodash';

// import { get } from 'plugins/requests';
// import { groupBy } from 'lodash';
window.gen = gen;

const WidgetCont = styled.div`
	width: 100%;
	flex: 1;
	overflow: hidden;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${access.color('borders.primary')};
	border-radius: 4px;
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

	const setDrawerId = field => {
		if (fieldDrawerId === field) setFieldDrawer(null);
		else setFieldDrawer(field);
	};

	const renderField = field => (
		<Button 
			style={{ height: 25, margin: '0 10px 10px 0' }} 
			onClick={ () => setDrawerId(field) } 
			size={'small'} 
			disableElevation
			color={field === fieldDrawerId ? 'secondary' : 'primary' }
			variant={field === fieldDrawerId ?'contained':'text' }
			key={field}>
			{ field }
		</Button>
	);

	const renderFields = () => {
		let filtered = fields;
		if (fieldDrawerId) {
			filtered = fields.filter(field => field === fieldDrawerId);
		} 
		return (
			<div style={{ flex: 1 }} >
				{
					fieldDrawerId ? renderField(fieldDrawerId) : filtered.map(renderField) 
				}
			</div>
		);
	};

	if (!schema || isUndefined(schema)) return null;

	return (
		<div style={{
			flex: fieldDrawerId ? .65 : .4,
			display: 'flex',
			flexDirection: 'column',
			// height: fieldDrawerId ? '50%' : 120,
			// transition: 'box-shadow .25s ease-in-out',
			transition: 'all .15s ease-in-out',

			// width: 'calc(50% - 15px)',
			//borderTop: fieldDrawerId ? '1px transparent' : '1px solid rgba(221,221,221,.75)',
			boxShadow: fieldDrawerId ? 'rgba(0, 0, 0, 1) 0px -2px 23px -35px' : 'unset',
		}}>
			<WidgetHeader title={schema.name} icon={ 'playlist_add' } onIconClick={ () => setDrawerId('empty') }/>
			<WidgetCont>
				{renderFields()}
			</WidgetCont>
		</div>
	);
};

export default FieldsBox;
