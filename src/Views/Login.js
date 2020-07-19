import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

import * as access from 'plugins/access';

import Input from 'plugins/inputs/Input';
import Start from 'plugins/tools/Start';
import { move } from 'plugins/canvases/utils/canvasActions';
import { paintFrame } from 'plugins/canvases/paint/Frames';

import { updateSchemasOnEngine } from "tree/actions/engine";
import { Column, Absolute } from 'plugins/Layouts';


const View = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LogInColumn = styled(Column)`
  padding-top: 25px;
  align-items: center;
  width: 30vw;
`;

const InputsCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 200px;
`;

const ButtonsCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
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
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {

      console.log({user})
      updateSchemasOnEngine(() => {
        onLoggedIn();
      })

    }).catch(function(error) {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      setPassword('');

      // TODO: handle error
    });
  }

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
    const label = register ? access.translate('Send') : access.translate('Log In');

    return (
      <ButtonsCont>
        <Button variant='outlined' color='secondary' style={{ width: 'fit-content', marginBottom: 5 }} onClick={handleLogin}>
          {label}
        </Button>
        {renderSwitchRegister()}
      </ButtonsCont>
    );
  };

  const renderSignIn = () => {
    if( register ) return null;

    return (
      <Fragment>
        <img alt='logo' src={process.env.PUBLIC_URL + '/gen_logo.png'} />
        <InputsCont>
          {renderEmail()}
          {renderPassword()}
        </InputsCont>
      </Fragment>
    );
  };

  const renderRegister = () => {
    if( !register ) return null;

    return (
      <Fragment>
        <img alt='logo' src={process.env.PUBLIC_URL + '/gen_logo.png'} />
        <InputsCont>
          {renderName()}
          {renderEmail()}
          {renderPassword()}
        </InputsCont>
      </Fragment>
    );
  };

  return (
    <View>
      {renderCanvas()}

      <Absolute top={'22vh'} bottom={'22vh'} left={'35vw'} right={'35vw'}>
        <LogInColumn height={'56vh'} background={access.color('backgrounds.secondary')} radius={'10px'}>
          {renderSignIn()}
          {renderRegister()}
          {renderLoginButtons()}
        </LogInColumn>
      </Absolute>

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
