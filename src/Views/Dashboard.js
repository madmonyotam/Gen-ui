import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';

import styled from 'styled-components';

import * as access from 'plugins/access';	
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import ProjectMiniForm from 'plugins/forms/ProjectMiniForm';
import ProjectDetailsForm from 'plugins/forms/ProjectDetailsForm';
import ProjectListItem from 'plugins/components/ProjectListItem';

const Projects = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px 0 15px 15px;
`;

const Details = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex: 1;
	flex-direction: column;
`;

function Dashboard(props) {
	const { user } = props; 
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);

	const getProjects = () => {
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setProjects(data.projects);
					if (data.projects.length) {
						setSelectedProject(data.projects[0]);
					}
					setLoading(false);
				}
			});
	};

	useEffect(() => {
		getProjects();
	}, [user.email]);

	const handleProjectCreated = (res) => {
		if (res.status.toLowerCase() === 'success') {
			getProjects();
		}
	};
	
	const renderProjects = (project) => {
		const isSelected = selectedProject && selectedProject.id == project.id;
		return (
			<ProjectListItem 
				key={ project.id } 
				selected={ isSelected } 
				project={ project } 
				onEnterProject={ () => console.log(project) }
				onClick={ () => setSelectedProject(project) }/>
		);
	};
 
	return (
		<Projects>
			<LoaderTimeout isLoading={loading} coverAll={true} pendingExtraTime={500}>

				<div style={{ width: 250, display: 'flex', flexDirection: 'column' }} >
					
					<ProjectMiniForm onProjectCreated={ handleProjectCreated }/>

					<Divider style={{ marginBottom: 15 }} />
					<div>
						{ 
							projects && projects.map(renderProjects)
						}
					</div>
					
				</div>
				<Divider orientation={ 'vertical' } style={{ margin: '0 15px' }} />

				<Details>
					
					<ProjectDetailsForm project={ selectedProject }/>
					
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
	user: PropTypes.object
};

Dashboard.defaultProps = {
	user: {}
};

export default Dashboard;
