import React ,{ useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useResizeWindow from 'plugins/hooks/useResizeWindow';

import styled from 'styled-components';

import WidgetHeader from 'plugins/tools/WidgetHeader';
import LineCanvas from 'plugins/canvases/LineCanvas';

import { getUsersContributes } from 'plugins/dashboard/actions';
import { setAllContributeByDate } from 'plugins/dashboard/adapters/contributes';

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
	const [data, setDate] = useState([]);
	const projectId = useRecoilValue(selectedProjectId);
	const size = useResizeWindow();
	const sizeKey = `${size.width}-${size.hight}`; 

	useEffect(() => {
		if(projectId){
			getUsersContributes(projectId).then((data) => {
				setDate(setAllContributeByDate(data));
			});
		}
	}, [projectId]);

	return (
		<Container>
			<WidgetHeader title={'Updated By Time'} icon={'insert_chart_outlined'}/>
			<WidgetCont>
				<LineCanvas key={sizeKey} data={data}/>
			</WidgetCont>
		</Container>
	);
};

export default ContributesGraph;
