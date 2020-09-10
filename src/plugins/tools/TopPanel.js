import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Divider, Tooltip, Avatar, IconButton, Typography, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Popper from '@material-ui/core/Popper'; 

import ProjectsActionButtons from 'plugins/dashboard/components/ProjectsActionButtons';

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
	background: ${ access.color('backgrounds.light') };
	box-shadow:  10px 0px 10px -20px rgba(0,0,0,0.75);
`;

const RightWrap = styled.div`
	background: ${ access.color('backgrounds.content') };
	align-items: center;
	display: flex;
	justify-content: flex-end;
	flex: 1;
	padding: 0 25px 0 15px;
	height: 100%;
	// box-shadow: 0px 10px 10px -20px rgba(0,0,0,0.75);
	// border-bottom: 1px solid ${ access.color('backgrounds.content') };
`;

const MenuIcon = styled(IconButton)`
	padding: 5px !important;
	background: ${ props => props.isopen === 'true' ? 'transparent' : access.color('backgrounds.light') } !important;
	transform: rotate(${ props => props.isopen === 'true' ? '90deg' : '0deg' });
	transition: transform 0.15s ease-in-out !important;
`;

const TopPanel = () => { 
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
    
	const userName = localStorage.getItem('gen-user-name');
	const email = localStorage.getItem('gen-user-email');

	const handleClose = () => {
		setOpen(false);
	};
  
	const handleLogout = () => {
		localStorage.clear(); 
		window.location.href = '/login';
	};

	return (
		<Panel background={ access.color('backgrounds.secondary') }>
			<LeftWrap>
				<Avatar alt={ 'avatar-picsum' } src={ 'https://picsum.photos/200' } />
				<div style={{ margin: '0 10px', textAlign: 'left' }}>
					<Typography style={{ fontSize: 15, fontWeight: 600 }}>
						{ userName }
					</Typography>
					<Typography style={{ fontSize: 13, marginTop: -5, color: '#555'  }}>
						{ email }
					</Typography>
				</div>
			</LeftWrap>

			<RightWrap>
				<ProjectsActionButtons />
				
				<Divider orientation={'vertical'} style={{ height: '35%', margin: '0 15px 0 20px' }} />

				<Tooltip title={access.translate('Menu')}>
					<MenuIcon
						ref={anchorRef}
						size={'small'}
						isopen={ open.toString() }
						onClick={() => setOpen(!open)}>
						<LinearScaleIcon fontSize={'small'} />
					</MenuIcon>
				</Tooltip>
				{/* <Divider orientation={'vertical'} style={{ height: '60%', margin: '0px 15px' }} />
				<Tooltip title={access.translate('Back')}>
					<IconButton
						size={'small'}
						onClick={() => window.history.back()}>
						<ArrowBackIcon fontSize={'small'} />
					</IconButton>
				</Tooltip> */}
			</RightWrap>
			<Popper open={open} anchorEl={anchorRef.current}  role={undefined} transition disablePortal placement={ 'bottom-end' }>
				<Paper style={{ marginTop: 10 }} >
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList dense={ true } autoFocusItem={open} id="menu-list-grow">
							<MenuItem onClick={handleClose}>{ access.translate('Save As') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('New Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Open Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Remove Project') }</MenuItem>
							<Divider style={{ margin: '5px 0'}} /> 
							<MenuItem onClick={ handleLogout }>{access.translate('Logout')}</MenuItem>
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
