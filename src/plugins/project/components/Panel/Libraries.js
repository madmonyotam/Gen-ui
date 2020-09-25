import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useRecoilState } from 'recoil';

import { Divider } from '@material-ui/core';

import LibraryListItem from './LibraryListItem';
import { useFetchtLibs } from 'plugins/project/actions';
import { selectedLibId, librariesState } from 'plugins/project/tree/atoms';
import CreateInput from 'plugins/tools/CreateInput';

const Libraries = props => {
	
	const { projectId } = props;
	const loading = useFetchtLibs(projectId);
	const [libId, setLibId] = useRecoilState(selectedLibId);
	const [libraries, setLibraries] = useRecoilState(librariesState);

	const existingLibraries = libraries.map(l => l.name.toLowerCase());

	useEffect(() => {
		if (!loading && libraries.length) {
			if (!libId) setLibId(libraries[0].id);
		}
	}, [loading, libraries]);

	const handleCreated = (res) => {
		let newLib = {
			...res.params,
			createdTime: Date.now(),
			updatedTime: Date.now(),
			id: res.libraryId
		};
		let newList = [
			...libraries,
			newLib
		];
		setLibraries(newList);
	};

	return (
		<div style={{ flexDirection: 'column', height: '100%' }}>
			{
				<CreateInput existingData={ existingLibraries } type={ 'library' } onCreated={ handleCreated } />
			} 
			<Divider style={{ marginBottom: 15 }} />

			<div style={{ overflow: 'auto', height: 'calc(100% - 175px)' }}>
				{
					(!loading && libraries) && libraries.map( lib => <LibraryListItem library={ lib } key={ lib.id }/> )
				}
			</div>
		</div>	
	);
};

Libraries.propTypes = { 
	projectId: PropTypes.string,
};

Libraries.defaultProps = { 
	projectId: '',
};

export default Libraries;
