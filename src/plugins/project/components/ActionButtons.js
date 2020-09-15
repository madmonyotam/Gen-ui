import React from 'react';
import PropTypes from 'prop-types'; 

import { Button, Icon } from '@material-ui/core';
import * as access from 'plugins/access'; 

const ActionButtons = props => {
	const { project, onProjectDelete } = props;
	return (
		
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<Button
				variant={'contained'}
				color={'primary'}
				size={'small'}
				disableElevation
				style={{ marginRight: 15 }}
				endIcon={<Icon fontSize={'small'}>keyboard_return</Icon>} >
				{access.translate('Enter')}
			</Button>
			<Button
				variant={'contained'}
				size={'small'}
				disableElevation
				onClick={() => onProjectDelete(project.id)}
				endIcon={<Icon fontSize={'small'}>delete_outline</Icon>} >
				{access.translate('Delete')}
			</Button>
		</div>

	);
};

ActionButtons.propTypes = {
	project: PropTypes.object,
	onProjectDelete: PropTypes.func,
};

ActionButtons.defaultProps = {
	project: {},
	onProjectDelete: () => null
};

export default ActionButtons;