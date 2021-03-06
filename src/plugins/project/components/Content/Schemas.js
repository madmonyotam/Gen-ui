import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { useFetchSchemas } from 'plugins/project/actions';
import { schemasState, selectedSchemaId, selectedLibId } from 'plugins/project/tree/atoms';
import { selectedSchema } from 'plugins/project/tree/selectors';

import { Divider } from '@material-ui/core';
import SchemaListItem from './SchemaListItem';
import LibraryInformation from './LibraryInfo';
import CodeEditor from './Editor';
import CreateInput from 'plugins/tools/CreateInput';
import LoaderTimeout from 'plugins/tools/LoaderTimeout'; 
import FieldsBox from './FieldsBox';
import Generator from './Generator';

const Schemas = () => {
	const [schemaId, setSchemaId] = useRecoilState(selectedSchemaId);
	const libId = useRecoilValue(selectedLibId);

	const loading = useFetchSchemas(libId);
	const [schemas, setSchemas] = useRecoilState(schemasState);
	const schema = useRecoilValue(selectedSchema);
	
	useEffect(() => {
		if (!loading && schemas.length) {
			if (schemaId) return;
			setSchemaId(schemas[0].schemaId);
		}
		
		return () => { setSchemaId(undefined); };

	}, [loading, schemas]);
	
	const handleCreated = (res) => {
		const newSchema = {
			...res.params,
			schemaId: res.schemaId,
			createdTime: Date.now(),
			updatedTime: Date.now()
		};

		const newlist = [
			...schemas,
			newSchema
		];
		setSchemas(newlist);

	};
	const Panel = () => (
		<div style={{
			flex: 1,
			background: '#fff',
			borderRadius: '4px',
			border: '1px solid #dedede',
			position: 'relative',
			maxWidth: 'calc(235px - 11px)',
		}}>

			<LoaderTimeout isLoading={loading} coverAll={false} pendingExtraTime={1500}>
				<div style={{ padding: '0 10px' }}>
					<CreateInput type={'schema'} existingData={schemas.length ? schemas.map(s => s.name.toLowerCase()) : []} onCreated={handleCreated} />
					<Divider />
				</div>

				<div style={{ display: 'flex', flex: 1, height: 'calc(100% - 40px)' }}>
					<div style={{
						padding: '10px 0',
						background: '#fff',
						flex: 1,
						height: 'calc(100% - 150px)',
						position: 'relative',
					}}>
						<div style={{ height: '100%', overflow: 'auto' }}>

							{
								schemas && schemas.map(item => (
									<SchemaListItem key={item.schemaId} item={item} />
								))
							}
						</div>

						<LibraryInformation />
					</div>
				</div>
			</LoaderTimeout>
		</div>
	);

	if (!libId) return null;
	return (
		<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

			<Panel />
			{
				(!loading && schemas.length > 0) && (
					<div style={{ display: 'flex', flexDirection: 'row', flex: 1, padding:'0 0 25px 25px' }}>
						<div style={{ display: 'flex', flexDirection: 'column', width: '35%' }}>
							<FieldsBox />
							<CodeEditor />  
						</div>
						<Generator />
					</div>
				)
			} 
		</div>
	);
};
 

export default Schemas;
