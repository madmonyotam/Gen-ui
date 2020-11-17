import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar, Tooltip } from '@material-ui/core';

import access, { translate } from 'plugins/access';
import styled from 'styled-components'; 

const Item = styled.div`
    height: 45px;
    width: calc(100% - 50px);
    padding: 5px 10px 5px 30px;
    display: flex;
    align-items: center;
		justify-content: space-between;
    background: transparent;
    border-radius: 2px;
    margin-bottom: 10px;
    :hover {
        background: ${ access.color('backgrounds.hover') };
    }
`;

const Left = styled.div`
    display: flex;
    align-items: center;
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

const ContributeBadge = styled(Badge)`
	display: flex;
	justify-content: center;
	width: 50px;
	font-size: 12px;
	padding: 4px;
	overflow: hidden;
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
    color: ${access.color('texts.title') };
`;


const UserListItem = props => {
	const { user } = props;

	return (
		<Item> 
			<Left>
				<Avatar variant={'rounded'} alt={'avatar-picsum'} src={user.avatar} />
				<TextsContainer>

					<div style={{ display: 'flex', alignItems: 'center' }}>

						<Badge level={user.ownership} >
							{translate(user.ownership)}
						</Badge>
			
						
						<UserName>
							{user.name}
						</UserName>
					</div>

					<Typography style={{ fontSize: 13 }}>
						{ user.email }
					</Typography>
									
				</TextsContainer> 
			</Left>
			<Tooltip title={ translate('Contributes')} placement={ 'top' } enterDelay={ 500 }>
				<ContributeBadge level={'member'}>
					{ user.contribute }
				</ContributeBadge>
			</Tooltip>
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
