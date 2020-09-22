import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { projectListState, selectedProjectId } from 'plugins/dashboard/tree/atoms';

import { Divider } from '@material-ui/core';
import Panel from 'plugins/tools/Panel';
import ProjectCreateInput from 'plugins/dashboard/components/project/CreateInput';
import ProjectListItem from 'plugins/dashboard/components/project/ProjectListItem';
 
const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const ProjectPanel = () => {

	const selectedId = useRecoilValue(selectedProjectId);

	const projectList = useRecoilValue(projectListState);

	const existingProjects = projectList.map(proj => proj.name.toLowerCase());

	const renderProjects = project => {
		const isSelected = selectedId === project.id;
		return (
			<ProjectListItem
				key={project.id}
				selected={isSelected}
				project={project} />
		);
	};

	return (
		<Panel>
			<ProjectCreateInput existingProjects={existingProjects} />

			<Divider style={{ marginBottom: 15 }} />

			<ProjectsWrapper>
				{ projectList.map(renderProjects) }
			</ProjectsWrapper>
		</Panel>
	);
};

export default ProjectPanel;