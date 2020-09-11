import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBranch } from 'baobab-react/hooks';

import { Paper, Typography, Icon } from '@material-ui/core';

import styled from 'styled-components';

import * as access from 'plugins/access';
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import ProjectCreateInput from 'plugins/dashboard/components/ProjectCreateInput';
import ProjectMetadata from 'plugins/dashboard/components/ProjectMetadata';
import ProjectsPanel from 'plugins/dashboard/components/ProjectsPanel';
// import ProjectsActionButtons from 'plugins/dashboard/components/ProjectsActionButtons';
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
	// background: ${ access.color('backgrounds.light') } 
	background: ${ access.color('backgrounds.content') };

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
	justify-content: space-between; 
	flex: 1;
	padding: 15px 25px;
	background: ${ access.color('backgrounds.content') };
`;

const TypeTitle = styled(Typography)`
	display: flex;
	align-items: center;
	height: 40px;
	width: 280px;
	justify-content: space-between;
	color: ${ access.color('colors.blue06') };
`;

function Dashboard(props) {
	const { user } = props; 
	const { viewKey } = useBranch({ viewKey: ['viewKey'] });
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
					// handleDefaultSelectProject([]);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.email]);

	const handleProjectCreated = (res) => {
		setLoading(true);
		if (res.status.toLowerCase() === 'success') {
			getProjects();
		}
	};

	const renderContent = data => {
		return (
			<div style={{ display: 'flex', flex: 1 }}>
				{/* 
					TODO: 
					Add useReducer or recoil js as state manager for projects!
				*/}
				
				<ProjectsPanel 
					projects={ data }
					selectedProject={ selectedProject }
					onEnterProject={  console.debug }
					onDeleteProject={ handleRemoveProject }
					onSelectProject={ setSelectedProject }
					onProjectCreated={ handleProjectCreated }  />
					

				<Content className={ 'dashboard-content' }>
					<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
						
						<ProjectMetadata project={selectedProject} style={{ marginRight: 25 }} />
						<ProjectCanvas />

					</div>
					<div style={{ display: 'flex', flexDirection: 'row', marginTop: 15, height: 'calc(100% - 250px)' }}>
						<ProjectGraph project={{ ...selectedProject, users: ['shiran@email.com', 'ziv@email.com', 'yotam@email.com'] }} />
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
					{ access.translate('Create Your First Project!') }
					<Icon color={'secondary'}>bubble_chart</Icon>
				</TypeTitle>
				<Paper style={{ width: 250, height: 40, padding: '0 15px' }} >
					<ProjectCreateInput useInput={ true } onProjectCreated={ handleProjectCreated } />
				</Paper>
			</EmptyForm>
		);
	};

	return (
		<Wrap>
			<LoaderTimeout isLoading={loading} coverAll={true} pendingExtraTime={500}>

				{ projects && projects.length ? renderContent(projects) : renderSimpleForm(loading) }

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
