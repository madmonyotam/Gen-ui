import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Firebase from 'plugins/request';

import styled from 'styled-components';
import { Button, Divider, LinearProgress } from '@material-ui/core';

import * as access from 'plugins/access';

import CustomInput from 'plugins/inputs/CustomInput';

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

const InsideWrapper = styled.div`
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 30%;
`;

const Login = ({ onLoggedIn }) => {
	const [rotate, setRotate] = useState(0);
	const [register, setRegister] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = () => {
		setLoading(true);
		Firebase.login(email, password)
			.then( (res) => {
        
				setLoading(false);
				updateSchemasOnEngine(onLoggedIn);
			})
			.catch( error => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
        
				setPassword('');
				setLoading(false);
				// console.log({errorCode, errorMessage});
			});
	};

	const handleRegister = () => {
		setLoading(true);
		Firebase.register(email, password, name)
			.then( res => {
				setName('');
				setPassword('');
				setRegister(false);
				setLoading(false);
				// console.log(res)
			})
			.catch( error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({errorCode, errorMessage});
				setLoading(false);
				// TODO: handle error
			});
	};

	const renderLoginButtons = () => {
    
		const logVariant = !register ? 'contained' : 'text';
		const regVariant = register ? 'contained' : 'text';

		const onClick = () => setRegister(!register);

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
		onChange: e => { setName(e.target.value); },
		name: 'name',
		icon: 'account_circle',
		value: name,
	},{
		onChange: e => { setEmail(e.target.value); },
		name: 'email',
		type: 'email',
		icon: 'email',
		value: email
	},{
		onChange: e => { setPassword(e.target.value); },
		name: 'password',
		type: 'password',
		icon: 'lock',
		value: password
	}];

	const render_inputs = inputs.filter( inp => register ? inp : inp.name !== 'name' );
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

			<LogInColumn height={'auto'} background={access.color('backgrounds.primary')} radius={'10px'}>
				<InsideWrapper>

					<MainLogoWrap >
						<MainLogo alt='main-logo' src={process.env.PUBLIC_URL + '/gen_logo.png'} />
					</MainLogoWrap>

					{renderLoginButtons()}
					{renderForm()}

				</InsideWrapper> 

				{
					loading ? <div style={{ marginBottom: 15 }}><LinearProgress /></div> : <Divider style={{ marginBottom: 15 }} />
				}

				<Button 
					variant={'contained'} 
					color='secondary'
					style={{ maxWidth: '100px', alignSelf: 'flex-end' }}
					onClick={ sign_func }>

					{ label }

				</Button>
			</LogInColumn> 

			<Absolute left={'unset'} top={'unset'}>
				<Logo
					alt={'logo'}
					src={process.env.PUBLIC_URL + '/gen_icon.png'}
					onClick={() => { setRotate(rotate + 1); }}
					rotate={rotate}
				/>
			</Absolute>
		</View>
	);
};

Login.propTypes = {
	onLoggedIn: PropTypes.func.isRequired
};

export default Login;
