import React from 'react'; 
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
// import styled from 'styled-components';
// import * as access from 'plugins/access'; 


const ProjectDetailsForm = ({ project }) => {
	
	return ( 
		<div>
			<Typography>
				Project Details
			</Typography>
			{
				project && <pre>{JSON.stringify(project, null, 4)}</pre>
			}
		</div>
	);
}; 

ProjectDetailsForm.propTypes = {
	project: PropTypes.object
};

ProjectDetailsForm.defaultProps = {
	project: {}
};

export default ProjectDetailsForm;
