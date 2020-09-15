import React, { useEffect } from 'react'; 
import { Icon, Tooltip } from '@material-ui/core';

import { useRecoilState, useRecoilValue } from 'recoil';
import { projectUsersState, projectState } from 'plugins/dashboard/tree/atoms';
import { getProjectUsers } from 'plugins/dashboard/actions';

import * as access from 'plugins/access';
import styled from 'styled-components';
import DataBox from  './data-box';
import UserListItem from './user-list-item';

const List = styled.div`
	overflow-y: auto;
	padding: 5px 0 0;
`;

const CollaboratorsList = () => {

	const [users, setUsers] = useRecoilState(projectUsersState);
	const project = useRecoilValue(projectState);

	const fetchUsers = async () => {
		const data = await getProjectUsers();
		setUsers(data);
	};

	useEffect(() => {
		fetchUsers();
	}, [project]);

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
