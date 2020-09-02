import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress, Paper, Typography } from '@material-ui/core';
import { Switch, useHistory } from 'react-router-dom';

import styled from 'styled-components';

import * as access from 'plugins/access';
import Mask from 'plugins/tools/Mask'; 
import Request from 'plugins/request';
import Routes from 'plugins/tools/Routes';

import ProjectForm from 'plugins/forms/ProjectForm';

const InitMask = styled(Mask)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Projects = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px 0 15px 15px;
`;

const ProjectPaper = styled(Paper)`
    margin-right: 15px;
    max-height: 90px;
    padding: 15px;
    background-color: ${ props => props.background } !important;
	width: calc(100% / 4);
	cursor: pointer;
	transition: all 0.15s ease-in-out;
    &:hover {
		box-shadow: 0px 5px 1px -2px rgba(0,0,0,0.2),0px 6px 6px 4px rgba(0,0,0,0.14),0px 8px 6px 0px rgba(0,0,0,0.12); 
    }
`;

function Dashboard(props) {
	const { routes, user, projectID } = props; 
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState([]);
	//const stableDispatch = useCallback(dispatch, []);
	let history = useHistory(); 	

	useEffect(() => { 
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setProjects(data.projects);
				}
			});

		const t = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => {
			clearTimeout(t);
		};
	}, []);

	const renderProjects = (project) => (
		<ProjectPaper
			key={project.id} 
			onClick={ () => history.push(`dashboard/project/${ project.id }`) }
			background={ access.color('backgrounds.primary') }
			elevation={2}>
			<Typography style={{ color: '#fff' }}>
				{ project.name }
			</Typography>
		</ProjectPaper>       
	);

	if (loading) {
		return (
			<InitMask opacity={1} mask={ access.color('backgrounds.secondary') }>
				<img alt="logo" src={ process.env.PUBLIC_URL + '/gen_logo.png' } />
				<div style={{ width: 400 }}>
					<LinearProgress value={50} color={'primary'} />
				</div>
			</InitMask>
		);
	} 
	else if (projectID) {
		return (
			<Switch>
				<Routes routes={ routes }/>
			</Switch>
		);
	}
	return (
		<Projects>
			{ 
				(projects && projects.length) ? projects.map(renderProjects)
					: <ProjectForm />
			}
			
		</Projects>
	);
}


Dashboard.propTypes = {
	user: PropTypes.object,
	routes: PropTypes.array,
	projectID: PropTypes.string,
};

Dashboard.defaultProps = {
	user: {},
	routes: [],
	projectID: null
};

export default Dashboard;
