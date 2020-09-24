import React from 'react';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { useRecoilValue } from 'recoil';

import useResizeWindow from 'plugins/hooks/useResizeWindow';

import { librariesForPack } from 'plugins/dashboard/tree/selectors';

import MainCanvas from 'plugins/canvases/MainCanvas';
import WidgetHeader from 'plugins/tools/WidgetHeader';

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
	overflow: hidden;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${ access.color('borders.primary') };
	border-radius: 4px;
`;

const ProjectCanvas = () => {
	const libs = useRecoilValue(librariesForPack);
	const size = useResizeWindow();
	const sizeKey = `${size.width}-${size.hight}`; 

	return (
		<Container>
			<WidgetHeader title={access.translate('Libraries')} icon={'bubble_chart'}/>
			<WidgetCont>
				<MainCanvas key={sizeKey} data={ libs }/>
			</WidgetCont>
		</Container>
	);
};

export default ProjectCanvas;
