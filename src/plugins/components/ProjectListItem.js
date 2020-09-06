import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip, Icon, IconButton } from '@material-ui/core';
import styled from 'styled-components';

import * as access from 'plugins/access';

import moment from 'moment';

// const gradient = 'linear-gradient(-90deg, rgba(255,255,255,0.5) 15%, rgba(57,83,111,.75) 100%)';
const boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';

const ProjectCard = styled.div(props => ({
	position: 'relative',
	cursor: 'pointer',
	color: `${ props.selected ? '#fefefe' : '#666'  } !important`,
	textShadow: `${ props.selected ? '1px 1px 2px #333' : 'none' } !important`,
	boxShadow: !props.selected ? 'none' : boxShadow,
	border: props.selected ? '1px solid rgba(255,255,255,0)' : '1px solid rgba(57,83,111, 0.14)',
	padding: '5px 10px',
	marginBottom: '10px',
	borderRadius: 4,
	height: 65,
	display: 'flex',
	flexDirection: 'column',
	background: `${props.selected ? access.color('backgrounds.active') : access.color('backgrounds.code') } !important`,
	transition: 'all 0.15s ease-in-out',
}));
	
const SideIcons = styled.div`
	position: absolute;
	right: 10px; 
	top: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	text-shadow: none !important;
	transition: all 0.2s ease-in-out;
	transform: scale(0.75) translate3d(0, -50%, 0);
	opacity: 0;

	${ ProjectCard }:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;

const InnerDetail = styled(Typography)`
	padding-left: ${ props => props.selected ? 30 : 25 }px;
	font-size: 13px !important;
`;

const ProjectListItem = props => {
	const { 
		project, 
		selected, 
		onClick, 
		onEnterProject, 
		onProjectDelete 
	} = props;
	
	const handleEnterProject = e => {
		e.preventDefault();
		e.stopPropagation();
		if (onEnterProject) onEnterProject();
	};

	const handleDeleteProject = e => {
		e.preventDefault();
		e.stopPropagation();
		if (onProjectDelete) onProjectDelete(project.id);
	};

	return (
		<ProjectCard onClick={ onClick } selected={ selected } >
			
			<div style={{ display: 'flex', alignItems: 'center' }} >
				<Icon fontSize={ selected ? 'default' : 'small' } >{selected ? 'bubble_chart' : 'scatter_plot'}</Icon>
				<Typography style={{ marginLeft: 5, fontSize: 15, color: selected ? '#fff':'#333' }} >
					{project.name}
				</Typography>
			</div>
			<div>
				<InnerDetail selected={ selected } >
					{moment(project.createdTime).format('ll | HH:mm')}
				</InnerDetail>
				<InnerDetail selected={selected} >
					{project.createdBy}
				</InnerDetail>
			</div>

			<SideIcons >
				<Tooltip title={ access.translate('Enter') } >
					<IconButton size={ 'small' } onClick={ handleEnterProject }>
						<Icon fontSize={ 'small' } style={{ color: selected ?'#fefefe': '#666' }}> keyboard_return </Icon>
					</IconButton>
				</Tooltip>
				<Tooltip title={ access.translate('Delete') } >
					<IconButton size={'small'} onClick={ handleDeleteProject }>
						<Icon fontSize={ 'small' } style={{ color: selected ?'#fefefe': '#666' }}> delete_outline </Icon>
					</IconButton>
				</Tooltip>
			</SideIcons>
		</ProjectCard>
	); 
};

ProjectListItem.propTypes = {
	project: PropTypes.object,
	selected: PropTypes.bool,
	onClick: PropTypes.func,
	onEnterProject: PropTypes.func,
	onProjectDelete: PropTypes.func,
};

ProjectListItem.defaultProps = {
	project: {},
	selected: false,
	onClick: () => null,
	onEnterProject: () => null,
	onProjectDelete: () => null,
};

export default ProjectListItem;
