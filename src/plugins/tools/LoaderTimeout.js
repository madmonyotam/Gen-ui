import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { Center } from 'plugins/Layouts';

const appear = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`; 

const Loader = styled.div`
  position: ${({ coverAll }) => coverAll ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.75);
  animation: ${appear} 0.50s linear;
  z-index: 100;
  text-align: center;
  height: ${({ coverAll }) => coverAll ? '100vh' : '100%'};
`;

const Spin = styled.div`
  animation-name: spin;
  animation-duration: 4500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
`;

class LoaderTimeout extends Component {
	constructor(props) {
		super(props);
    
		this.renderLoader = this.renderLoader.bind(this);
    
		this.state = {
			showLoader: true
		};
	}

	componentDidMount() {
		this.mounted = true;
	}
  
	componentDidUpdate(prevProps) {
		const { isLoading } = this.props;

		if (isLoading !== prevProps.isLoading && isLoading) {
			this.setState({ showLoader: true });
		} 
	}

	componentWillUnmount() {
		this.mounted = false;
	}
  
	renderLoader() {
		const { isLoading, coverAll, pendingExtraTime, size } = this.props;
		const { showLoader } = this.state;

		if (!isLoading) {
			if (showLoader) {
				setTimeout(() => {
					if (this.mounted) this.setState({ showLoader: false });
				}, pendingExtraTime);
			}
		} 
    
		if (!showLoader)  return null;
    
		return (
			<Loader coverAll={ coverAll }>
				<Center>
					<Spin>
						<img alt="logo" src={process.env.PUBLIC_URL + '/loader.png'} style={ { width: size, height: size} } />
					</Spin>
				</Center>
			</Loader> 
		);
	}

	render() {
		const { children } = this.props;

		return (
			<>
				{ this.renderLoader() }
				{ children }
			</>
		);
	}
}

LoaderTimeout.defaultProps = {
	coverAll: false,
	pendingExtraTime: 0,
	size: 50
};

LoaderTimeout.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	children: PropTypes.node,//.isRequired,
	pendingExtraTime: PropTypes.number,
	coverAll: PropTypes.bool,
	size: PropTypes.number,
};

export default LoaderTimeout;
