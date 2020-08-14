import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

import * as access from 'plugins/access';

import Input from 'plugins/inputs/Input';
import CustomInput from 'plugins/inputs/CustomInput';
import Start from 'plugins/tools/Start';
import { move } from 'plugins/canvases/utils/canvasActions';
import { paintFrame } from 'plugins/canvases/paint/Frames';

import { updateSchemasOnEngine } from "tree/actions/engine";
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
  min-width: 350px;
  padding: 15px;
  min-height: 500px;
`;

const InputsCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 200px;
`;

const ButtonsCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
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

function Login({ onLoggedIn }) {
  const [rotate, setRotate] = useState(0);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onCanvasReady = (canvas, width, height) => {
    const frame = paintFrame(canvas, width, height);
    move(canvas, frame, access.color('canvases.fg'));
  };

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('gen-token',res.user.xa);

      updateSchemasOnEngine(() => {
        onLoggedIn();
      })

    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({errorCode, errorMessage});

      setPassword('');

      // TODO: handle error
    });
  };

  const handleRegister = () => {
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
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

  const renderEmail = () => {
    return <Input label={access.translate('Email')} variant={'standard'} initValue={''} style={{ width: 300 }} value={email} onChange={setEmail} />;
  };

  const renderPassword = () => {
    return <Input label={access.translate('Password')} type={'password'} variant={'standard'} initValue={''} style={{ width: 300 }} value={password} onChange={setPassword} />;
  };

  const renderName = () => {
    return <Input label={access.translate('Name')} variant={'standard'} initValue={''} style={{ width: 300 }} value={name} onChange={setName} />;
  };

  const renderSwitchRegister = () => {
    const label = register ? access.translate('Sign In') : access.translate('Register');

    return (
      <Button variant='text' color='secondary' size='small' style={{ width: 'fit-content', fontSize: 9 }} onClick={()=>{ setRegister(!register) }}>
        { label }
      </Button>
    );
  };

  const renderLoginButtons = () => {
    const label = register ? access.translate('Register') : access.translate('Log In');
    const func = register ? handleRegister : handleLogin;
    const logVariant = !register ? 'contained' : 'text';
    const regVariant = register ? 'contained' : 'text';

    return (
      <ButtonsCont>
        <Button variant={ logVariant } 
                color='secondary' 
                style={{ color: '#ededed' }}
                onClick={ e => setRegister(!register) }>
          { access.translate('Login') }
        </Button>
        <Button variant={ regVariant } 
                color='secondary' 
                style={{ color: '#ededed' }}
                onClick={ e => setRegister(!register) }> 
          { access.translate('Register') }
        </Button>
        {/* {renderSwitchRegister()} */}
      </ButtonsCont>
    );
  };

  const renderSignIn = () => {
    if( register ) return null;

    return (
        <InputsCont>
          {renderEmail()}
          <CustomInput item={{
            onChange: setEmail,
            name: 'email',
            type: 'email',
            icon: 'email',
            value: email
          }}/>
          <CustomInput />
          {renderPassword()}
        </InputsCont>
    );
  };

  const renderRegister = () => {
    if( !register ) return null;

    return (
        <InputsCont>
          {renderName()}
          {renderEmail()}
          {renderPassword()}
        </InputsCont>
    );
  };


  const label = register ? access.translate('Sign Up') : access.translate('Sign In'); 

  return (
    <View background={ access.color('backgrounds.secondary') }>
      {/* {renderCanvas()} */}

      <LogInColumn height={'auto'} background={access.color('backgrounds.primary')} radius={'10px'}>
        <div style={{ height: '100%', width: '100%' }} >
          { renderLoginButtons() }
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <MainLogo
              alt='main-logo'
              src={process.env.PUBLIC_URL + '/gen_logo.png'}
            />        
          </div>
          
          { renderSignIn() }
          { renderRegister() }
        
        </div>


        <Button variant={'contained'} color='secondary'>
          {/* // onClick={e => setRegister(!register)}> */}
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
