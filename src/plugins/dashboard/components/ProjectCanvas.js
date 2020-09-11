import React, { useEffect, useCallback } from 'react';
import MainCanvas from 'plugins/canvases/MainCanvas';
import { useBranch } from 'baobab-react/hooks';

import styled from 'styled-components';

import * as libsActions from 'tree/actions/libs';
import * as access from 'plugins/access';
import Mask from 'plugins/tools/Mask';
import WidgetHeader from 'plugins/tools/WidgetHeader';

import Request from 'plugins/request';

const Canvas = styled.div`
	position: relative;
	width: auto;
	flex: 1;
	overflow: hidden;
	border-radius: 2px;
`;

const ProjectCanvas = () => {

	const { viewKey } = useBranch({ viewKey: ['viewKey'] });
	const { libs, dispatch } = useBranch({ libs: ['libs'] });
	const stableDispatch = useCallback(dispatch, []);
    
	useEffect(() => {
		Request.get('/getAllLibraries')
			.then(res => {
				stableDispatch(libsActions.setLibs, res.data);
			});
	}, [stableDispatch]);
    
	const top = access.dim('widgetHeader.height');
    
	return (
		<Canvas >
			<WidgetHeader title={'Pack View'} icon={'bubble_chart'} showDivider={ false }/>
			<Mask
				opacity={1}
				top={`${top}px`}
				mask={access.color('backgrounds.secondary')}
				style={{ display: 'flex' }}
			>
				<MainCanvas key={viewKey} />
			</Mask>
		</Canvas>
	);
};

export default ProjectCanvas;