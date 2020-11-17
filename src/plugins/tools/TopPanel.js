import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { projectListState } from 'plugins/dashboard/tree/atoms';

import styled from 'styled-components';
import access, { translate } from 'plugins/access';
import { Divider, Tooltip, Avatar, IconButton, Typography, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Popper from '@material-ui/core/Popper'; 

import ActionButtons from 'plugins/project/components/ActionButtons';
import { useDisplayAction } from 'plugins/dashboard/hooks/useDisplayAction';


const Panel = styled.div`
	position: absolute;
	height: 60px;
	right: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1;
`;

const LeftWrap = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	width: 235px;
	padding: 0 15px;
	background: ${ props => props.background } !important;
	box-shadow:  10px 0px 10px -20px rgba(0,0,0,0.75);
`;

const UserTitleWrap = styled.div`
	margin-left: 10px;
	overflow: hidden;
	width: 100%;
	white-space: nowrap;
`;

const OverflowTypo = styled(Typography)`
	text-overflow: ellipsis;
	width: 100%;
	overflow: hidden;
`;

const EmailTypo = styled(OverflowTypo)`
	font-size: 13px !important;
	color: #555;
`;

const NameTypo = styled(OverflowTypo)`
	font-weight: 600 !important;
`;

const RightWrap = styled.div`
	background: ${ access.color('backgrounds.content') };
	align-items: center;
	display: flex;
	justify-content: flex-end;
	flex: 1;
	padding: 0 25px;
	height: 100%;
`;

const MenuIcon = styled(IconButton)`
	padding: 5px !important;
	background: ${ props => props.isopen === 'true' ? 'transparent' : access.color('backgrounds.light') } !important;
	transform: rotate(${ props => props.isopen === 'true' ? '90deg' : '0deg' });
	transition: transform 0.15s ease-in-out !important;
`;

const TopPanel = () => { 
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const existsProjects = useRecoilValue(projectListState);
	const actions = ['copy', 'download'];
	const displayActions = useDisplayAction(actions);

    
	const userName = localStorage.getItem('gen-user-name');
	const email = localStorage.getItem('gen-user-email');

	const handleClose = () => {
		setOpen(false);
	};
  
	const handleLogout = () => {
		localStorage.clear(); 
		window.location.href = '/login';
	};

	const UserTitle = () => (
		<UserTitleWrap>
			<NameTypo>
				{userName}
			</NameTypo>
			<EmailTypo>
				{email}
			</EmailTypo>
		</UserTitleWrap>
	);

	return (
		<Panel background={ access.color('backgrounds.secondary') }>
			<LeftWrap background={existsProjects.length || window.location.pathname.includes('project') ? access.color('backgrounds.light') : access.color('backgrounds.content')  } >
				<Avatar variant={ 'rounded' } alt={ 'avatar-picsum' } src={ 'https://picsum.photos/200' } />
				<UserTitle /> 
			</LeftWrap>

			<RightWrap>

				{ 
					(existsProjects.length > 0 || location.pathname.includes('project')) && 
					<>
						<ActionButtons />
						<Divider orientation={'vertical'} style={{ height: '35%', margin: '0 15px 0 20px' }} />
					</>
				}
				
				<Tooltip title={translate('Menu')}>
					<MenuIcon
						ref={anchorRef}
						size={'small'}
						isopen={ open.toString() }
						onClick={() => setOpen(!open)}>
						<LinearScaleIcon fontSize={'small'} />
					</MenuIcon>
				</Tooltip>
				
			</RightWrap>

			<Popper open={open} anchorEl={anchorRef.current}  role={undefined} transition disablePortal placement={ 'bottom-end' }>
				<Paper style={{ marginTop: 10 }} >
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList dense={ true } autoFocusItem={open} id="menu-list-grow">
							{ displayActions && actions.map(action => (
								<MenuItem key={ action } >{translate(action)}</MenuItem>
							)) }
							<MenuItem onClick={ handleLogout }>{translate('Logout')}</MenuItem>
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Popper>

		</Panel>
	);

};

TopPanel.propTypes = {
	user: PropTypes.object
};

TopPanel.defaultProps = {
	user: {}
};

export default TopPanel;
