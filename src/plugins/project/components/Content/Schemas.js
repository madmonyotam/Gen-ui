import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFetchSchemas } from 'plugins/project/actions';
import { schemasState, selectedSchemaId, selectedLibId } from 'plugins/project/tree/atoms';
import * as access from 'plugins/access';

import { CircularProgress, Divider, Icon, IconButton, Tooltip } from '@material-ui/core';
import SchemaListItem from './SchemaListItem';
import LibraryInformation from './LibraryInfo';
import CodeEditor from './Editor';
import CreateInput from 'plugins/tools/CreateInput';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

const Schemas = () => {
	const setSchemaId = useSetRecoilState(selectedSchemaId);
	const libId = useRecoilValue(selectedLibId);
	// const library = useRecoilValue(selectedLibrary);
	const loading = useFetchSchemas(libId);
	const schemas = useRecoilValue(schemasState);
	
	useEffect(() => {
		if (!loading && schemas.length) {
			setSchemaId(schemas[0].schemaId);
		}
	}, [loading, schemas]);
	

	const EditorContainer = () => {
		if (!loading && !schemas.length) return null;
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
				<CodeEditor />
			</div>

		);
	}; 
	return (
		<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

			<div style={{
				flex: 1, 
				background: 'white',
				borderRadius: '4px',
				border: '1px solid #dedede',
				position: 'relative',
				maxWidth: 'calc(235px - 11px)',
			}}>
				
				<LoaderTimeout isLoading={ loading } coverAll={false} pendingExtraTime={1000}>
					<div style={{ padding: '0 10px' }}>
						<CreateInput type={ 'schema' } existingData={schemas.length ? schemas.map(s => s.name.toLowerCase()) : [] } />
						<Divider />
					</div>
					
					{/* // <WidgetHeader title={'Schemas'} icon={'assignment'} style={{ padding: '5px 10px' }}/> */}
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
							<LibraryInformation />
						</div> 
					</div>
				</LoaderTimeout>
			</div>
			<EditorContainer />
		</div>
	);
};
 

export default Schemas;
