import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as access from 'plugins/access';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectUsersState, selectedProjectId } from 'plugins/dashboard/tree/atoms';
import { selectedProject } from 'plugins/dashboard/tree/selectors';

import { getUsersContributes } from 'plugins/dashboard/actions';

/* Components */
import ProjectMetadata from 'plugins/dashboard/components/project/metadata/';
import ContributesGraph from 'plugins/dashboard/components/project/ContributesGraph';
import ProjectCanvas from 'plugins/dashboard/components/project/ProjectCanvas'; 

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
	min-height: 60%;
	max-height: 60%;
`;

function ProjectBody() {

	const projectId = useRecoilValue(selectedProjectId);
	const project = useRecoilValue(selectedProject);
	const setUsers = useSetRecoilState(projectUsersState);

	const fetchUsers = async () => {
		const data = await getUsersContributes();
		setUsers(data);
	};

	useEffect(() => {
		fetchUsers();
	}, [projectId]);

	return (
		<Content className={'dashboard-content'}>
			<UpperCont>

				<ProjectMetadata style={{ marginRight: 20 }} />
				<ProjectCanvas />

			</UpperCont>
			<LineGraphCont>
				{ project && (<ContributesGraph />) }
			</LineGraphCont> 
		</Content>
	);
}

export default ProjectBody;
