import React, { useState, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { Icon, Typography, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 

import Request from 'plugins/request';


const ProjectsIcon = styled(Icon)`
	cursor: pointer;
	color: ${ props => props.color},
	font-size: 13px; 
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

	return ( 
		<div style={{ color: access.color('backgrounds.primary'), fontSize: 15, padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

			{
				!showCreateInput ?
					<>
						<Typography>
							{access.translate('Projects')}
						</Typography>
						<Tooltip title={access.translate('Create New Project')}>
							<ProjectsIcon onClick={handleShowInput}>create_new_folder</ProjectsIcon>
						</Tooltip>
					</>
					:
					<>
						<input
							ref={inputRef}
							onChange={handleNewProjectName}
							value={projectName}
							placeholder={'Project Name'}
							style={{ fontFamily: 'Roboto', border: 'none', fontSize: 15, outline: 0, width: '100%', height: '100%' }}
							autoFocus={true} />

						<div style={{ display: 'flex' }}>
							{
								showConfirm &&
								<Tooltip title={access.translate('Create')}>
									<ProjectsIcon onClick={ handleCreateProject }>check</ProjectsIcon>
								</Tooltip>
							}
							<Tooltip title={access.translate('Cancel')}>
								<ProjectsIcon onClick={() => setShowCreateInput(false)}>clear</ProjectsIcon>
							</Tooltip>
						</div>
					</>
			}

		</div>
	);
}; 

ProjectMiniForm.propTypes = {
	onProjectCreated: PropTypes.func
};

ProjectMiniForm.defaultProps = {
	onProjectCreated: () => null
};

export default ProjectMiniForm;
