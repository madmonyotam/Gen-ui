import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import access from 'plugins/access';

const IconBtn = ({ iconSize, iconPadding, color, onClick, icon, iconStyle, btnStyle, ...rest }) => {

	// eslint-disable-next-line no-unused-vars
	const useStyles = makeStyles(theme => ({
		icon: {
			color: color,
			padding: iconPadding,
			fontSize: iconSize,
			...iconStyle
		},
		btn: {
			...btnStyle
		}
	}));

	const classes = useStyles();

	return (
		<IconButton className={classes.btn} size="small" onClick={onClick} {...rest}>
			<Icon className={classes.icon}>{icon}</Icon>
		</IconButton>
	);
};

IconBtn.defaultProps = {
	onClick: () => {},
	iconSize: 20,
	iconPadding: 5,
	color: access.color('texts.primary'),
	icon: access.icon('listItem.remove'),
	btnStyle: {},
	iconStyle: {},
};

IconBtn.propTypes = {
	onClick: PropTypes.func,
	iconSize: PropTypes.number,
	iconPadding: PropTypes.number,
	color: PropTypes.string,
	icon: PropTypes.string,
	btnStyle: PropTypes.object,
	iconStyle: PropTypes.object
};

export default IconBtn;
