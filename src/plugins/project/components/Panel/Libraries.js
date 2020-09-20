import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { Divider, Typography } from '@material-ui/core';

import CreateLibrary from './CreateInput';
import { useFetchtLibs } from 'plugins/project/actions';
import { selectedLibId, librariesState } from 'plugins/project/tree/atoms';

const Libraries = props => {
	
	const { projectId } = props;
	const loading = useFetchtLibs(projectId);
	const [selectedlibId, setLibId] = useRecoilState(selectedLibId);
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

			<div style={{ paddingLeft: 5 }}>
				{
					(!loading && data) && data.map(lib => (
						<div onClick={ () => setLibId(lib.id) } key={lib.id} style={{ cursor: 'pointer', height: 25, display: 'flex', alignItems: 'center' }}>
							<Typography style={{ fontSize: selectedlibId === lib.id ? 18 : 12 }}>{lib.name}</Typography>
						</div>
					))
				}
			</div>
		</div>	
	);
};

Libraries.propTypes = { 
	projectId: PropTypes.string,
	data: PropTypes.array,
};

Libraries.defaultProps = { 
	projectId: '',
	data: [],
};

export default Libraries;