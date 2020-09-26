import React from 'react';
import PropTypes from 'prop-types'; 
import { useRecoilValue, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { selectedProjectId, projectListState } from 'plugins/dashboard/tree/atoms';
import { deleteProject } from 'plugins/dashboard/actions';
import { useDisplayAction } from 'plugins/dashboard/hooks/useDisplayAction';

import { Button, Icon } from '@material-ui/core';
import * as access from 'plugins/access'; 

const ActionButtons = () => {
	const history = useHistory();

	const projectId = useRecoilValue(selectedProjectId);
	const [projectList, setProjectList] = useRecoilState(projectListState);
	const displayEnter = useDisplayAction('enter');
	const displayActions = useDisplayAction(['generate', 'copy', 'download']);

	const handleDeleteProject = async e => {
		e.stopPropagation();

		const email = localStorage.getItem('gen-user-email');

		const success = await deleteProject(projectId, email);

		if (success) {
			const list = projectList.filter(p => p.id !== projectId);
			setProjectList(list);
		}
	};


	return (
		
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: displayActions ? 1 : 0 }}>
			{/* {
				displayEnter && (
					<Button
						variant={'contained'}
						color={'primary'}
						size={'small'}
						disableElevation
						onClick={ e => { history.push(`/project/${ projectId }` ); } }
						style={{ marginRight: 15 }}
						endIcon={<Icon fontSize={'small'}>keyboard_return</Icon>} >
						{access.translate('Enter')}
					</Button>
				)
				
			}
			{
				displayActions && (
					<Button
						variant={'contained'}
						color={'secondary'}
						size={'small'}
						disableElevation
						onClick={e => { history.push(`/project/${projectId}`); }}
						style={{ marginRight: 15 }}
						endIcon={<Icon fontSize={'small'}>play_circle_outline</Icon>} >
						{access.translate('Generate')}
					</Button>
				)
			}
			<Button
				variant={'contained'}
				size={'small'}
				disableElevation
				onClick={ handleDeleteProject }
				endIcon={<Icon fontSize={'small'}>delete_outline</Icon>} >
				{access.translate('Delete')}
			</Button> */}
		</div>

	);
};
 
export default ActionButtons;