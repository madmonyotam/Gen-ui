import React, { useState, useEffect } from "react";
import { useBranch } from "baobab-react/hooks";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Input from "plugins/inputs/Input";
import Start from "plugins/tools/Start";
import { move, dropCircles, ripple } from "plugins/canvases/utils/canvasActions";
import { paintFrame } from "plugins/canvases/paint/Frames";

import * as access from "plugins/access";
import { Column, Center, Absolute } from "plugins/Layouts";

const View = styled.div`
  height: 100vh;
  width: 100vw;
`

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

const Logo = styled.img`
    width:60px; 
    height:60px; 
    margin:15px;
    border-radius: 50%;
    transform: rotate(${props=> props.rotate*180}deg);
    transition: all 250ms; 
    box-shadow: 0px 0px 11px 4px #a1b1cf3b;
`;

function Login({ onLoggedIn }) {
  const [rotate, setRotate] = useState(0);

  const renderEmail = () => {
    return (
      <Input
        label={access.translate('Email')}
        variant={ 'standard' }
        initValue={''}
        style={{ width: 300 }}
        onChange={v => null }
      />
    );
  };

  const renderPassword = () => {
    return (
      <Input
        label={access.translate('Password')}
        variant={ 'standard' }
        initValue={''}
        style={{ width: 300 }}
        onChange={v => null }
      />
    );
  };

  const onCanvasReady = (canvas, width, height) => {
    const frame = paintFrame(canvas, width, height);
    move(canvas, frame, access.color("canvases.fg"));
  };

  const renderStart = () => {
    const margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    return <Start canvasReady={onCanvasReady} margin={margin} />;
  };

  return (
    <View>
                
        {renderStart()}

        <Absolute top={'22vh'} bottom={'22vh'} left={'35vw'} right={'35vw'}>

            <LogInColumn height={'56vh'} background={ access.color("backgrounds.secondary") } radius={ '10px' }>
              <img alt="logo" src={process.env.PUBLIC_URL + "/gen_logo.png"} />
              <Button variant="outlined" color="secondary" style={ {width: 'fit-content'} } onClick={ onLoggedIn }>
                {access.translate("Log in with google")}
              </Button>

              <InputsCont>
                { renderEmail() }
                { renderPassword() }
              </InputsCont>

              <Button variant="outlined" color="secondary" style={ {width: 'fit-content'} } onClick={ onLoggedIn }>
                {access.translate("Sign In")}
              </Button>

            </LogInColumn>
        </Absolute>
        
        <Absolute left={'unset'} top={'unset'}> 
          <Logo alt={'logo'} src={process.env.PUBLIC_URL + "/gen_icon.png"} onClick={()=>{ setRotate(rotate+1) }} rotate={rotate}/>
        </Absolute>

    </View>
  );
}

export default Login;
