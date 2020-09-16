import React from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { projectState, projectListState, selectedProjectId } from 'plugins/dashboard/tree/atoms';
 
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
		onProjectCreated,
	} = props;


	// const [selectedProject, setSelectedProject] = useRecoilState(projectState);
	const [ selectedId, setProjectId ] = useRecoilState(selectedProjectId);

	const projectList = useRecoilValue(projectListState);

	const existingProjects = projectList.map(proj => proj.name.toLowerCase());

	const renderProjects = project => {
		const isSelected = selectedId === project.id;
		return (
			<ProjectListItem
				key={project.id}
				selected={isSelected}
				project={project}
				onEnterProject={onEnterProject}
				onClick={() => setProjectId(project.id)} />
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