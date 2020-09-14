import React from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useRecoilState, useRecoilValue } from 'recoil';
import { projectState } from 'plugins/dashboard/tree/atoms';  
import { projectList } from 'plugins/dashboard/tree/selectors';  

import * as access from 'plugins/access';
import styled from 'styled-components';

import ProjectCreateInput from 'plugins/dashboard/components/ProjectCreateInput';
import ProjectListItem from 'plugins/dashboard/components/ProjectListItem';

const Panel = styled.div`
	width: 235px; 
	padding: 15px;
	display: flex; 
	flex-direction: column;
	box-shadow:  10px 0px 10px -20px rgba(0,0,0,0.75);
	background: ${ access.color('backgrounds.light') } 
	z-index: 1;
}`;

const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const ProjectsPanel = props => {
	const { 
		onEnterProject,
		onDeleteProject,
		onProjectCreated,
	} = props;


	const [selectedProject, setSelectedProject] = useRecoilState(projectState);
	
	const projects = useRecoilValue(projectList);

	const existingProjects = projects.map(proj => proj.name.toLowerCase());
    
	const renderProjects = project => {
		const isSelected = selectedProject && selectedProject.id === project.id;
		return (
			<ProjectListItem
				key={project.id}
				selected={isSelected}
				project={project}
				onEnterProject={ onEnterProject }
				onDeleteProject={ onDeleteProject } 
				onClick={ () => setSelectedProject(project) } />
		);
	}; 

	return (
		<Panel>
			<ProjectCreateInput
				onProjectCreated={ onProjectCreated }
				existingProjects={ existingProjects } />

			<Divider style={{ marginBottom: 15 }} />

			<ProjectsWrapper>
				{ projects && projects.map(renderProjects) }
			</ProjectsWrapper>

		</Panel>
	);
};

ProjectsPanel.propTypes = {
	projects: PropTypes.array,
	selectedProject: PropTypes.object,
	onEnterProject: PropTypes.func,
	onDeleteProject: PropTypes.func,
	onSelectProject: PropTypes.func,
	onProjectCreated: PropTypes.func,
};

ProjectsPanel.defaultProps = {
	projects: [],
	selectedProject: {},
	onEnterProject: () => {},
	onDeleteProject: () => {},
	onSelectProject: () => {},
	onProjectCreated: () => {},
};

export default ProjectsPanel;