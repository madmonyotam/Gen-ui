import React, { useState } from 'react';
import firebase from 'firebase';

import styled from 'styled-components';
import { Button, Divider } from '@material-ui/core';

import * as access from 'plugins/access';

import CustomInput from 'plugins/inputs/CustomInput';
import Start from 'plugins/tools/Start';
import { move } from 'plugins/canvases/utils/canvasActions';
import { paintFrame } from 'plugins/canvases/paint/Frames';

import { updateSchemasOnEngine } from 'tree/actions/engine';
import { Column, Absolute } from 'plugins/Layouts';


const View = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${ props => props.background };
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogInColumn = styled(Column)`
  flex: initial;
  justify-content: flex-start;
  width: 30vw;
  min-width: 450px;
  padding: 25px;
  min-height: 425px;
  overflow: unset;
`;

const InputsCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  flex: 1;
  justify-content: flex-start;
  margin-top: 20px;
`;

const ButtonsCont = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100px;
  width: 100%;
  z-index: 3;
  flex: .5;
  margin-top: 20px;

`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin: 15px;
  border-radius: 50%;
  transform: rotate(${(props) => props.rotate * 180}deg);
  transition: all 250ms;
  box-shadow: 0px 0px 11px 4px #a1b1cf3b;
`;

const MainLogo = styled.img`
  margin: 15px auto;
  width: inherit;
  max-width: 400px;
`;

const MainLogoWrap = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: -125px;
  left: 0;
  right: 0;
  display: flex; 
  justify-content: center;
`;

function Login({ onLoggedIn }) {
  const [rotate, setRotate] = useState(0);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onCanvasReady = (canvas, width, height) => {
    const frame = paintFrame(canvas, width, height);
    move(canvas, frame, access.color('canvases.fg'));
  };

  const handleLogin = () => {
    setLoading(true)

    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('gen-token',res.user.xa);

      setLoading(false)
      
      updateSchemasOnEngine(() => {
        onLoggedIn();
      })

    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({errorCode, errorMessage});
      
      setLoading(false)
      setPassword('');

      // TODO: handle error
    });
  };

  const handleRegister = () => {
    setLoading(true)

    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {

      setLoading(false)

      res.user.updateProfile({
        displayName: name
      }).then(() => {
        setName('');
        setPassword('');
        setRegister(false);
      })
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({errorCode, errorMessage});
      // TODO: handle error
    });
  };

  const renderCanvas = () => {
    const margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    return <Start canvasReady={onCanvasReady} margin={margin} />;
  }; 

  const renderLoginButtons = () => {
    
    const logVariant = !register ? 'contained' : 'text';
    const regVariant = register ? 'contained' : 'text';

    const onClick = e => setRegister(!register)

    return (
      <ButtonsCont>
        <Button variant={ logVariant } 
                color='secondary' 
                disableElevation={ true }
                style={{ minHeight: 40,color: '#ededed', minWidth: 100, marginBottom: 25 }}
                onClick={ onClick }>
          { access.translate('Login') }
        </Button>
        <Button variant={ regVariant } 
                disableElevation={ true }
                color='secondary' 
                style={{ minHeight: 40,color: '#ededed', minWidth: 100 }}
                onClick={ onClick }> 
          { access.translate('Register') }
        </Button>
      </ButtonsCont>
    );
  };


  const inputs = [{
    onChange: e => { setName(e.target.value) },
    name: 'name',
    icon: 'account_circle',
    value: name,
  },{
    onChange: e => { setEmail(e.target.value) },
    name: 'email',
    type: 'email',
    icon: 'email',
    value: email
  },{
    onChange: e => { setPassword(e.target.value) },
    name: 'password',
    type: 'password',
    icon: 'lock',
    value: password
  }]

  const render_inputs = inputs.filter( inp => register ? inp : inp.name !== 'name' )
  const renderForm = () => {
    return (
        <InputsCont>
          {
            render_inputs.map(item => <CustomInput key={ item.name } style={{ marginBottom: 25 }} onChange={ item.onChange } item={ item }/>)
          }
        </InputsCont>
    );
  };

  const label = register ? access.translate('Sign Up') : access.translate('Sign In'); 
  const sign_func = register ? handleRegister : handleLogin;
  return (
    <View background={ access.color('backgrounds.secondary') }>
      {renderCanvas()}

      <LogInColumn height={'auto'} background={access.color('backgrounds.primary')} radius={'10px'}>
        <div style={{
            height: '100%', 
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            paddingTop: '30%', 
          }} >
          

          <MainLogoWrap >
            <MainLogo
              alt='main-logo'
              src={process.env.PUBLIC_URL + '/gen_logo.png'}
              />        
          </MainLogoWrap>
          
          { renderLoginButtons() }
          { renderForm() }
        
        </div>

        <Divider style={{ marginBottom: 15 }}/>
        <Button 
          variant={'contained'} 
          color='secondary'
          style={{
            maxWidth: '100px',
            alignSelf: 'flex-end',
          }}
          onClick={ sign_func }>

          { label }

        </Button>
      </LogInColumn> 


      {/* 
        <LogInColumn height={'56vh'} background={access.color('backgrounds.secondary')} radius={'10px'}>
          {renderSignIn()}
          {renderRegister()}
          {renderLoginButtons()}
        </LogInColumn>
      */}

      <Absolute left={'unset'} top={'unset'}>
        <Logo
          alt={'logo'}
          src={process.env.PUBLIC_URL + '/gen_icon.png'}
          onClick={() => {
            setRotate(rotate + 1);
          }}
          rotate={rotate}
        />
      </Absolute>
    </View>
  );
}

export default Login;
