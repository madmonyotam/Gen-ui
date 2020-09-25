import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';
import { Typography, Button } from '@material-ui/core';

const Box = styled.div`
	position: relative;
	color: #333;
	text-shadow: .5px .5px 1px #fefefe;
	padding: 5px 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;


const FieldsBox = () => {
	const [fields, setFields] = useState([]);
	const schema = useRecoilValue(selectedSchema);

	const getFields =  () => {
		if (!schema || !schema.schemaJson) return;
		const res = Object.keys(schema.schemaJson);
		setFields(res);
	};

	useEffect(() => {
		getFields();
	}, [schema]);

	if (!schema || !schema.schemaJson) return null;

	return (
		<div style={{
			height: 120,
			padding: '10px 0 0',
			borderTop: '1px solid rgba(221,221,221,.75)',
			background: '#f1f1f1'
		}}>
			<Box >
				<Typography style={{ flex: 1, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
					{schema.name}
				</Typography>
			</Box>
			<div>
				{ fields.map(f => <Button size={ 'small' } variant={ 'outlined' } key={ f }>{f}</Button>) }
			</div>
		</div>
	);
};

export default FieldsBox;