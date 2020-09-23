import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as access from 'plugins/access';

import { Center } from 'plugins/Layouts';
import { Button } from '@material-ui/core';

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
`;

const CenterColumn = styled(Center)`   
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${ access.color('colors.blue01') };
`;

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}
  
	reload() {
  
		window.location.reload();
	}

	render() {
		const { renderFunction } = this.props;

		if(renderFunction) return renderFunction();
		

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Screen>
					<CenterColumn>
						<Label> { access.translate('Opps... my bad...') } </Label>
						<Button variant="outlined" color="primary" onClick={ this.reload }> { access.translate('reload') } </Button>
					</CenterColumn>
				</Screen>
			);
		}

		return this.props.children; 
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	renderFunction: PropTypes.func,
};

export default ErrorBoundary;
