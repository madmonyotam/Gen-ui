import React from 'react';
import { useRecoilValue } from 'recoil';
import * as access from 'plugins/access';

import useResizeWindow from 'plugins/hooks/useResizeWindow';

import styled from 'styled-components';

import WidgetHeader from 'plugins/tools/WidgetHeader';
import LineCanvas from 'plugins/canvases/LineCanvas';

import { contributeByDate } from 'plugins/dashboard/tree/selectors';


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
	overflow: hidden;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${ access.color('borders.primary') };
	border-radius: 4px;
`;

const ContributesGraph = () => {
	const contribute = useRecoilValue(contributeByDate);
	const size = useResizeWindow();
	const sizeKey = `${size.width}-${size.hight}`; 

	return (
		<Container>
			<WidgetHeader title={access.translate('Updated By Time')} icon={'insert_chart_outlined'}/>
			<WidgetCont>
				<LineCanvas key={sizeKey} data={contribute}/>
			</WidgetCont>
		</Container>
	);
};

export default ContributesGraph;
