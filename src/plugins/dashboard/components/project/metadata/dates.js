import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import styled from 'styled-components';
import moment from 'moment';
import DataBox from './data-box';

const Container = styled.div`
    display: flex;
    flex-direction: row; 
`;

const Typo = styled(Typography)`
	height: 100%; 
	display: flex; 
	align-items: center; 
	font-size: .85rem !important;
	padding-left: 30px;
`; 

const ProjectDates = props => {
	const { updated, created } = props; 

	return (
		<Container>
			<DataBox push icon={ 'event' } title={ 'Created' }>
				<Typo>{ moment(created).format('ll | HH:mm:ss') }</Typo>
			</DataBox>
			<DataBox icon={ 'schedule' } title={ 'Updated' }>
				<Typo>{ moment(updated).format('ll | HH:mm:ss') }</Typo>
			</DataBox> 
		</Container> 
	);
};

ProjectDates.propTypes = {
	created: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	updated: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

ProjectDates.defaultProps = {
	created: '',
	updated: ''
};

export default ProjectDates;