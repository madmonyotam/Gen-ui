import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Tooltip, Avatar, Divider, IconButton, Typography, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Popper from '@material-ui/core/Popper'; 

const Panel = styled.div`
  position: absolute;
  height: 60px;
  right: 0;
  left: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${ props => props.background };
  box-shadow: 0 2px 8px -4px  ${ access.color('backgrounds.primary') };
  border-bottom: 1px solid ${ props => props.background };
  z-index: 1;
`;

const Wrap = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
`;

const MenuIcon = styled(IconButton)`
  transform: rotate(${ props => props.rotate });
  transition: transform 0.15s ease-in-out;
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
			<Wrap>
				<Tooltip title={access.translate('Menu')}>
					<MenuIcon 
						ref={anchorRef}
						size={ 'small' }
						onClick={() => setOpen(!open)}
						rotate={open ? '90deg' : '0deg'}>
						<LinearScaleIcon fontSize={ 'small' }/>
					</MenuIcon>
				</Tooltip>
				<Divider orientation={'vertical'} style={{ height: '60%', margin: '0px 15px' }} />  
				<Tooltip title={access.translate('Back')}>
					<IconButton 
						size={'small'}
						onClick={ () => window.history.back() }>
						<ArrowBackIcon fontSize={ 'small' }/>
					</IconButton>
				</Tooltip>
			</Wrap>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ margin: '0 10px', textAlign: 'right' }}>
					<Typography style={{ fontSize: 15, fontWeight: 600 }}>
						{ userName }
					</Typography>
					<Typography style={{ fontSize: 13, marginTop: -5, color: '#555'  }}>
						{ email }
					</Typography>
				</div>
				<Avatar alt={ 'avatar-picsum' } src={ 'https://picsum.photos/200' } />
			</div>
			<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				<Paper>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList dense={ true } autoFocusItem={open} id="menu-list-grow">
							{/* <MenuItem onClick={handleClose}>{ access.translate('Save As') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('New Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Open Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Remove Project') }</MenuItem>
							<Divider style={{ margin: '5px 0'}} />  */}
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
