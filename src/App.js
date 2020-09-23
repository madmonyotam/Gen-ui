import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useRoot } from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as access from 'plugins/access';

import ErrorBoundaries from 'plugins/tools/ErrorBoundaries';
import { setHeaders } from 'plugins/request';
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

const handleLocation = (location) => {
	const split = location.pathname.split('project/');
	const id = split[1];
	if (id) return id;
	return null;
};

function App({ tree }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [appReady, setAppReady] = useState(false);
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
	useEffect(() => {
		setAppReady(true);
		return () => setAppReady(false);
	}, []);

	return (
		<Root>
			<ThemeProvider theme={ theme }> 
				<ErrorBoundaries>
					<Router>

						{ loggedIn && <TopPanel />}
				

						<Switch>
							{
								appReady && <RedirectHandler loggedIn={loggedIn} />  
							}
						</Switch>
						{
							appReady &&
								<React.Suspense fallback={ <div>Loading...</div> }>

									<Routes 
										routes={ routesConfig } 
										childDependencies={{ 
											onLoggedIn: handleLoggedIn, 
											projectID: handleLocation(location),
											user: { email: localStorage.getItem('gen-user-email') } 
										}}
									/>

								</React.Suspense>
						}
					</Router>
				</ErrorBoundaries>
			</ThemeProvider>
		</Root>
	);
}

export default App;


function RedirectHandler(props) {

	const { location, loggedIn } = props;
	const projectID = handleLocation(location);

	let isProject = false;

	if (location.pathname.includes('/project') || location.pathname.includes('/old-project'))  isProject = true;

	if (loggedIn) {
		if (isProject && projectID) {
			return <Redirect to={location.pathname} />;
		}
		else {
			return <Redirect exact to={'/dashboard'} />;
		}
	}

	return <Redirect from={'/'} to={'/login'} />;
}

