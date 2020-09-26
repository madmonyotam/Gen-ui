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

const WidgetIcon = styled(Icon)`
	cursor: ${ props => props.onIconClick ? 'pointer' : 'default' };
`;

const WidgetHeader = (props) => {
	const { title, icon, showDivider, onIconClick, style } = props;
	return (
		<>
			<Header style={{ ...style }}>
				{access.translate(title)}
				<WidgetIcon fontSize={'small'} onClick={onIconClick}>
					{ icon }
				</WidgetIcon>
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
	style: PropTypes.object,
};

WidgetHeader.defaultProps = {
	title: 'Widget Header',
	icon: 'check',
	showDivider: true,
	style: {},
	onIconClick: null
};

export default WidgetHeader;