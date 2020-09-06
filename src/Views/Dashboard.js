import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';

import styled from 'styled-components';

import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import ProjectMiniForm from 'plugins/forms/ProjectMiniForm';
import ProjectDetailsForm from 'plugins/forms/ProjectDetailsForm';
import ProjectListItem from 'plugins/components/ProjectListItem';

const Wrap = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
`;

const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

function Dashboard(props) {
	const { user } = props; 
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);

	const handleDefaultSelectProject = (list) => {
		setProjects(list);
		
		if (!list.length) setSelectedProject(null);
		else {
			if (!selectedProject) setSelectedProject(list[0]);
			else {
				const found = list.find(proj => proj.id === selectedProject.id);
				if (found) setSelectedProject(found);
				else setSelectedProject(list[0]);
			}
		}
		
	};

	const getProjects = () => {
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					handleDefaultSelectProject(data.projects);
					setLoading(false);
				}
			});
	};

	const handleRemoveProject = id => {
		setLoading(true);
		Request.remove(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/${id}/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					getProjects();
				}
			});
	};

	useEffect(() => {
		getProjects();
	}, [user.email]);

	const handleProjectCreated = (res) => {
		setLoading(true);
		if (res.status.toLowerCase() === 'success') {
			getProjects();
		}
	};

	
	const renderProjects = project => {
		const isSelected = selectedProject && selectedProject.id === project.id;
		return (
			<ProjectListItem 
				key={ project.id } 
				selected={ isSelected } 
				project={ project } 
				onEnterProject={ () => console.log(project) }
				onProjectDelete={ handleRemoveProject }
				onClick={ () => setSelectedProject(project) }/>
		);
	};
	
	const getExistingProjectNames = projects => {
		return projects.map(proj => proj.name);
	};

	return (
		<Wrap>
			<LoaderTimeout isLoading={loading} coverAll={true} pendingExtraTime={500}>

				<div style={{ width: 235, paddingRight: 15, display: 'flex', flexDirection: 'column' }} >
					
					<ProjectMiniForm 
						onProjectCreated={handleProjectCreated} 
						existingProjects={ getExistingProjectNames(projects) } />

					<Divider style={{ marginBottom: 15 }} />

					<ProjectsWrapper>
						{ 
							projects && projects.map(renderProjects)
						}
					</ProjectsWrapper>
					
				</div>

				<Divider orientation={ 'vertical' } style={{ margin: '0px 15px 0 5px' }} />

				<div style={{ flex: 1}}>
					<ProjectDetailsForm project={ selectedProject } onProjectDelete={ handleRemoveProject }/>
				</div>

			</LoaderTimeout>
		</Wrap>
	);
}


Dashboard.propTypes = {
	user: PropTypes.object
};

Dashboard.defaultProps = {
	user: {}
};

export default Dashboard;
