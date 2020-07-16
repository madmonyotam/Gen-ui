import React, { useState } from "react";
import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { color } from "plugins/access";
import Main from "Views/Main";
import Login from "Views/Login";
import { updateSchemasOnEngine } from "tree/actions/engine";


const primary = color('materialUI.primary');
const secondary = color('materialUI.secondary');

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
  const token = localStorage.getItem('token');

  const handleLoggedIn = () => {
    updateSchemasOnEngine(() => {
      setIsLoggedIn(true);
    })
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
