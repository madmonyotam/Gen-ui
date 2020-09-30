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

const ActionsSide = styled.div`
	display: flex;
	align-items: center;
	gap: ${ (p) => p.gap };
`;

const WidgetIcon = styled(Icon)`
	cursor: ${ props => props.onClick ? 'pointer' : 'default' };
`;

const WidgetHeader = (props) => {
	const { title, icon, showDivider, onIconClick, style, actionGap, actionBtns } = props;
	return (
		<>
			<Header style={{ ...style }}>
				{access.translate(title)}
				<ActionsSide gap={actionGap}>
					{ actionBtns() }
					<WidgetIcon fontSize={'small'} onClick={onIconClick}>
						{ icon }
					</WidgetIcon>
				</ActionsSide>
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
	actionBtns: PropTypes.func,
	actionGap: PropTypes.string,
};

WidgetHeader.defaultProps = {
	title: 'Widget Header',
	icon: 'check',
	showDivider: true,
	style: {},
	onIconClick: null,
	actionGap: '8px',
	actionBtns: () => null
};

export default WidgetHeader;
