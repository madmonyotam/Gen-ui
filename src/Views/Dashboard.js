import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBranch } from 'baobab-react/hooks';

import { Divider, Paper, Typography, Card, Icon } from '@material-ui/core';

import styled from 'styled-components';

import * as access from 'plugins/access';
import Request from 'plugins/request';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import ProjectCreateInput from 'plugins/components/dashboard/ProjectCreateInput';
import ProjectMetadata from 'plugins/components/dashboard/ProjectMetadata';
import ProjectListItem from 'plugins/components/dashboard/ProjectListItem';
import ProjectsActionButtons from 'plugins/components/dashboard/ProjectsActionButtons';
import ProjectGraph from 'plugins/components/dashboard/ProjectGraph';
import ProjectCanvas from 'plugins/components/dashboard/ProjectCanvas';

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

const ProjectsCard = styled(Card)`
	${ props => props.style || `
		
		width: 235px; 
		margin: 0 15px 0 0; 
		padding: 0 15px 10px 15px; 
		display: flex; 
		flex-direction: column;
`
}`;

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
				<ProjectsCard>
					<ProjectCreateInput
						onProjectCreated={ handleProjectCreated }
						existingProjects={ existingProjects } />

					<Divider style={{ marginBottom: 15 }} />

					<ProjectsWrapper>
						{ data.map(renderProjects) }
					</ProjectsWrapper>

				</ProjectsCard>

				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
					<div style={{ height: '100%', paddingBottom: 15,  display: 'flex', flexDirection: 'row' }}>
						<div style={{ height: '100%', flex: .75, marginRight: '15px' }}>
							<ProjectMetadata project={selectedProject} />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', flex: 1.25 }}>
							<ProjectsCard style={{ width: 'auto', margin: 0, padding: '0 15px', flex: 1.25, position: 'relative' }}>
								<ProjectCanvas viewKey={ viewKey }/>
							</ProjectsCard>
							<ProjectsCard style={{ width: 'auto', marginTop: 15, padding: '0 15px', flex: .75 }}>
								<ProjectGraph project={selectedProject} />
							</ProjectsCard>
						</div>
					</div>
					<ProjectsActionButtons project={selectedProject} onProjectDelete={handleRemoveProject}  />
				</div>
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
