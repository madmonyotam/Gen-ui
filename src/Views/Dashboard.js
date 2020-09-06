import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Divider, Paper, Typography, Card, Icon } from '@material-ui/core';

import styled from 'styled-components';

import * as access from 'plugins/access';
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import ProjectCreateInput from 'plugins/components/dashboard/ProjectCreateInput';
import ProjectMetadata from 'plugins/components/dashboard/ProjectMetadata';
import ProjectListItem from 'plugins/components/dashboard/ProjectListItem';

const Wrap = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
	padding: 0;
	background: ${ access.color('backgrounds.light') } 
`;

const ProjectsWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const EmptyForm = styled.div`
	flex: 1;
	padding: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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

	const renderContent = data => {
		const existingProjects = getExistingProjectNames(data);
		return (
			<div style={{ display: 'flex', flex: 1, padding: 15 }}>
				<Card style={{ width: 235, marginRight: 15,  padding: '0 15px 10px 15px', display: 'flex', flexDirection: 'column' }} >

					<ProjectCreateInput
						onProjectCreated={ handleProjectCreated }
						existingProjects={ existingProjects } />

					<Divider style={{ marginBottom: 15 }} />

					<ProjectsWrapper>
						{ data.map(renderProjects) }
					</ProjectsWrapper>

				</Card>

				{/* <Divider orientation={'vertical'} style={{ margin: '0px 15px 0 5px' }} /> */}

				<div style={{ flex: 1 }}>
					<ProjectMetadata project={selectedProject} onProjectDelete={handleRemoveProject} />
				</div>
			</div>
		);
	};

	const renderSimpleForm = loading => {
		if (loading) return null;
		return (
			<EmptyForm>
				<TypeTitle>
					{ access.translate('Create Your First Project!') }
					<Icon>bubble_chart</Icon>
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
