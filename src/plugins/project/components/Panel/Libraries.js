import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Divider } from '@material-ui/core';

import CreateLibrary from './CreateInput';
import LibraryListItem from './LibraryListItem';
import { useFetchtLibs } from 'plugins/project/actions';
import { selectedLibId, librariesState } from 'plugins/project/tree/atoms';

const Libraries = props => {
	
	const { projectId } = props;
	const loading = useFetchtLibs(projectId);
	const setLibId = useSetRecoilState(selectedLibId);
	const data = useRecoilValue(librariesState);

	useEffect(() => {
		if (!loading && data.length) {
			setLibId(data[0].id);
		}
	}, [loading, data]);

	return (
		<div style={{ flexDirection: 'column' }}>

			<CreateLibrary existingLibraries={ data } projectId={ projectId } />
			<Divider style={{ marginBottom: 15 }} />

			<div>
				{
					(!loading && data) && data.map( lib => <LibraryListItem library={ lib } key={ lib.id }/> )
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
