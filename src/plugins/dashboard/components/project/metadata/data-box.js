import React from 'react';
import PropTypes from 'prop-types';

import * as access from 'plugins/access';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import Badge from 'plugins/tools/Badge';

const Box = styled.div`
	position: relative;
	display: flex;
	flex-direction: column; 
	padding: 10px;
	margin-top: 10px;
	margin-right: ${props => props.push ? '20px' : '0px'};
	margin-left: 0px;
	margin-bottom: 0px;
	min-height: 40px;
	background: #fefefe;
	border:  1px solid ${ access.color('borders.primary') };
	border-radius: 4px;
	flex: ${props => props.container ? 1 : .25};
	transition: all 0.10s ease;
	:hover {
		box-shadow: 0px 0px 13px -7px rgb(186,196,206);
	}
`;

const Header = styled.div`
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    color: ${ access.color('texts.title') }; 
    margin-bottom: 10px;
`;

const SpacedHeader = styled(Header)`
    justify-content: space-between;
`;

const StyledTitle = styled.span`
    font-size: 14px;
    margin-left: 10px;
    font-weight: 600;
    text-transform: capitalize;
`;

const DataBox = props => { 
	const { 
		icon, 
		title, 
		children, 
		container, 
		push, 
		style, 
		buttons,
		badge
	} = props;
	
	const Title = () => (
		<>
			<Icon fontSize={'small'}>{icon}</Icon>
			<StyledTitle>
				{access.translate(title)}
			</StyledTitle>
			{ (badge && (badge.length || badge > 0) ) ? <Badge size={ 'small' } >{ badge } </Badge> : null }
		</>
	);

	const renderTitle = buttons => {
		if (!buttons) return (
			<Header>
				<Title />
			</Header>
		);
        
		return (
			<SpacedHeader>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Title />
				</div>
				{ buttons }
			</SpacedHeader>

		);
	};

	return (
		<Box container={ container } push={ push } style={ style }>
			{ renderTitle(buttons) }  
			{ children }
		</Box>
	);
};

DataBox.propTypes = {
	children: PropTypes.node,
	badge: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	style: PropTypes.object,
	container: PropTypes.bool,
	push: PropTypes.bool,
	icon: PropTypes.string,
	title: PropTypes.string,
	buttons: PropTypes.object,
    
};

DataBox.defaultProps = {
	children: [],
	container: true,
	push: false,
	style: {},
	badge: 0,
	icon: 'schedule',
	title: 'data box',
	buttons: null
};

export default DataBox;
