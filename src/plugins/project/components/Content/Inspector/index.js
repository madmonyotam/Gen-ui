import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import { isUndefined, isEmpty } from 'lodash';
import styled from 'styled-components';
import access from 'plugins/access';
import * as gen from 'gen-engine';
import {Divider} from '@material-ui/core';
import FieldsForm from './fields-form';
import { useRecoilValue } from 'recoil';
import {inspectorState} from '../tree/atoms';

const PreviewPopup = styled.div`
	display: flex;
	position: fixed;
	background: rgba(2,2,2,.05);
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
    align-items: center;
    justify-content: center;
	z-index: 8;
`; 

const Code = styled.pre`
	padding: 20px;
    margin: 0px;
	background: ${access.color('backgrounds.code')};
    border-radius: 4px;
	border: 1px solid ${access.color('colors.blueLight02')};
`;

const PopupContent = styled.div`
	background: ${access.color('colors.white')};
	border: 6px solid ${access.color('colors.blueLight03')};
	border-radius: 4px;
	padding: 20px;
	box-shadow: 5px 5px rgba(0, 98, 90, 0.4),
              10px 10px rgba(0, 98, 90, 0.3),
              15px 15px rgba(0, 98, 90, 0.2),
              20px 20px rgba(0, 98, 90, 0.1),
              25px 25px rgba(0, 98, 90, 0.05); 
	height: auto;
    width: 65vh;
`;

const Inspector = props => {
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState({});
	const [generatedValue, setGeneratedValue] = useState({});
	const field = useRecoilValue(inspectorState);
	
	const onClose = () => {
		setIsOpen(false);
		if (props.onClose) props.onClose();
	};

	const validateField = async () => {
		const isValidField = field && !isUndefined(field) && !isEmpty(field);
		if (isValidField) {
			const generatedValue = await gen.generate({ [field.key]: field.type }, 1)[0];
			const generatorType = await gen.types.getTypeByKey(field.type.type);
	
			const formData = {
				name: field.key,
				group: generatorType.group,
				type: generatorType.name,
				size: 0,
			};

			setForm(formData);
			setGeneratedValue(generatedValue);
			setIsOpen(isValidField);
		}
	};

	useEffect(() => {
		validateField();
	}, [field]);

	return !isOpen ? null : (
		<PreviewPopup isOpen={ isOpen } onClick={ onClose }>
			<PopupContent onClick={ e => { e.stopPropagation(); e.preventDefault(); } } isOpen={isOpen}>
				<FieldsForm data={ form }  fieldKey={ field.key } />
				<Divider style={{ margin: '20px auto', width: '50%' }} />
				
				<Code>
					{ JSON.stringify(generatedValue, null, 4) }
				</Code>


			</PopupContent>
		</PreviewPopup>
	);
};

Inspector.propTypes = {
	field: PropTypes.object.isRequired,
};

Inspector.defaultProps = {
	field: {},
};

export default Inspector;
