import React, { useMemo } from 'react'; 
import PropTypes from 'prop-types'; 
import moment from 'moment';

import WidgetHeader from 'plugins/tools/WidgetHeader'; 

const ProjectMetadata = props => {
	const { project, style } = props;

	const setProject = project => ( !project ? [] : [
		{
			value: moment(project.createdTime).format('ll | HH:mm:ss'),
			label: 'Created at',
			editable: false,
			order: 2
		},
		{
			value: moment(project.updatedTime).format('ll | HH:mm:ss'),
			label: 'Updated at',
			editable: false,
			order: 3
		},
		{
			value: project.name,
			label: 'Title',
			editable: true,
			order: 0
		},
		{
			value: project.createdBy,
			label: 'Owner',
			editable: false,
			order: 1
		} 
	]);

	const details = useMemo(() => setProject(project), [project]);

	return ( 
		<div style={{ width: '100%', height: 250, ...style }}>
			<WidgetHeader title={ 'Metadata' } icon={ 'analytics' }/>
			
			<div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 40px)', overflowY: 'auto' }} >
				{
					details && details.map((det, i)=>{
						return <code key={i} style={{ display: 'flex', flexDirection: 'column', order: det.order }}> <strong><pre>{JSON.stringify(det.label, null, 4)}</pre></strong> <pre>{JSON.stringify(det.value, null, 4)}</pre></code>;
					})
				}
			</div>
		</div>
	);
}; 

ProjectMetadata.propTypes = {
	project: PropTypes.object
};

ProjectMetadata.defaultProps = {
	project: {}
};

export default ProjectMetadata;
