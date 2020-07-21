import React, { useState } from "react";
import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase';

import * as access from "plugins/access";

import Main from "Views/Main";
import Login from "Views/Login";

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
  const firebaseConfig = {
    apiKey: access.core('keys.apiKey'),
    projectId: access.core('keys.projectId')
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  }

  const View = token || isLoggedIn ? Main : Login;

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <View onLoggedIn={ handleLoggedIn } />
      </ThemeProvider>
    </Root>
  );
}

export default App;
