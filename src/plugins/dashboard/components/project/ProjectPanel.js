import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { projectListState, selectedProjectId } from 'plugins/dashboard/tree/atoms';

import { Divider } from '@material-ui/core';
import Panel from 'plugins/tools/Panel';
import ProjectListItem from 'plugins/dashboard/components/project/ProjectListItem';
import CreateInput from 'plugins/tools/CreateInput';
 
const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const ProjectPanel = () => {

	const selectedId = useRecoilValue(selectedProjectId);

	const [projectList, setProjectToList] = useRecoilState(projectListState);

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

	const handleCreated = res => {
		let newProject = {
			...res.params,
			createdTime: Date.now(),
			updatedTime: Date.now(),
			id: res.projectId
		};

		let newList = [
			...projectList,
			newProject
		];
		setProjectToList(newList);
	};

	return (
		<Panel>
			<CreateInput type={ 'project' } existingData={ existingProjects } onCreated={ handleCreated }/>
			
			<Divider style={{ marginBottom: 15 }} />

			<ProjectsWrapper>
				{ projectList.map(renderProjects) }
			</ProjectsWrapper>
		</Panel>
	);
};

export default ProjectPanel;