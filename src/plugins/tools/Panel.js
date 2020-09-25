import React from 'react';
import PropTypes from 'prop-types';
 
import * as access from 'plugins/access';
import styled from 'styled-components'; 

const PanelWrap = styled.div`
	min-width: 235px; 
	padding: 15px;
	display: flex; 
	flex-direction: column;
	box-shadow:  10px 0px 10px -20px rgba(0,0,0,0.75);
	background: ${ access.color('backgrounds.light') } ;
	z-index: 1;
}`; 

const Panel = ({ children, style }) => {
	return (
		<PanelWrap style={style}>
			{ children }
		</PanelWrap>
	);
};

Panel.propTypes = {
	style: PropTypes.object,
	children: PropTypes.node.isRequired
}; 

Panel.defaultProps = {
	children: <div />
};

export default Panel;