import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as access from 'plugins/access';


const Wrap = styled.span`
    height: 20px;
    display: flex;
    padding: 0 ${ props => props.size === 'default' ? '6px' : '4px'};
    z-index: 1;
    flex-wrap: wrap;
    font-size: ${ props => props.size === 'default' ? '0.75rem': '0.60rem'};
    min-width: 20px;
    box-sizing: border-box;
    align-items: center;
    font-family: 'Roboto';
    font-weight: 500;
    line-height: 1;
    align-content: center;
    border-radius: 10px;
    flex-direction: row;
	justify-content: center;
	margin-left: 5px;
	background: ${access.color('backgrounds.badge')};
	color: ${access.color('colors.white')};
`;

const Badge = ({ children, size }) => (
	<Wrap size={ size }>
		{ children }
	</Wrap>
); 

Badge.propTypes = {
	children: PropTypes.node,
	size: PropTypes.oneOf(['default', 'small']),
};

Badge.defaultProps = {
	children: null,
	size: 'default'
};


export default Badge;