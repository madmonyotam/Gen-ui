import React, { useState } from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory,
	useLocation
} from 'react-router-dom';

import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase';
import { setHeaders } from 'plugins/request';
import * as access from 'plugins/access';

import Dashboard from 'Views/Dashboard';
import Login from 'Views/Login-rev';

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

	const View = (token || isLoggedIn) ? Dashboard : Login;
    
	// function PrivateRoute({ children, ...rest }) {
	//   return (
	//     <Route
	//       {...rest}
	//       render={({ location }) =>
	//         (token || isLoggedIn) ? (
	//           children
	//         ) : (
	//             <Redirect
	//               to={{
	//                 pathname: "/login",
	//                 state: { from: location }
	//               }}
	//             />
	//           )
	//       }
	//     />
	//   );
	// }

	// const path = (isLoggedIn || token) ? '/protected' : '/login'

	return (
		<Root>
			<ThemeProvider theme={theme}>
				<View onLoggedIn={ handleLoggedIn }/>
				{/* <Router path={ path }>
            <Switch>
              <Route path="/login">
              <Login onLoggedIn={ handleLoggedIn }/> 
            </Route>

            <PrivateRoute path="/protected">
              <Dashboard onLoggedIn={ handleLoggedIn } />
            </PrivateRoute>
          </Switch>
        </Router> */}
			</ThemeProvider>
		</Root>
	);
}

export default App;
