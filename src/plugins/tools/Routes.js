import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const Routes = ({ routes, dependencies, childDependencies }) => {
	
	const renderChild = (props, route) => (
		<route.component 
			{...props} 
			{...childDependencies} 
			routes={ route.routes } />
	);

	const renderRoutes = (route, i) => (
		<Route
			{ ...dependencies }
			key={ i }
			path={ route.path }
			name={ route.name }
			render={ props => renderChild(props, route) }
		/>
	);

	const returnedRoutes = useMemo(() => routes, [routes]);
	return returnedRoutes.map(renderRoutes); 
};

Routes.propTypes = {
	routes: PropTypes.array,
	dependencies: PropTypes.object,
	childDependencies: PropTypes.object,
};

Routes.defaultProps = {
	routes: [],
	dependencies: {},
	childDependencies: {}
};
export default Routes;