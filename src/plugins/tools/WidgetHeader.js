import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Divider, Icon } from '@material-ui/core';
import styled from 'styled-components';

import * as access from 'plugins/access'; 

const Header = styled(Typography)`
	color: ${ access.color('backgrounds.primary')};
	font-size: 15px; 
	padding: 5px 0; 
	display: flex; 
	align-items: center; 
	justify-content: space-between;
	height: 30px;
	font-family: Cabin !important;
`;

const WidgetHeader = (props) => {
	const { title, icon, showDivider, onIconClick } = props;
	return (
		<>
			<Header>
				{access.translate(title)}
				<Icon fontSize={'small'} onClick={ onIconClick } >{icon}</Icon>
			</Header>
			{ showDivider && <Divider /> }
		</>
	);
};

WidgetHeader.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	showDivider: PropTypes.bool,
	onIconClick: PropTypes.func,
};

WidgetHeader.defaultProps = {
	title: 'Widget Header',
	icon: 'check',
	showDivider: true,
	onIconClick: () => null
};

export default WidgetHeader;