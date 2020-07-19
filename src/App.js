import React, { useState } from "react";
import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { color } from "plugins/access";
import Main from "Views/Main";
import Login from "Views/Login";
import firebase from 'firebase';


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

  const firebaseConfig = {
    apiKey: 'test',
    projectId: 'mocking-gen-dev'
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }


  const handleLoggedIn = () => {
    setIsLoggedIn(true);

    // firebase.auth().createUserWithEmailAndPassword('madmonyotan@gmail.com', 'Snake123!').then((user) => {
    //   console.log({user})
    // }).catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;

    //   console.log({errorCode, errorMessage})
    // });

    // firebase.auth().signInWithEmailAndPassword('madmonyotam@gmail.com', 'Snake123!').then((user) => {

    //   console.log({user})
    //   updateSchemasOnEngine(() => {
    //     setIsLoggedIn(true);
    //   })

    // }).catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;

    //   console.log({errorCode, errorMessage})
    // });
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
