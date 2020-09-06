import React, { useMemo } from 'react'; 
import PropTypes from 'prop-types';
import { Typography, Divider, Button, Icon } from '@material-ui/core';
import styled from 'styled-components';
import * as access from 'plugins/access'; 
import moment from 'moment';

const Header = styled(Typography)`
	color: ${ access.color('backgrounds.primary') };
	font-size: 15px; 
	padding: 5px 0; 
	display: flex; 
	align-items: center; 
	justify-content: space-between;
	height: 30px;
`;


const ProjectMetadata = ({ project, onProjectDelete }) => {

	// console.log({project});
	
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
		<div style={{ height: '100%' }}>
			<Header>
				{ access.translate('Metadata') }
				<Icon fontSize={ 'small' }>analytics</Icon>
			</Header>
			<Divider />
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 40px)' }}>
				<div style={{ flex: 1 }}>
					{
						details && details.map((det, i)=>{
							return <code key={i}> <strong><pre>{JSON.stringify(det.label, null, 4)}</pre></strong> <pre>{JSON.stringify(det.value, null, 4)}</pre></code>;
						})
					}
				</div>
				<Divider style={{ marginBottom: '15px' }} />
				<div style={{ height: 35, display: 'flex', alignItems: 'center' }}>
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
						onClick={ () => onProjectDelete(project.id) }
						endIcon={<Icon fontSize={'small'}>delete_outline</Icon>} >
						{access.translate('Delete')}
					</Button>
					<Button
						variant={'contained'}
						size={'small'}
						style={{ position: 'absolute', right: 15, bottom: 15 }}
						color={'secondary'}
						endIcon={<Icon fontSize={'small'}>save</Icon>} >
						{access.translate('save')}
					</Button>
				</div>
			</div>
		</div>
	);
}; 

ProjectMetadata.propTypes = {
	project: PropTypes.object,
	onProjectDelete: PropTypes.func,
};

ProjectMetadata.defaultProps = {
	project: {},
	onProjectDelete: () => null
};

export default ProjectMetadata;
