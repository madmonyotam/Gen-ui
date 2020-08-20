import React from 'react';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Tooltip, Avatar, Divider, IconButton, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

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
  box-shadow: 0 2px 10px -5px  ${ props => access.color('backgrounds.primary') };
  z-index: 1;
`;


const TopPanel = props => {

  return (
    <Panel background={ access.color('backgrounds.secondary') }>
      <div style={{ alignItems: 'center', display: 'flex', height: '100%' }}>

        <Avatar alt={ 'avatar-picsum' } src={ 'https://picsum.photos/200' } />
        <Typography style={{ fontSize: 15, margin: '0 10px' }}>
          { props.userName }
        </Typography>
        
        <Divider orientation={'vertical'} style={{ height: '60%', margin: '0 5px' }}/>

        <Tooltip title={ access.translate('Menu') }>
          <IconButton>
            <LinearScaleIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Tooltip title={ access.translate('Logout') }>
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
    </Panel>
  )

};

TopPanel.defaultProps = {
  userName: 'User Name'
}

export default TopPanel;