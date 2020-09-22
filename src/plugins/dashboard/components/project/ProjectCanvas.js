import React, { useEffect, useCallback } from 'react';
import MainCanvas from 'plugins/canvases/MainCanvas';
import { useBranch } from 'baobab-react/hooks';

import styled from 'styled-components';

import * as libsActions from 'tree/actions/libs';
import WidgetHeader from 'plugins/tools/WidgetHeader';

import Request from 'plugins/request';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: auto;
	flex: 1;
	border-radius: 2px;
`;

const WidgetCont = styled.div`
	width: 100%;
	flex: 1;
	border-radius: 4px;
	overflow: hidden;
	margin-top: 10px;
`;

const ProjectCanvas = () => {

	const { libs, dispatch } = useBranch({ libs: ['libs'] });
	const stableDispatch = useCallback(dispatch, []);

	// useEffect(() => {
	// 	Request.get('/getAllLibraries')
	// 		.then(res => {
	// 			stableDispatch(libsActions.setLibs, res.data);
	// 		});
	// }, [stableDispatch]);

	return (
		<Container>
			<WidgetHeader title={'Pack View'} icon={'bubble_chart'}/>
			<WidgetCont>
				<MainCanvas/>
			</WidgetCont>
		</Container>
	);
};

export default ProjectCanvas;
