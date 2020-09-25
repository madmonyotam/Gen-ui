import React from 'react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { Typography } from '@material-ui/core';
import { selectedLibrary } from 'plugins/project/tree/selectors';

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

const LibraryInfo = () => {
	const library = useRecoilValue(selectedLibrary);
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
	if (!library) return null;
	return (
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


export default LibraryInfo;