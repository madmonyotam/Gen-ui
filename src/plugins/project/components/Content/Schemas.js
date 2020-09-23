import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import moment from 'moment';

import { useFetchSchemas } from 'plugins/project/actions';
import { schemasState, selectedSchemaId, selectedLibId } from 'plugins/project/tree/atoms';
import { selectedLibrary } from 'plugins/project/tree/selectors';
import styled from 'styled-components';
import * as access from 'plugins/access';

import { Typography, Button, Icon, IconButton, Tooltip } from '@material-ui/core';
import WidgetHeader from 'plugins/tools/WidgetHeader';
import SchemaListItem from './SchemaListItem';
import CodeEditor from './Editor';


const Box = styled.div`
	position: relative;
	color: #333;
	text-shadow: .5px .5px 1px #fefefe;
	padding: 5px 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Schemas = () => {

	const setSchemaId = useSetRecoilState(selectedSchemaId);
	const libId = useRecoilValue(selectedLibId);
	const library = useRecoilValue(selectedLibrary);
	const loading = useFetchSchemas(libId);
	const schemas = useRecoilValue(schemasState);
	
	useEffect(() => {
		if (!loading && schemas.length) { 
			setSchemaId(schemas[0].schemaId);
		}
	}, [loading, schemas]);
	
	const LibTitle = () => (
		<div>
			<Box >
				<Typography style={{ flex: 1, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
					{library.name}
				</Typography>
			</Box>
		</div>
	);
	const LibDates = () => (
		<div>
			<Box>
				<Typography style={{ flex: 1, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
					Created at <span>{moment(library.createdTime).format('DD-MM-YY @ hh:mm')}</span>
				</Typography>
			</Box>
			<Box>
				<Typography style={{ flex: 1, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
					Last updated at <span>{moment(library.updatedTime).format('DD-MM-YY @ hh:mm')}</span>
				</Typography>
			</Box>
		</div>
	);
		

	const Stuff = () => {
		console.log('Schemas ->', schemas);
		return (
			<div style={{ flex: 1 }}>
				<div style={{ height: 40, paddingLeft: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<Tooltip title={access.translate('Undo')}  >
							<IconButton size={'small'} style={{ marginRight: 10 }}>
								<Icon fontSize={'small'}>undo</Icon>
							</IconButton>
						</Tooltip>
						<Tooltip title={access.translate('Redo')}  >
							<IconButton size={'small'}>
								<Icon fontSize={'small'}>redo</Icon>
							</IconButton>
						</Tooltip>
					</div>
					<div>
						<Tooltip title={access.translate('Save')}  >
							<IconButton size={'small'} style={{ marginRight: 10 }}>
								<Icon fontSize={'small'}>save</Icon>
							</IconButton>
						</Tooltip>
						<Tooltip title={access.translate('Copy')}  >
							<IconButton size={'small'}>
								<Icon fontSize={'small'}>content_copy</Icon>
							</IconButton>
						</Tooltip>
					</div>
				</div>
				<CodeEditor  />
			</div>

		);
	};
	return (
		<div style={{ display: 'flex', flex: 1 }}>

			<div style={{
				flex: 1, 
				background: 'white',
				borderRadius: '4px',
				border: '1px solid #dedede',
				position: 'relative',
				maxWidth: 'calc(235px - 11px)',
			}}>
				
				<WidgetHeader title={'Schemas'} icon={'assignment'} style={{ padding: '5px 10px' }}/>
				<div style={{ display: 'flex', flex: 1, height: 'calc(100% - 40px)' }}> 
					<div style={{ 
						padding: '10px 0', 
						background: 'white', 
						flex: 1,
						height: 'calc(100% - 150px)',
						position: 'relative', 
					}}>
						{ 
							(!loading && schemas) && schemas.map(item => (
								<SchemaListItem key={ item.schemaId } item={ item }/>
							)) 
						}
						{
							(!loading && library) && (
								<div style={{ 
									borderTop: 'solid 1px rgba(221,221,221,.75)', 
									background: '#f1f1f1', 
									position: 'absolute', 
									bottom: -130, 
									left: 0, 
									right: 0, 
									padding: '10px 0 0',
									height: 120,
								}}>
									<LibTitle />
									<LibDates />
								</div>
							)
						}
					</div> 
				</div>
			</div> 
			{
				(!loading && schemas) &&  <Stuff />
			}
		</div>
	);
};

Schemas.propTypes = {
	libId: PropTypes.string,
};

Schemas.defaultProps = {
	libId: '',
};

export default Schemas;
