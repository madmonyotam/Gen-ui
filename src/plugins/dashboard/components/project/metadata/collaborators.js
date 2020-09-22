import React from 'react'; 
import { Icon, Tooltip } from '@material-ui/core';

import { useRecoilValue } from 'recoil';
import { collaborators } from 'plugins/dashboard/tree/selectors';

import * as access from 'plugins/access';
import styled from 'styled-components';
import DataBox from  './data-box';
import UserListItem from './user-list-item';

const List = styled.div`
	overflow-y: auto;
	padding: 5px 0 0;
`;

const CollaboratorsList = () => {

	const users = useRecoilValue(collaborators);

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



export default CollaboratorsList;
