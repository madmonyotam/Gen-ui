import React from 'react';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import WidgetHeader from 'plugins/tools/WidgetHeader';
import LineCanvas from 'plugins/canvases/LineCanvas';

import { selectedProjectId } from '../../tree/atoms';

const Container = styled.div`
	position: relative;
	width: auto;
	flex: 1.25;
	border-radius: 2px;
	display: flex;
	flex-direction: column;
`;

const WidgetCont = styled.div`
	width: 100%;
  flex: 1;
	border-radius: 4px;
	overflow: hidden;
	margin-top: 10px;
`;

const ContributesGraph = () => {
	const projectId = useRecoilValue(selectedProjectId);

	return (
		<Container>
			<WidgetHeader title={'Updated By Time'} icon={'insert_chart_outlined'}/>
			<WidgetCont>
				<LineCanvas projectId={projectId}/>
			</WidgetCont>
		</Container>
	);
};

export default ContributesGraph;
