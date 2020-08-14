import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styled from 'styled-components';
import { makeStyles, Paper, Divider, InputBase, Icon } from "@material-ui/core";
/**
 *
const View = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${ props => props.background };
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
 */
const Wrap = styled(Paper)`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
`;

const InputIcon = styled(Icon)`
    padding: 0 10px;
    font-size: 22;
    height: 100%;
    display: flex;
    align-items: center;
    border-top-left-radius: 4;
    border-top-right-radius: 4;
`;

const InputValue = styled(InputBase)`
    text-transform: uppercase; 
    flex: 1; 
    height: 100%; 
    width: 75%; 
    padding: 0 15px;
`;

const CustomInput = (props) => {
    const { item, onChange, depth, style, iconStyle } = props;

    return (
        <Wrap elevation={depth} style={style} >
            <InputIcon style={ iconStyle }> { item.icon } </InputIcon>
            <Divider orientation={'vertical'} />
            <InputValue
                name={ item.name }
                onChange={ onChange }
                type={ item.type }
                placeholder={ item.name.toUpperCase() }
            />
        </Wrap>
    )
}

CustomInput.defaultProps = {
    depth: 3,
    item: {
        name: 'username',
        type: 'text',
        value: '',
        renderType: 'input',
        icon: 'face'
    },
    onChange: console.info,
    iconStyle: {},
    inputStyle: {}
}

CustomInput.propTypes = {
    depth: PropTypes.number,
    item: PropTypes.object,
    onChange: PropTypes.func,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object
}

export default CustomInput;  
