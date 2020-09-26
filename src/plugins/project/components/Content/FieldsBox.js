import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';

import { typesState } from './tree/atoms';
import { countedTypes } from './tree/selectors';
import { getTypesFromSchema } from './utils';

import { fieldDrawerState } from 'plugins/project/tree/atoms';
import { Typography, Button } from '@material-ui/core';
import Badge from 'plugins/tools/Badge';

// import { get } from 'plugins/requests';
// import { groupBy } from 'lodash';

const Grid = styled.div`
    display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	flex: 1; 
    padding-right: 10px;
    overflow: auto;
    height: calc(100% - 45px);

`;

const Box = styled.div`
	position: relative;
	color: #333;
	text-shadow: .5px .5px 1px #fefefe;
	padding: 5px 0;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Counter = styled.div`
	font-size: .7rem;
    border: 1px solid #dcdcdc;
    margin-left: 5px;
    padding: .5em;
    border-radius: 4px;
	background: white;
`;

const FieldsBox = () => {
	const [fields, setFields] = useState([]);
	const setFieldDrawer = useSetRecoilState(fieldDrawerState);
	const setTypes = useSetRecoilState(typesState);
	const schema = useRecoilValue(selectedSchema);
	const legend = useRecoilValue(countedTypes);
	console.log('legend', legend);

	const getFields =  async () => {
		if (!schema || !schema.schemaJson) return;
		const res = Object.keys(schema.schemaJson);
		setFields(res);
		const types = await getTypesFromSchema(schema.schemaJson);
		setTypes(types);
	};


	useEffect(() => {
		getFields();
	}, [schema]);

	const renderField = field => (
		<Button 
			style={{ height: 25, margin: '0 10px 10px 0' }} 
			onClick={ () => setFieldDrawer(field) } 
			size={'small'} 
			variant={'outlined'} 
			key={field}>
			{ field }
		</Button>
	);

	if (!schema || !schema.schemaJson) return null;

	return (
		<div style={{
			height: 120,
			padding: '10px 0 0 10px',
			borderTop: '1px solid rgba(221,221,221,.75)',
			background: '#f1f1f1'
		}}>
			<Box >
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
						{schema.name}
					</Typography>
					<Badge size={'small'}>{ fields.length }</Badge>
				</div>
				<div style={{ display:'flex', alignItems: 'center', paddingRight: 10 }}>
					{ legend && legend.map(l => <Counter key={ l.key }>{ l.key } { l.count }</Counter> ) }
				</div>
			</Box>
			<Grid>
				{ fields.map(renderField) }
			</Grid>
		</div>
	);
};

export default FieldsBox;