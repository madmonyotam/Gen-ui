import React from 'react';
import styled from 'styled-components';

import * as access from 'plugins/access';
 
// import Panel from 'plugins/tools/Panel'; 
import LibrariesPanel from './components/LibrariesPanel';

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

const Content = styled.div`
	display: flex; 
	flex-direction: column; 
	flex: 1;
	padding: 15px 25px;
	background: ${access.color('backgrounds.content')};
`;

const Project = () => { 

	const project = {
		libraries: ['123', '234', 'examples'],
		projectName: 'Gen'
	};

	return (
		<Wrap>
			<div style={{ display: 'flex', flex: 1 }}> 
				<LibrariesPanel { ...project } />
				<Content>

				</Content>
			</div>
		</Wrap>
	);
};

export default Project;
