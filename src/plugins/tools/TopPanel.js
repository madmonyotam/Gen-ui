import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Tooltip, Avatar, Divider, IconButton, Typography, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import Popper from '@material-ui/core/Popper';

const Panel = styled.div`
  position: absolute;
  height: 60px;
  right: 0;
  left: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  background: ${ props => props.background };
  box-shadow: 0 2px 10px -5px  ${ access.color('backgrounds.primary') };
  z-index: 1;
`;

const MenuIcon = styled(IconButton)`
  transform: rotate(${ props => props.rotate });
  transition: all 0.15s ease-in-out;
`;

const TopPanel = ({ user }) => {

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleClose = () => {
		setOpen(false);
	};
  
	return (
		<Panel background={ access.color('backgrounds.secondary') }>
			<Tooltip title={access.translate('Menu')}>
				<MenuIcon 
					ref={anchorRef}
					onClick={() => setOpen(!open)}
					rotate={open ? '90deg' : '0deg'}>
					<LinearScaleIcon />
				</MenuIcon>
			</Tooltip>
			<Divider orientation={'vertical'} style={{ height: '60%', margin: '0 10px' }} /> 

			<Avatar alt={ 'avatar-picsum' } src={ 'https://picsum.photos/200' } />
			<div style={{ margin: '0 10px' }}>
				<Typography style={{ fontSize: 15, fontWeight: 600 }}>
					{user.userName }
				</Typography>
				<Typography style={{ fontSize: 13, marginTop: -5, color: '#555'  }}>
					{user.email }
				</Typography>
			</div>
        

			<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				<Paper>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList dense={ true } autoFocusItem={open} id="menu-list-grow">
							<MenuItem onClick={handleClose}>{ access.translate('Save As') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('New Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Open Project') }</MenuItem>
							<MenuItem onClick={handleClose}>{ access.translate('Remove Project') }</MenuItem>
							<Divider style={{ margin: '5px 0'}} /> 
							<MenuItem  onClick={handleClose}>{access.translate('Logout')}</MenuItem>
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
