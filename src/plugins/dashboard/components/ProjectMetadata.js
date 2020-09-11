import React, { useState, useRef, useEffect } from 'react'; 
import PropTypes from 'prop-types'; 
import moment from 'moment';

import WidgetHeader from 'plugins/tools/WidgetHeader'; 
import { Typography, ClickAwayListener, Tooltip, IconButton, Icon } from '@material-ui/core';

import * as access from 'plugins/access';
import styled from 'styled-components';

const Input = styled.input`
	font-family: 'Roboto'; 
	border: none; 
	font-size: 16px; 
	outline: 0; 
	background: rgba(226,226,226, 0.25);
	border-bottom: 1px dashed rgba(186,196,206, .75);
	height: 100%; 
	transition: all .15s ease-in;
	padding-left: 10px;
`;

const Box = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	order: ${ props => props.order };
	padding: 10px;
	margin-top: 10px;
	margin-right: ${ props => props.push ? '20px' : '0px' };
	margin-left: 0px;
	margin-bottom: ${ props => props.isLast ? '0px' : '10px' };
	min-height: 40px;
	background: #fefefe;
	// background: ${ access.color('backgrounds.light') };
	box-shadow: '0px 0px 12px -5px rgba(0, 0, 0, 0.3)';
	border:  1px solid rgba(186,196,206, .75);
	border-radius: 2px;
	flex: ${ props => props.container ? 1 : .25 };


`;

const Typo = styled(Typography)`
	height: 100%; 
	display: flex; 
	align-items: center; 
	font-size: ${ props => props.small ? '14px' : '17px' } !important;
	padding-left: ${ props => props.push ? '30px' : 0 };

`;

const TitleTypo = styled(Typo)`
	border-bottom: 1px dashed rgba(255,255,255, 0);
	padding-left: 0;
	margin-left: ${ props => props.push ? '30px' : 0 };

	:hover {
		cursor: text;
		border-bottom: 1px dashed rgba(186,196,206, 1);
	}
`;

const ProjectMetadata = props => {
	
	const { project, style } = props;
	const inputRef = useRef();

	const setProject = project => ( !project ? [] : [

		{
			key: 'dates',
			order: 1,
			label: 'Schedule',
			data: [{
				value: moment(project.updatedTime).format('ll | HH:mm:ss'),
				label: 'Updated at',
				key: 'updated',
				order: 1
			},
			{
				value: moment(project.createdTime).format('ll | HH:mm:ss'),
				label: 'Created at',
				key: 'created',
				order: 0
			}]
		},
		{
			value: project.name,
			label: 'Title',
			editable: true,
			order: 0,
			key: 'title'

		},
		{
			value: project.createdBy,
			label: 'Users',
			editable: false,
			order: 3,
			key: 'owner'
		} 
	]);

	// const details = useMemo(() => , [project]);
	const [details, setDetails] = useState([]);
	const [isEdit, setIsEdit] = useState(false);

	const handleEscKey = e => {
		if (e.keyCode === 27) setIsEdit(false);
	};

	// const handleEnterKey = e => {
	// 	if (e.keyCode === 13) handleCreateProject();
	// };


	useEffect(() => {
		document.addEventListener('keydown', handleEscKey, false);
		return () => {
			document.removeEventListener('keydown', handleEscKey, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setDetails(setProject(project));
		return () => setDetails([]);
	}, [project]);

	const handleChangeDetail = e => {
		const newDetails = details.map(detail => {
			if (detail.key === e.target.name) {
				detail.value = e.target.value;
			}
			return detail;
		}); 

		setDetails(newDetails);
	};

	const handleEditMode = async edit => {
		await setIsEdit(edit);
		if (edit) inputRef && inputRef.current.focus();
	}; 

	const renderDetails = (detail, key) => {
		switch (detail.key) { /* eslint-disable */
			case 'title':
				return (
					<Box key={detail.key} order={ detail.order }>
						<div style={{ display: 'flex', flexDirection: 'row', color: '#6C829B', marginBottom: 10 }}>
							<Icon fontSize={'small'}>short_text</Icon>
							<span style={{ fontSize: 16, marginLeft: 10 }}>{access.translate(detail.label)}</span>
						</div>
						{ 
							isEdit ? 
								<ClickAwayListener onClickAway={ () => handleEditMode(false) } >
									<Input ref={ inputRef } value={ detail.value } onChange={ handleChangeDetail } name={ detail.key } />
								</ClickAwayListener>
							: <TitleTypo push small onClick={ () => handleEditMode(true) }>{ detail.value }</TitleTypo> 
						}
						{/*

						<EditIcon >
							<Tooltip title={access.translate('Enter')} >
								<IconButton size={'small'} onClick={toggleEdit}>
									{
										!isEdit ? <Icon fontSize={'small'} style={{ color: '#333' }}> edit </Icon>
										: <Icon fontSize={'small'} style={{ color: '#333' }}> cancel </Icon>
									}
								</IconButton>
							</Tooltip>
						</EditIcon>
						*/}
					</Box>
				)
			case 'dates': 
				return (
					<div key={detail.key} style={{ order: detail.order, display: 'flex', flexDirection: 'row' }}>
						{
							detail.data.map( d => {
								return (
									<Box  container push={ d.key === 'created' } order={ d.order }>
										<div style={{ display: 'flex', flexDirection: 'row', color: '#6C829B', marginBottom: 10 }}>
											<Icon fontSize={'small'}>{d.key === 'created' ? 'event' : 'schedule'}</Icon>
											<span style={{ fontSize: 16, marginLeft: 10 }}>{access.translate(d.label)}</span>
										</div>
										<Typo push small>{d.value}</Typo>
									</Box>
								)
							})
						}

					</div>
				)

			default:
				return (
					<Box isLast={ detail.order === 3 } container key={detail.key} order={detail.order}  >
						<div style={{ display: 'flex', flexDirection: 'row', color: '#6C829B', marginBottom: 10 }}>
							<Icon fontSize={'small'}>group</Icon>
							<span style={{ fontSize: 16, marginLeft: 10 }}>{access.translate(detail.label)}</span>
						</div>
						<Typo push small>{detail.value}</Typo>
					</Box>
				)
				return null;
		}
	};

	return ( 
		<div style={{ flex: 1, ...style }}>
			<WidgetHeader title={ 'Details' } icon={ 'description' }/>
			
			<div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 40px)', overflow: 'hidden', width: '100%' }} >
				{
					details && details.map(renderDetails)
				}
			</div>
		</div>
	);
}; 

ProjectMetadata.propTypes = {
	project: PropTypes.object
};

ProjectMetadata.defaultProps = {
	project: {}
};

export default ProjectMetadata;
