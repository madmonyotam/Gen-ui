import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import styled from 'styled-components';
import DataBox from './data-box'; 


const Input = styled.input`
	font-family: 'Roboto'; 
	border: none; 
	font-size: 16px; 
	outline: 0; 
	background: rgba(226,226,226, 0.25);
	border-bottom: 1px dashed rgba(186,196,206, .75);
	height: 100%; 
	transition: all .15s ease-in;
	padding-left: 10px;
`;


const Typo = styled(Typography)`
	height: 100%; 
	display: flex; 
	align-items: center; 
	font-size: 14px !important;
`;

const TitleTypo = styled(Typo)`
	border-bottom: 1px dashed rgba(255,255,255, 0);
	margin: 0 15px 0 30px !important;
	transition: all .10s ease-in-out;
	font-style: normal;

	:hover {
		cursor: text;
		border-bottom: 1px dashed rgba(186,196,206, 1);
		font-style: italic;
	}
`;
const ProjectTitle = props => {
	const { projectTitle, label } = props;
	const inputRef = useRef();
	const [isEdit, setIsEdit] = useState(false);

	const handleEscKey = e => {
		// if (e.keyCode === 27) setIsEdit(false);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey, false);
		return () => {
			document.removeEventListener('keydown', handleEscKey, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DataBox icon={'short_text'} title={'Title'} container={false} style={{ maxHeight: 65 }}>
			<TitleTypo>{projectTitle}</TitleTypo>
			{/* {
                isEdit ?
                    <ClickAwayListener onClickAway={() => handleEditMode(false)} >
                        <Input ref={inputRef} value={detail.value} onChange={handleChangeDetail} name={detail.key} />
                    </ClickAwayListener>
                    : <TitleTypo push small onClick={() => handleEditMode(true)}>{detail.value}</TitleTypo>
            } */}
		</DataBox>

		
	);
};

ProjectTitle.propTypes = {
	projectTitle: PropTypes.string,
	label: PropTypes.string,

};

ProjectTitle.defaultProps = {
	projectTitle: '',
	label: ''
};

export default ProjectTitle;