import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from '@material-ui/core';

import * as access from 'plugins/access';
import styled from 'styled-components';
import DataBox from  './data-box';
import UserListItem from './user-list-item';

const List = styled.div`
	height: ${ props => props.height }px;
	overflow-y: auto;
	padding: 5px 0 0;
`;


const CollaboratorsList = props => {
	const { users } = props; 
	const [listHeight, setListHeight] = useState(150);
	const listRef = useRef(null);
	const renderUsers = user => (
		<UserListItem user={ user } key={ user.id }/>
	);

	const RightButtons = () => (
		<Tooltip title={access.translate('Invite People')}>
			<Icon style={{ cursor: 'pointer' }} fontSize={'small'}>add</Icon>
		</Tooltip>
	); 

	useEffect(() => {
		if (listRef && listRef.current) {
			const listHeight = listRef.current.parentElement.offsetHeight - 40;
			setListHeight(listHeight);
		}
	}, [listRef]);

	return (
		<DataBox icon={'people'} title={'collaborators'} buttons={ <RightButtons /> } badge={ users.length } >
			<List ref={listRef}  height={listHeight }>
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