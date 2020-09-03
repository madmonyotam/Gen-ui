import React, { useState } from 'react'; 
import PropTypes from 'prop-types';
import { Icon, Typography, Paper, Divider } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 

import Request from 'plugins/request';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 25px;
`;

const FormPaper = styled(Paper)` 
	width: 350px; 
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	background: #dfdfdf;
	color: ${ props => props.color };
`; 

const ProjectForm = ({ onProjectCreated }) => {

	const [projectName, setProjectName] = useState('');
	const [showOk, setShowOk] = useState(false);

	const onChange = e => {
		setProjectName(e.target.value); 
		if (e.target.value && e.target.value.length) {
			setShowOk(true);
		} else setShowOk(false);
	}; 
	
	const handleCreateProject = () => {
		Request.post('https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/', {
			name: projectName,
			createdBy: localStorage.getItem('gen-user-email'),
			projectJson: {}
		}).then((res) => {
			console.log('res', res);
			onProjectCreated();
		});
	};

	return ( 
		<Wrapper>
			<FormPaper elevation={ 1 }>
				<Header color={access.color('texts.secondary') }>
					<div style={{ display: 'flex' }}>
						<Icon>create_new_folder</Icon>
						<Typography style={{ marginLeft: 10 }}>
							{ access.translate('Create Project') }
						</Typography>
					</div>
					{ showOk && <Icon style={{ cursor: 'pointer' }} onClick={ handleCreateProject }> check </Icon> }
				</Header>
			</FormPaper>

			<Divider />

			<FormPaper elevation={ 4 } style={{ marginTop: 15 }}>
				<input
					style={{ outline: 0, border: 'none', padding: 10 }}
					placeholder={ 'Project Name' }
					name={ 'projectName' }
					value={ projectName }
					onChange={ onChange }
				/>
			</FormPaper>
		</Wrapper>
	);
}; 

ProjectForm.propTypes = {
	onProjectCreated: PropTypes.func
};

ProjectForm.defaultProps = {
	onProjectCreated: () => null
};

export default ProjectForm;
