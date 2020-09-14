import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as engine from 'gen-engine';
import styled from 'styled-components';

import { Paper, Typography, Icon } from '@material-ui/core';

/* Recoil Tree */
import { projectState, listState } from './tree/atoms';
import { projectList } from './tree/selectors';
// import { getProjects } from './actions';

/* Plugins */
import * as access from 'plugins/access';
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

/* Components */
import ProjectCreateInput from 'plugins/dashboard/components/ProjectCreateInput';
import ProjectMetadata from 'plugins/dashboard/components/metadata/';
import ProjectsPanel from 'plugins/dashboard/components/ProjectsPanel';
import ProjectGraph from 'plugins/dashboard/components/ProjectGraph';
import ProjectCanvas from 'plugins/dashboard/components/ProjectCanvas'; 

const Wrap = styled.div`
    position: absolute;
		display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
		padding: 0;
		background: ${access.color('backgrounds.content')};
`;

const EmptyForm = styled.div`
	flex: 1;
	padding: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Content = styled.div`
	display: flex; 
	flex-direction: column; 
	flex: 1;
	padding: 15px 25px;
	background: ${access.color('backgrounds.content')};
`;

const TypeTitle = styled(Typography)`
	display: flex;
	align-items: center;
	height: 40px;
	width: 280px;
	justify-content: space-between;
	color: ${access.color('colors.blue06')};
`;

function Dashboard(props) {
	const { user } = props;

	const [loading, setLoading] = useState(true);
	const projects = useRecoilValue(projectList);
	const setList = useSetRecoilState(listState);

	const [selectedProject, setSelectedProject] = useRecoilState(projectState);
 
	const handleDefaultSelectProject = (list) => {

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

	const handleRemoveProject = id => {
		setLoading(true);
		Request.remove(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/${id}/${user.email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					// getProjects();
				}
			});
	}; 

	useEffect(() => {
		setList(projects);
		handleDefaultSelectProject(projects);
	}, [projects]);

	const handleProjectCreated = (res) => {
		setLoading(true);
		if (res.status.toLowerCase() === 'success') {
			// getProjects();
		}
	};

	const renderContent = () => {
		return (
			<div style={{ display: 'flex', flex: 1 }}> 
				<ProjectsPanel
					//projects={data}
					// selectedProject={selectedProject}
					// onEnterProject={console.debug}
					// onDeleteProject={handleRemoveProject}
					// onSelectProject={handleSelectProject}
					// onProjectCreated={handleProjectCreated} 
				/>


				<Content className={'dashboard-content'}>
					<div style={{ display: 'flex', flexDirection: 'row', height: '50%' }}>

						<ProjectMetadata project={selectedProject} style={{ marginRight: 20 }} />
						<ProjectCanvas />

					</div>
					<div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, flex: 1 }}>
						<ProjectGraph />
					</div>
					{/* <ProjectsActionButtons project={selectedProject} onProjectDelete={handleRemoveProject}  /> */}
				</Content>
			</div>
		);
	};

	const renderSimpleForm = loading => {
		if (loading) return <div />;
		return (
			<EmptyForm>
				<TypeTitle>
					{access.translate('Create Your First Project!')}
					<Icon color={'secondary'}>bubble_chart</Icon>
				</TypeTitle>
				<Paper style={{ width: 250, height: 40, padding: '0 15px' }} >
					<ProjectCreateInput useInput={true} onProjectCreated={handleProjectCreated} />
				</Paper>
			</EmptyForm>
		);
	};  

	return (
		<Wrap>
			{ projects && projects.length ? renderContent(projects) : renderSimpleForm(loading) }
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