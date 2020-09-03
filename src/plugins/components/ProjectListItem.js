import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip, Icon, IconButton } from '@material-ui/core';
import styled from 'styled-components';

import * as access from 'plugins/access';

import moment from 'moment';

const gradient = 'linear-gradient(-90deg, rgba(255,255,255,0.5) 15%, rgba(57,83,111,.75) 100%)';
const boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';

const ProjectCard = styled.div(props => ({
	position: 'relative',
	cursor: 'pointer',
	color: `${ props.selected ? '#fefefe' : '#666'  } !important`,
	textShadow: `${ props.selected ? '1px 1px 2px #333' : 'none' } !important`,
	boxShadow: props.selected ? 'none' : boxShadow,
	padding: '5px 10px',
	marginBottom: '10px',
	borderRadius: 6,

	display: 'flex',
	flexDirection: 'column',
	background: `${props.selected ? 'rgba(57,83,111, 1)' : 'transparent' } !important`,
	transition: 'all 0.25s ease-in-out',
}));
	
const ReturnIcon = styled.div`
	position: absolute;
	right: 10px;
	color: #666;
	text-shadow: none !important;
	top: 50%;
	transition: all 0.2s ease-in-out;
	transform: translate3d(-50%, -50%, 0);
	opacity: 0;

	${ ProjectCard }:hover & {
		transform: translate3d(0, -50%, 0);
		opacity:1;
	}
`;

const InnerDetail = styled(Typography)`
	padding-left: ${ props => props.selected ? 30 : 25 }px;
	font-size: 13px !important;
`;

const ProjectListItem = ({ project, selected, onClick, onEnterProject }) => {

	const handleEnterProject = e => {
		e.preventDefault();
		e.stopPropagation();
		if (onEnterProject) onEnterProject();
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
					{moment(project.createdTime).format('ll | HH:MM')}
				</InnerDetail>
				<InnerDetail selected={selected} >
					{project.createdBy}
				</InnerDetail>
			</div>

			<ReturnIcon onClick={ handleEnterProject }>
				<Tooltip title={ access.translate('Enter') } >
					<IconButton size={ 'small' }>
						<Icon> keyboard_return </Icon>
					</IconButton>
				</Tooltip>
			</ReturnIcon>
		</ProjectCard>
	); 
};

ProjectListItem.propTypes = {
	project: PropTypes.object,
	selected: PropTypes.bool,
	onClick: PropTypes.func,
	onEnterProject: PropTypes.func,
};

ProjectListItem.defaultProps = {
	project: {},
	selected: false,
	onClick: () => null,
	onEnterProject: () => null,
};

export default ProjectListItem;