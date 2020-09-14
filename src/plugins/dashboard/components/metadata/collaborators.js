import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from '@material-ui/core';

import * as access from 'plugins/access';
import styled from 'styled-components';
import DataBox from  './data-box';
import UserListItem from './user-list-item';

const List = styled.div`
	overflow-y: auto;
	padding: 5px 0 0;
`;

const CollaboratorsList = props => {
	const { users } = props; 

	const renderUsers = user => (
		<UserListItem user={ user } key={ user.id }/>
	);

	const RightButtons = () => (
		<Tooltip title={access.translate('Invite People')}>
			<Icon style={{ cursor: 'pointer' }} fontSize={'small'}>add</Icon>
		</Tooltip>
	); 

	return (
		<DataBox icon={'people'} title={'collaborators'} buttons={ <RightButtons /> } badge={ users.length } >
			<List>
				{ 
					users && users.map(renderUsers) 
				}
			</List>
		</DataBox>
	);
};

CollaboratorsList.propTypes = {
	users: PropTypes.array,
	label: PropTypes.string,
    
};

CollaboratorsList.defaultProps = {
	users: [],
	label: ''
};

export default CollaboratorsList;
