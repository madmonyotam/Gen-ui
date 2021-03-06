import React from 'react';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import { selectedProject } from 'plugins/dashboard/tree/selectors';

import WidgetHeader from 'plugins/tools/WidgetHeader';
import ProjectTitle from './title';
import ProjectDates from './dates';
import CollaboratorList from './collaborators';

const ProjectMetadata = () => {

	const project = useRecoilValue(selectedProject);
 
	return (
		<div style={{ flex: 1.5, marginRight: 20 }}>
			<WidgetHeader title={'Details'} icon={'description'} />

			{
				project && (
					<div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 40px)', overflow: 'hidden', width: '100%' }} >
						<ProjectTitle projectTitle={project.name}  /> 
						<ProjectDates created={ project.createdTime } updated={ project.updatedTime }/>
						<CollaboratorList />
					</div>
				)
			} 
		</div>
	);
};

ProjectMetadata.propTypes = {
	project: PropTypes.object,
	style: PropTypes.object,
};

ProjectMetadata.defaultProps = {
	project: {},
	style: {}
};

export default ProjectMetadata;
