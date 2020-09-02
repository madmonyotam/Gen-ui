import React, { useState, useMemo } from 'react';

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase';
import { setHeaders } from 'plugins/request';
import * as access from 'plugins/access';
import TopPanel from 'plugins/tools/TopPanel';

import Routes from 'plugins/tools/Routes';

import routesConfig from 'routes-config';

const primary = access.color('materialUI.primary');
const secondary = access.color('materialUI.secondary');

const theme = createMuiTheme({
	palette: {
		primary: {
			main: primary
		},
		secondary: {
			main: secondary
		}
	}
});

const location = window.location;

function App({tree}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const Root = useRoot(tree);
	const token = localStorage.getItem('gen-token');
	
	if (token) setHeaders({ Authorization: token });
	
	const firebaseConfig = {
		apiKey: access.core('keys.apiKey'),
		projectId: access.core('keys.projectId')
	};

	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	const handleLoggedIn = () => {
		setIsLoggedIn(true);
	};
        
	const loggedIn = (token || isLoggedIn); 

	const handleLocation = (location) => {
		const split = location.pathname.split('project/');
		const id = split[1];
		if (id) return id;
		return null;
	};
	
	const projectID = useMemo(() => handleLocation(location), []); 

	const RedirectHandler = (routeProps) => {
		
		const { location } = routeProps;
		
		let isProject = false;

		if (location.pathname.includes('/project')) isProject = true;

		if (loggedIn) {
			if (isProject && projectID) return <Redirect to={ location.pathname } />;
			else return <Redirect exact to={ '/dashboard' } />; 
		}

		return <Redirect from={ '/' } to={ '/login' } />;
	};


	return (
		<Root>
			<ThemeProvider theme={ theme }>

				<Router>

					{ loggedIn && <TopPanel projectID={ projectID } /> }

					<Switch>
						<RedirectHandler />  
					</Switch>

					<Routes 
						routes={ routesConfig } 
						childDependencies={{ 
							onLoggedIn: handleLoggedIn, 
							projectID: projectID,
							user: { email: localStorage.getItem('gen-user-email') } 
						}}
					/>

				</Router>
			</ThemeProvider>
		</Root>
	);
}

export default App;
