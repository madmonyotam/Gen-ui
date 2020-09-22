import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Typography, Tooltip, Icon, IconButton } from '@material-ui/core';

import { projectListState, selectedProjectId } from 'plugins/dashboard/tree/atoms';
import { deleteProject } from 'plugins/dashboard/actions';

import * as access from 'plugins/access';

import moment from 'moment';

const ProjectCard = styled.div`
	position: relative;
	cursor: pointer;
	color: #333;
	box-shadow: ${ props => props.selected ? '0px 0px 12px -5px rgba(0, 0, 0, 0.2)' : 'none' };
	text-shadow: ${ props => props.selected ? '-.5px -.5px 1px #fefefe' : '.5px .5px 1px #fefefe' };
	border:  1px solid rgba(186,196,206, ${ props => props.selected ? '0.25' : '0.15' });
	padding: 5px 10px;
	margin-bottom: 10px;
	border-radius: 4px;
	height: 65px;
	display: flex;
	flex-direction: column;
	background: ${ props => props.selected ? access.color('colors.blueLight03') : access.color('backgrounds.code') } ;
	transition: all 0.15s ease-in-out;
`;
	
const SideIcons = styled.div`
	position: absolute;
	right: 10px; 
	top: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	text-shadow: none !important;
	transition: all 0.05s linear;
	transform: scale(0.95) translate3d(0, -50%, 0);
	transform-origin: center center;
	opacity: 0;

	${ ProjectCard }:hover & {
		transform: scale(1) translate3d(0, -50%, 0);
		opacity:1;
	}
`;

const InnerDetail = styled(Typography)`
	padding-left: 25px;
	font-size: 13px !important;
	color: ${ props => props.selected ? '#212' : '#444' };
`;

const ProjectListItem = props => {

	const history = useHistory();
	const [projectList, setProjectList] = useRecoilState(projectListState);
	const setProjectId = useSetRecoilState(selectedProjectId);
	const { project, selected } = props;
	
	const handleEnterProject = e => {
		e.stopPropagation(); 
		history.push('/project/'+project.id);
	};

	const handleDeleteProject = async e => {
		e.stopPropagation();
		
		const { id } = project;
		const email = localStorage.getItem('gen-user-email');

		const success = await deleteProject(id, email);

		if (success) {
			const list = projectList.filter(p => p.id !== id);
			setProjectList(list);
		}
	};

	return (
		<ProjectCard onClick={ () => { setProjectId(project.id); } } selected={ selected } >
			
			<div style={{ display: 'flex', alignItems: 'center' }} >
				<Icon fontSize={ 'small' } >{ selected ? 'bubble_chart' : 'scatter_plot' }</Icon>
				<Typography style={{ marginLeft: 5, fontSize: 15, color: '#333' }} >
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
						<Icon fontSize={ 'small' } style={{ color: '#333' }}> keyboard_return </Icon>
					</IconButton>
				</Tooltip>
				<Tooltip title={ access.translate('Delete') } >
					<IconButton size={'small'} onClick={ handleDeleteProject }>
						<Icon fontSize={ 'small' } style={{ color: '#333' }}> delete_outline </Icon>
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
	onDeleteProject: PropTypes.func,
};

ProjectListItem.defaultProps = {
	project: {},
	selected: false,
	onClick: () => null,
	onEnterProject: () => null,
	onDeleteProject: () => null,
};

export default ProjectListItem;
