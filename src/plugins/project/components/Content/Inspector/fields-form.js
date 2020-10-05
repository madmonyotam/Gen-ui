import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Icon } from '@material-ui/core';

const Form = styled.div`
    margin: 0px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px 20px;
`;


const Input = styled.input`
	font-family: 'Roboto'; 
	border: none;
	border-bottom: 1px solid #444; 
	font-size: 14px; 
	outline: 0; 
	text-transform: capitalize;
	background: transparent;
	width: 100%; 
	height: 30px; 	
	padding: 4px 0 4px 10px;
	background: ${access.color('backgrounds.hover')};
    border-radius: 4px;
	border: 1px solid ${access.color('colors.blueLight02')};
`;

const TitleWrap = styled.div`
	color: ${ access.color('backgrounds.primary') };
	display: flex;
	align-items: center;
	font-size: 15px;
	margin-bottom: 10px;
`;

const Label = styled.label`
    font-family: Cabin;
    font-size: 1rem;
    margin-left: 5px;
    text-transform: capitalize;
`;

const InputWrap = styled.div`
    padding: 10px 0;
	display: flex;
	flex-direction: column; 
`;

const FieldsForm = (props) => {
	
	let default_fields = [
		{ name: 'name', icon: 'short_text'}, 
		{ name: 'group', icon: 'grain' },
		{ name: 'type', icon: 'sources'}, 
		{ name: 'size', icon: 'swap_vert'},
		{ name: 'prefix', icon: 'skip_next'},
		{ name: 'suffix', icon: 'skip_previous'},
	];

	const [fields, setFields] = useState(default_fields);

	const handleNewname = () => {};

	const handleEnterKey = () => {};

	useEffect(() => {
		//const keys = Object.keys(props.data);
		let newFields = fields.map(f => {
			if (props.data[f.name]) f = {...f, value: props.data[f.name] };
			return f;
		});
		setFields(newFields);

	},[props.fieldKey]);

	const FieldInput = (field) => {
		const key = field['name']; 
		return (
			<InputWrap key={key}>

				<TitleWrap>
					<Icon fontSize={ 'small' } >{ field.icon }</Icon>
					<Label htmlFor={ key } >{field.name}</Label>
				</TitleWrap>

				<div style={{ display: 'flex' }} >
					<Input
						name={key}
						onChange={handleNewname}
						onKeyUp={ handleEnterKey }
						value={field.value}
						placeholder={field.value}
						autoFocus={true} /> 
				</div>
			</InputWrap>
		);
	};

	return (
		<Form>
			{fields.map(FieldInput) }
		</Form>
	);

};
FieldsForm.propTypes = {
	fieldKey: PropTypes.string,
	data: PropTypes.object
};
export default FieldsForm;
