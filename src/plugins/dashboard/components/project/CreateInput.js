import React, { useState, useMemo, useEffect, useRef } from 'react'; 
import { useRecoilState } from 'recoil';
import { projectListState } from 'plugins/dashboard/tree/atoms';
import PropTypes from 'prop-types';
import { Icon, Typography, Tooltip, ClickAwayListener } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 
import Badge from 'plugins/tools/Badge';

import Request from 'plugins/request';

const PROJECTS_API = 'projectRestAPI-projectRestAPI/project';

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

const ProjectsIcon = styled(Icon)`
	cursor: pointer;
	color: ${ props => props.color},
`;

const ProjectCreateInput = ({ useInput, existingProjects }) => {

	const [projectName, setProjectName] = useState('');
	const [showCreateInput, setShowCreateInput] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [projectList, setProjectToList] = useRecoilState(projectListState);
	const inputRef = useRef();

	
	const existingNames = useMemo(() => existingProjects, [existingProjects]);

	const handleEscKey = e => {
		if (e.keyCode === 27) handleClearForm();
	};
	
	const handleEnterKey = e => {
		if (e.keyCode === 13) handleCreateProject();
	};

	useEffect(() => {
		if (useInput) setShowCreateInput(true);
	}, [useInput]);
	
	useEffect(() => {
		document.addEventListener('keydown', handleEscKey, false);
		return () => {
			document.removeEventListener('keydown', handleEscKey, false);
		}; 
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNewProjectName = e => {
		const newName = e.target.value;
		setProjectName(newName);
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
		if (useInput) return;
		setProjectName('');
		setShowCreateInput(false);
		setShowConfirm(false);
	};
	
	const handleCreateProject = () => {
		if (!projectName || !showConfirm) return;
		const valid = projectName;
		setProjectName('Creating...');	

		let newProject = {
			name: valid,
			createdBy: localStorage.getItem('gen-user-email'),
			projectJson: {}
		};

		Request.post(PROJECTS_API, newProject).then(({ data }) => {
			// console.log(data);
			newProject = {
				...newProject,
				createdTime: Date.now(),
				updatedTime: Date.now(),
				id: data.projectId
			};
			
			let newList = [
				...projectList,
				newProject
			];
			setProjectToList(newList);

			handleClearForm();
		});
	}; 

	const renderTitle = () => {
		return (
			<>
				<Typography style={{ display: 'flex', alignItems: 'center' , position: 'relative' }}>
					{access.translate('Projects')}
					<Badge>{ existingNames.length }</Badge>
				</Typography>
				<Tooltip title={access.translate('Create New Project')}>
					<ProjectsIcon fontSize={'small'} onClick={handleShowInput}>create_new_folder</ProjectsIcon>
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
						onChange={handleNewProjectName}
						onKeyUp={ handleEnterKey }
						value={projectName}
						placeholder={'Project Name'}
						autoFocus={true} />

					<div style={{ display: 'flex' }}>
						{
							showConfirm && (
								<Tooltip title={access.translate('Create')}>
									<ProjectsIcon fontSize={'small'} onClick={handleCreateProject}>check</ProjectsIcon>
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

ProjectCreateInput.propTypes = {
	onProjectCreated: PropTypes.func,
	existingProjects: PropTypes.array,
	useInput: PropTypes.bool,
};

ProjectCreateInput.defaultProps = {
	onProjectCreated: () => null,
	existingProjects: [],
	useInput: false
};

export default ProjectCreateInput;
