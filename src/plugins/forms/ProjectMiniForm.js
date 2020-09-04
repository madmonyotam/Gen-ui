import React, { useState, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { Icon, Typography, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 

import Request from 'plugins/request';


const Wrapper = styled.div`
	color: ${ access.color('backgrounds.primary') };
	font-size: 15px; 
	padding: 5px 0; 
	display: flex; 
	align-items: center; 
	justify-content: space-between;
	height: 30px;
`;

const Input = styled.input`
	font-family: 'Roboto'; 
	border: none; 
	font-size: 15; 
	outline: 0; 
	width: 100%; 
	height: 100%; 
`;

const ProjectsIcon = styled(Icon)`
	cursor: pointer;
	color: ${ props => props.color},
`;

const ProjectMiniForm = ({ onProjectCreated }) => {

	const [projectName, setProjectName] = useState('');
	const [showCreateInput, setShowCreateInput] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const inputRef = useRef();

	const handleNewProjectName = e => {
		setProjectName(e.target.value);
		if (e.target.value && e.target.value.length) {
			setShowConfirm(true);
		} else setShowConfirm(false);
	};

	const handleShowInput = () => {
		setShowCreateInput(true);
		if (showCreateInput) inputRef.current.focus();
	};
	
	const handleCreateProject = () => {
		Request.post('https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/', {
			name: projectName,
			createdBy: localStorage.getItem('gen-user-email'),
			projectJson: {}
		}).then(({ data }) => {
			if (onProjectCreated) onProjectCreated(data);
			setProjectName('');
			setShowCreateInput(false);
		});
	};

	const renderTitle = () => {
		return (
			<>
				<Typography>
					{access.translate('Projects')}
				</Typography>
				<Tooltip title={access.translate('Create New Project')}>
					<ProjectsIcon fontSize={'small'} onClick={handleShowInput}>create_new_folder</ProjectsIcon>
				</Tooltip>
			</>

		);
	};

	const renderInput = () => {
		return (
			<>
				<Input
					ref={inputRef}
					onChange={handleNewProjectName}
					value={projectName}
					placeholder={'Project Name'}
					autoFocus={true} />

				<div style={{ display: 'flex' }}>
					{
						showConfirm &&
						<Tooltip title={access.translate('Create')}>
							<ProjectsIcon fontSize={ 'small' } onClick={handleCreateProject}>check</ProjectsIcon>
						</Tooltip>
					}
					<Tooltip title={access.translate('Cancel')}>
						<ProjectsIcon fontSize={ 'small' } onClick={() => setShowCreateInput(false)}>clear</ProjectsIcon>
					</Tooltip>
				</div>
			</>
		);
	};
	return ( 
		<Wrapper>

			{
				!showCreateInput ? renderTitle() : renderInput()
			}

		</Wrapper>
	);
}; 

ProjectMiniForm.propTypes = {
	onProjectCreated: PropTypes.func
};

ProjectMiniForm.defaultProps = {
	onProjectCreated: () => null
};

export default ProjectMiniForm;
