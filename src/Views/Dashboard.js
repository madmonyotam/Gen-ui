import React, { useState, useEffect } from 'react';
//import { useBranch } from 'baobab-react/hooks';
import { LinearProgress, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';

import * as access from 'plugins/access';
//import * as libsActions from 'tree/actions/libs';

//import MenuPanel from 'Views/MenuPanel';
//import SchemaPanel from 'Views/SchemaPanel';
import Mask from 'plugins/tools/Mask';
import Wrapper from 'plugins/tools/Wrapper';
//import MainCanvas from 'plugins/canvases/MainCanvas';
//import Menu from 'plugins/menuModal/Menu';
import Project from 'Views/Project';
import TopPanel from 'plugins/tools/TopPanel';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

import Request from 'plugins/request';

const InitMask = styled(Mask)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Projects = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px 0 15px 15px;
`;

const ProjectPaper = styled(Paper)`
    margin-right: 15px;
    max-height: 90px;
    padding: 15px;
    background-color: ${ props => props.background } !important;
    flex: 1;
	cursor: pointer;
	transition: all 0.15s ease-in-out;
    &:hover {
		box-shadow: 0px 5px 1px -2px rgba(0,0,0,0.2),0px 6px 6px 0px rgba(0,0,0,0.14),0px 2px 6px 0px rgba(0,0,0,0.12);
		background-color: #393c6f !important;
    }
`;

function Dashboard() {
	//const { viewKey } = useBranch({ viewKey: ['viewKey'] });
	//const { libs, dispatch } = useBranch({ libs: ['libs'] });
	const [loading, setLoading] = useState(true);
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState(false);
	const userName = localStorage.getItem('gen-user-name');
	const email = localStorage.getItem('gen-user-email');
	//const stableDispatch = useCallback(dispatch, []);

	useEffect(() => { 
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${email}`)
			.then(({ data }) => { 
				if (data.status.toLowerCase() === 'success') {
					setProjects(data.projects);
				}
			});
	}, []); 

	useEffect(() => {
		const t = setTimeout(() => {
			setLoading(false);
		});
		return () => {
			clearTimeout(t);
		};
	}, []);
 

	const renderProjects = (project) => {
		return (
			<ProjectPaper
				key={project.id} 
				onClick={ () => setProject(true) }
				background={ access.color('backgrounds.primary') }
				elevation={2}>
				<Typography style={{ color: '#fff' }}>
					{ project.name }
				</Typography>
			</ProjectPaper>
		);
	};

	const renderContent = () => {
		if (project) return <Project />;

		return (
			<Projects>
				{ projects && projects.map(renderProjects) }
			</Projects>
		);
	};
  
	return (
		<Wrapper>
			<LoaderTimeout isLoading={loading} coverAll={true} pandingExtraTime={2000}>
				<TopPanel user={{ userName, email }} handleRouteBack={ () => setProject(false) } />
				{ renderContent() }
			</LoaderTimeout>
		</Wrapper>
	);
}

export default Dashboard;
