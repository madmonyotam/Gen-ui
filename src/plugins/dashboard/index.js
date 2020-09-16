import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Paper, Typography, Icon } from '@material-ui/core';

/* Recoil Tree */
import { projectState, projectListState, selectedProjectId } from './tree/atoms';

import { useFetchProjects } from './actions';

/* Plugins */
import * as access from 'plugins/access';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

/* Components */
import ProjectCreateInput from 'plugins/dashboard/components/project/CreateInput';
import ProjectMetadata from 'plugins/dashboard/components/project/metadata/';
import ProjectPanel from 'plugins/dashboard/components/project/ProjectPanel';
import ContributesGraph from 'plugins/dashboard/components/project/ContributesGraph';
import ProjectCanvas from 'plugins/dashboard/components/project/ProjectCanvas'; 

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
	gap: 10px;
	padding: 15px 25px;
	background: ${access.color('backgrounds.content')};
`;

const LineGraphCont = styled.div`
	display: flex; 
	flex: 1; 
`;

const UpperCont = styled.div`
	display: flex; 
	height: 60%;
`;

const TypeTitle = styled(Typography)`
	display: flex;
	align-items: center;
	height: 40px;
	width: 280px;
	justify-content: space-between;
	color: ${access.color('colors.blue06')};
`;

function Dashboard() {

	const email = localStorage.getItem('gen-user-email');
	const loading = useFetchProjects(email);
	
	/* using atoms */
	// const [selectedProject, setSelectedProject] = useRecoilState(projectState);
	const setProjectId = useSetRecoilState(selectedProjectId);
	const projects = useRecoilValue(projectListState);
	
	useEffect(() => { 
		if (!loading && projects) {
			setProjectId(projects[0].id);
		}
	}, [loading]);

	const handleProjectCreated = (res) => {
		// setLoading(true);
		if (res.status.toLowerCase() === 'success') {
			// getProjects();
		}
	};

	const renderContent = () => {
		return (
			<div style={{ display: 'flex', flex: 1 }}> 

				<ProjectPanel />

				<Content className={'dashboard-content'}>
					<UpperCont>

						<ProjectMetadata style={{ marginRight: 20 }} />
						<ProjectCanvas />

					</UpperCont>
					<LineGraphCont>
						<ContributesGraph />
					</LineGraphCont> 
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
			<LoaderTimeout isLoading={ loading } coverAll={ true } pendingExtraTime={ 1000 }>
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
