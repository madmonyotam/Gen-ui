import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch, useParams } from 'react-router-dom';

import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase';
import { setHeaders } from 'plugins/request';
import * as access from 'plugins/access';
import TopPanel from 'plugins/tools/TopPanel';

import routes from 'routes';

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

	const renderRoutes = (route, key) => (
		<Route
			key={ key }
			path={ route.path }
			render={ 
				props => {
					return (
						<route.component { ...props } 
							user={{ email: localStorage.getItem('gen-user-email') }} 
							routes={ route.routes } 
							onLoggedIn={ handleLoggedIn } /> 
					); 
				}
			}
		/>
	);
    
	const RedirectHandler = ({ location }) => {
		if (loggedIn) {
			if (location.pathname.includes('/project/')) {
				return <Redirect to={ location.pathname }/>;
			} else {
				return <Redirect exact from={ '/' } to={ '/dashboard' } />; 
			}
		}

		return <Redirect from={ '/' } to={ '/login' } />;
	};


	return (
		<Root>
			<ThemeProvider theme={theme}>

				{ loggedIn && <TopPanel /> }

				<Router>
					<Switch>
						<RedirectHandler />  
					</Switch>
					{ routes.map(renderRoutes) }
				</Router>
			</ThemeProvider>
		</Root>
	);
}

export default App;
