import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, Divider, Icon } from '@material-ui/core';
import styled from 'styled-components';

import * as access from 'plugins/access'; 

const Header = styled.div`
	color: ${ access.color('backgrounds.primary')};
	font-size: 15px; 
	padding: 5px 0; 
	display: flex; 
	align-items: center; 
	justify-content: space-between;
	height: 30px;
	font-family: Cabin !important;
`;

const getTitleLength = ref => {
	if (ref && ref.current) {
		return (ref.current.clientWidth + 10);
	}
	return 0;
};

const getPx = p=> {
	if (p.side === 'left') return `${getTitleLength(p.titleRef)}px`;
	else return 'unset';
};

const ActionsSide = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	left: ${ p => getPx(p) };
	right: 25px;
	gap: ${ (p) => p.gap };
`;

const WidgetIcon = styled(Icon)`
	cursor: ${ props => props.onClick ? 'pointer' : 'default' };
`;

const Typo = styled(Typography)`
	font-family: Cabin !important;
`;
const WidgetHeader = (props) => {
	const { 
		title, 
		icon, 
		showDivider, 
		onIconClick, 
		style, 
		actionGap, 
		actionBtns, 
		actionSide 
	} = props;

	const titleRef = useRef(null);	

	return (
		<>
			<Header style={{ ...style }}>
				<Typo ref={ titleRef }>
					{access.translate(title)}
				</Typo>
				<ActionsSide gap={actionGap} side={ actionSide } title={ title } titleRef={ titleRef }>
					{ actionBtns() }
				</ActionsSide>
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
	actionBtns: PropTypes.func,
	actionGap: PropTypes.string,
	actionSide: PropTypes.oneOf(['left', 'right']),
};

WidgetHeader.defaultProps = {
	title: 'Widget Header',
	icon: 'check',
	showDivider: true,
	style: {},
	onIconClick: null,
	actionGap: '8px',
	actionBtns: () => null,
	actionSide: 'right'
};

export default WidgetHeader;
