import React from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useRecoilState, useRecoilValue } from 'recoil';
import { projectState, projectListState } from 'plugins/dashboard/tree/atoms';
import { existingProjectNames } from 'plugins/dashboard/tree/selectors';
 
import styled from 'styled-components';
import Panel from 'plugins/tools/Panel';
import ProjectCreateInput from 'plugins/dashboard/components/project/CreateInput';
import ProjectListItem from 'plugins/dashboard/components/project/ProjectListItem';
 
const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const ProjectPanel = props => {
	const {
		onEnterProject,
		onDeleteProject,
		onProjectCreated,
	} = props;


	const [selectedProject, setSelectedProject] = useRecoilState(projectState);

	const projectList = useRecoilValue(projectListState);

	// const existingProjects = projectList.map(proj => proj.name.toLowerCase());
	const existingProjects = useRecoilValue(existingProjectNames);

	const renderProjects = project => {
		const isSelected = selectedProject && selectedProject.id === project.id;
		return (
			<ProjectListItem
				key={project.id}
				selected={isSelected}
				project={project}
				onEnterProject={onEnterProject}
				onDeleteProject={onDeleteProject}
				onClick={() => setSelectedProject(project)} />
		);
	};

	return (
		<Panel>
			<ProjectCreateInput
				onProjectCreated={onProjectCreated}
				existingProjects={existingProjects} />

			<Divider style={{ marginBottom: 15 }} />

			<ProjectsWrapper>
				{projectList.map(renderProjects)}
			</ProjectsWrapper>
		</Panel>
	);
};

ProjectPanel.propTypes = {
	projects: PropTypes.array,
	selectedProject: PropTypes.object,
	onEnterProject: PropTypes.func,
	onDeleteProject: PropTypes.func,
	onSelectProject: PropTypes.func,
	onProjectCreated: PropTypes.func,
};

ProjectPanel.defaultProps = {
	projects: [],
	selectedProject: {},
	onEnterProject: () => { },
	onDeleteProject: () => { },
	onSelectProject: () => { },
	onProjectCreated: () => { },
};

export default ProjectPanel;