import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress, Paper, Divider, Typography, Tooltip, Icon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import * as access from 'plugins/access';
import Mask from 'plugins/tools/Mask'; 
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';
// import Routes from 'plugins/tools/Routes';

// import ProjectForm from 'plugins/forms/ProjectForm';

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

const Details = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex: 1;
	flex-direction: column;
`;

function Dashboard(props) {
	const { routes, user, projectID } = props; 
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState(null);
	//const stableDispatch = useCallback(dispatch, []);

	// let history = useHistory(); 	

	useEffect(() => { 
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setProjects(data.projects);
					setLoading(false);
				}
			});
	}, []);

        
	// const handleProject = (id) => {
		
	// history.push(`project/${ id }`); 
	// };

	// <ProjectPaper
	// 	key={project.id} 
	// 	onClick={ () => handleProject(project.id) }
	// 	background={ access.color('backgrounds.primary') }
	// 	elevation={2}>
	{/* </ProjectPaper>        */}

	const renderProjects = (project) => (
		<Typography onClick={ () => setProject(project) } key={project.id} style={{ cursor: 'pointer', color: '#fff', padding: 10, background: access.color('backgrounds.primary') }}>
			{ project.name }
		</Typography>
	); 

	return (
		<Projects>
			<LoaderTimeout isLoading={loading} coverAll={true} pandingExtraTime={2000}>

				<div style={{ width: 250, display: 'flex', flexDirection: 'column' }} >
					<Typography style={{ cursor: 'pointer', color: access.color('backgrounds.primary'), padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						{ access.translate('Projects') }
						<Tooltip title={ access.translate('Add Project') }>
							<Icon>create_new_folder</Icon>	
						</Tooltip>
					</Typography>

					<Divider />
					{ 
						projects && projects.map(renderProjects)
					}
					{/* { 
					(projects && projects.length) ? projects.map(renderProjects)
					: <ProjectForm />
				} */}
				</div>
				<Divider orientation={ 'vertical' } style={{ margin: '0 15px' }} />
				<Details>
					<div>
						<Typography>
						Project Details
						</Typography>
						{
							project && <pre>{ JSON.stringify(project, null, 4) }</pre>
						}
					</div>
					<div>
						<button>{ access.translate('Enter') }</button>
						<button>{ access.translate('Delete') }</button>
					</div>
				</Details>
			</LoaderTimeout>
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
