import React, { useState, useMemo, useEffect, useRef } from 'react'; 
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Tooltip, ClickAwayListener } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 
import Badge from 'plugins/tools/Badge';

import Request from 'plugins/request';
import { useRecoilValue } from 'recoil';
import { selectedLibId } from 'plugins/project/tree/atoms';
const createdBy = localStorage.getItem('gen-user-email');

const api = {
	project: {
		icon: 'create_new_folder',
		label: 'Projects',
		url: '/projectRestAPI-projectRestAPI/project',
		default_params: {
			createdBy,
			projectJson: { }
		}
	},
	library: {
		icon: 'library_add',
		label: 'Libraries',
		url: '/libraryRestAPI-libraryRestAPI/library',
		default_params: {
			createdBy
		}
	},
	schema: {
		icon: 'post_add',
		label: 'Scehmas',
		url: '/schemaRestAPI-schemaRestAPI/schema',
		default_params: {
			createdBy
		}
	}
};
 
// const SCHEMA_API = '/schemaRestAPI-schemaRestAPI/schema';

const Wrapper = styled.div`
	color: ${ access.color('backgrounds.primary') };
	font-size: 15px; 
	padding: 5px 0; 
	display: flex; 
	align-items: center; 
	justify-content: space-between;
	height: 30px;
	min-height: 30px;
	max-height: 30px;
`;

const Input = styled.input`
	font-family: 'Roboto'; 
	border: none; 
	font-size: 15px; 
	outline: 0; 
	text-transform: capitalize;
	background: transparent;
	width: 100%; 
	height: 100%; 
`;

const InputIcon = styled(Icon)`
	cursor: pointer;
	color: ${ props => props.color};
`;

const CreateInput = ({ useInput, existingData, type, onCreated }) => {



	const [name, setName] = useState('');
	const [showCreateInput, setShowCreateInput] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const inputRef = useRef();
	const { id: projectId } = useParams();
	const libId = useRecoilValue(selectedLibId);

	const existingNames = useMemo(() => existingData, [existingData]);

	const handleEscKey = e => {
		if (e.keyCode === 27) handleClearForm();
	};
	
	const handleEnterKey = e => {
		if (e.keyCode === 13) handleCreate();
	};

	useEffect(() => {
		if (useInput) setShowCreateInput(true);
	}, [useInput]);
	
	useEffect(() => {
		document.addEventListener('keydown', handleEscKey, false);
		return () => {
			document.removeEventListener('keydown', handleEscKey, false);
		}; 
	}, []);

	const handleNewname = e => {
		const newName = e.target.value;
		setName(newName);
		if (newName && newName.length) {
			if (existingNames.map(n => n.toLowerCase()).includes(newName.toLowerCase())) setShowConfirm(false);
			else setShowConfirm(true);
		} else setShowConfirm(false);
	};

	const handleShowInput = () => {
		setShowCreateInput(true);
		if (showCreateInput) inputRef.current.focus();
	};

	const handleClearForm = () => {
		if (useInput) return;
		setName('');
		setShowCreateInput(false);
		setShowConfirm(false);
	}; 

	const handleCreate = () => {
		if (!name || !showConfirm) return;
		const valid = name;
		let data = {};
		setName('Creating...');	 
		const call = api[type];
		switch (type) {
			case 'project':
				data = { name: valid };
				break;

			case 'library':
				data = { name: valid, projectId };
				break;

			case 'schema':
				data = { name: valid, libraryId: libId };
				break;

			case 'default': 
				break;
		}
		const params = { ...data, ...call.default_params };
		Request.post(call.url, params)
			.then( res => {
				onCreated({ ...res.data, params });
				handleClearForm();
			});
	}; 

	const renderTitle = () => {
		if (!type) return null;
		const { label, icon } = api[type];
		return (
			<>
				<span style={{ display: 'flex', alignItems: 'center' , position: 'relative' }}>
					{ type ? access.translate(label) : '' }
					<Badge>{ existingData.length }</Badge>
				</span>
				<Tooltip title={<span style={{ textTransform: 'capitalize' }}>{access.translate(`Create New ${type}`)}</span>}>
					<InputIcon fontSize={'small'} onClick={handleShowInput}>{ icon }</InputIcon>
				</Tooltip>
			</>

		);
	};

	const renderInput = () => {
		return (
			<ClickAwayListener onClickAway={ handleClearForm } >
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }} >
					<Input
						ref={inputRef} 
						onChange={handleNewname}
						onKeyUp={ handleEnterKey }
						value={name}
						placeholder={`${ type } Name`}
						autoFocus={true} />

					<div style={{ display: 'flex' }}>
						{
							showConfirm && (
								<Tooltip title={access.translate('Create')}>
									<InputIcon fontSize={'small'} onClick={handleCreate}>check</InputIcon>
								</Tooltip>
							)
						
						} 
					</div>
				</div>

			</ClickAwayListener>
		);
	};
	return ( 
		<Wrapper>
			{ !showCreateInput ? renderTitle() : renderInput() }
		</Wrapper>
	);
}; 

CreateInput.propTypes = {
	existingData: PropTypes.array,
	useInput: PropTypes.bool,
	onCreated: PropTypes.func,
	type: PropTypes.string,
};

CreateInput.defaultProps = {
	existingData: [],
	useInput: false,
	onCreated: () => null,
	type: 'project'
};

export default CreateInput;
