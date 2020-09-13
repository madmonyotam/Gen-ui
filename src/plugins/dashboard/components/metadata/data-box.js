import React from 'react';
import PropTypes from 'prop-types';

import * as access from 'plugins/access';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';

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
	// background: ${access.color('backgrounds.light')};
	box-shadow: '0px 0px 12px -5px rgba(0, 0, 0, 0.3)';
	border:  1px solid rgba(186,196,206, .75);
	border-radius: 2px;
	flex: ${props => props.container ? 1 : .25};
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
    font-size: 16px;
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
		buttons 
	} = props;
    
	const Title = () => (
		<>
			<Icon fontSize={'small'}>{icon}</Icon>
			<StyledTitle>
				{access.translate(title)}
			</StyledTitle>
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
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
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
	icon: 'schedule',
	title: 'data box',
	buttons: null
};

export default DataBox;
