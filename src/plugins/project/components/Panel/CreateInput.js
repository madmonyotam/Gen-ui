import React, { useState, useMemo, useEffect, useRef } from 'react'; 
import { useSetRecoilState } from 'recoil';
import { librariesState } from 'plugins/project/tree/atoms';

import PropTypes from 'prop-types';
import { Icon, Typography, Tooltip, ClickAwayListener } from '@material-ui/core';

import styled from 'styled-components';
import * as access from 'plugins/access'; 
import Badge from 'plugins/tools/Badge';

import Request from 'plugins/request';

const LIBRARY_API = 'libraryRestAPI-libraryRestAPI/library';

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
	background: transparent;
	width: 100%; 
	height: 100%; 
`;

const LibraryIcon = styled(Icon)`
	cursor: pointer;
`;

const LibraryCreateInput = ({ projectId, existingLibraries }) => {

	const [libraryName, setLibraryName] = useState('');
	const [showCreateInput, setShowCreateInput] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const setLibraries = useSetRecoilState(librariesState);

	// const [projectList, setProjectToList] = useRecoilState(projectListState); 
	const inputRef = useRef();

	
	const existingNames = useMemo(() => existingLibraries.map(lib => lib.name.toLowerCase()), [existingLibraries]);

	const handleEscKey = e => {
		if (e.keyCode === 27) handleClearForm();
	};
	
	const handleEnterKey = e => {
		if (e.keyCode === 13) handleCreateLibrary();
	};
 
	useEffect(() => {
		document.addEventListener('keydown', handleEscKey, false);
		return () => {
			document.removeEventListener('keydown', handleEscKey, false);
		}; 
	}, []);

	const handleLibraryName = e => {
		const newName = e.target.value;
		setLibraryName(newName);
		if (newName && newName.length) {
			if (existingNames.includes(newName.toLowerCase())) setShowConfirm(false);
			else setShowConfirm(true);
		} else setShowConfirm(false);
	};

	const handleShowInput = () => {
		setShowCreateInput(true);
		if (showCreateInput) inputRef.current.focus();
	};

	const handleClearForm = () => {
		setLibraryName('');
		setShowCreateInput(false);
		setShowConfirm(false);
	};
	
	const handleCreateLibrary = () => {
		if (!libraryName || !showConfirm) return;
		const valid = libraryName;
		setLibraryName('Writing...');	

		let newLibrary = {
			name: valid,
			createdBy: localStorage.getItem('gen-user-email'),
			projectId: projectId
		};

		Request.post(LIBRARY_API, newLibrary).then( () => {
			handleClearForm();
			Request.get(`${LIBRARY_API}/projects/${projectId}`)
				.then(({ data }) => {
					if (data.status.toLowerCase() === 'success') {
						setLibraries(data.libraries);
					}
				});
		});
	}; 

	const LibraryTitle = () => (
		<>
			<Typography style={{ display: 'flex', alignItems: 'center' , position: 'relative' }}>
				{access.translate('Libraries')}
				<Badge>{ existingNames.length }</Badge>
			</Typography>
			<Tooltip title={access.translate('Add Library')}>
				<LibraryIcon fontSize={'small'} onClick={handleShowInput}>library_add</LibraryIcon>
			</Tooltip>
		</>

	);

	const CreateInput = () =>  (
		<ClickAwayListener onClickAway={ handleClearForm } >
			<div style={{ display: 'flex', alignItems: 'center', width: '100%' }} >
				<Input
					ref={inputRef} 
					onChange={handleLibraryName}
					onKeyUp={ handleEnterKey }
					value={libraryName}
					placeholder={'Library Name'}
					autoFocus={true} />

				<div style={{ display: 'flex' }}>
					{
						showConfirm && (
							<Tooltip title={access.translate('Add')}>
								<LibraryIcon fontSize={'small'} onClick={handleCreateLibrary}>check</LibraryIcon>
							</Tooltip>
						)
					
					} 
				</div>
			</div>

		</ClickAwayListener>
	);
	return ( 
		<Wrapper>
			{ !showCreateInput ? <LibraryTitle /> : <CreateInput /> }
		</Wrapper>
	);
}; 

LibraryCreateInput.propTypes = {
	projectId: PropTypes.string,
	existingLibraries: PropTypes.array,
};

export default LibraryCreateInput;
