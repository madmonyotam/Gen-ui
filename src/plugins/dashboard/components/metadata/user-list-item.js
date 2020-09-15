import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar, Tooltip } from '@material-ui/core';

import * as access from 'plugins/access';
import styled from 'styled-components'; 

const Item = styled.div`
    height: 45px;
    width: calc(100% - 50px);
    padding: 5px 10px 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    border-radius: 2px;
    margin-bottom: 10px;
    :hover {
        background: ${ access.color('backgrounds.light') };
    }
`;
const Badge = styled.div`
	color: #fef;
	text-transform: capitalize;
	font-size: 11px;
	margin-right: 5px;
	padding: 2px 5px;
	background: ${props => access.color('backLevelColors.' + props.level)};
	color: ${props => access.color('frontLevelColors.' + props.level)};
	border-radius: 4px;
`; 

const TextsContainer = styled.div`
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 10px;
`;

const UserName = styled.span`
    font-size: 14px;
    color ${access.color('texts.title') };
`;


const UserListItem = props => {
	const { user } = props;

	return (
		<Item> 
			<Avatar variant={'rounded'} alt={'avatar-picsum'} src={user.avatar} />

			<TextsContainer>

				<div style={{ display: 'flex', alignItems: 'center' }}>

					{
						user.ownership && (
							<Badge level={user.ownership} >
								{access.translate(user.ownership)}
							</Badge>
						)
					}

					<Tooltip title={`${user.firstName} ${user.lastName}`} placement={'right'}>
						<UserName>
							{user.userName}
						</UserName>
					</Tooltip>
				</div>

				<Typography style={{ fontSize: 13 }}>
					{ user.email }
				</Typography>
                
			</TextsContainer> 
		</Item>
	); 
};

UserListItem.propTypes = {
	user: PropTypes.object,
};

UserListItem.defaultProps = {
	user: {}
};

export default UserListItem;