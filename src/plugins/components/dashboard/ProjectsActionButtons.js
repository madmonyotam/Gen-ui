import React from 'react';
import PropTypes from 'prop-types'; 

import { Divider, Button, Icon } from '@material-ui/core';
import * as access from 'plugins/access'; 

const ProjectsActionButtons = (props) => {
	const { project, onProjectDelete, style } = props;
	return (
		<div style={{ ...style }}>
			<Divider style={{ marginBottom: '15px' }} />
			<div style={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					<Button
						variant={'contained'}
						color={'primary'}
						size={'small'}
						style={{ marginRight: 15 }}
						endIcon={<Icon fontSize={'small'}>keyboard_return</Icon>} >
						{access.translate('Enter')}
					</Button>
					<Button
						variant={'contained'}
						size={'small'}
						onClick={() => onProjectDelete(project.id)}
						endIcon={<Icon fontSize={'small'}>delete_outline</Icon>} >
						{access.translate('Delete')}
					</Button>
				</div>
				{/* <Button
					variant={'contained'}
					size={'small'}
					color={'secondary'}
					endIcon={<Icon fontSize={'small'}>save</Icon>} >
					{access.translate('save')}
				</Button> */}
			</div>
		</div>

	);
};
ProjectsActionButtons.propTypes = {
	project: PropTypes.object,
	style: PropTypes.object,
	onProjectDelete: PropTypes.func,
};

ProjectsActionButtons.defaultProps = {
	project: {},
	style: {},
	onProjectDelete: () => null
};

export default ProjectsActionButtons;