import React from 'react';

import { setAllContributeByDate } from 'plugins/dashboard/adapters/contributes';

import Start from 'plugins/tools/Start';
import * as access from 'plugins/access';
import useResizeWindow from 'plugins/hooks/useResizeWindow';

import { move } from 'plugins/canvases/utils/canvasActions';

import { getUsersContributes } from 'plugins/dashboard/actions';
import LineGraph from 'plugins/canvases/line/Line';

import {
	paintFrame,
	fillFrame,
} from 'plugins/canvases/paint/Frames';

function LineCanvas(projectId) {
	const size = useResizeWindow();
	const key = `${size.width}-${size.height}`;

	const getContributes = (canvas, width, height) => {
		getUsersContributes(projectId).then((data) => {

			const modifyData = setAllContributeByDate(data);
			const lineGraph = new LineGraph({ canvas, width, height });
      
			lineGraph.setData(modifyData);
			lineGraph.paintGraph();

		});
	};

	const onCanvasReady = (canvas, width, height) => {

		const frame = paintFrame(canvas, width, height, 'lineGraph');
		move(canvas, frame, access.color('lineCanvas.move'));
    
		if(!projectId) return;
		
		fillFrame(access.color('lineCanvas.bg'),'lineGraph');
		getContributes(canvas, width, height);
	};

	const renderLineCanvas = () => {
		const margin = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};

		return <Start canvasReady={onCanvasReady} margin={margin} />;
	};

	return (
		<div key={ key } style={{ height: '100%', width: '100%', userSelect: 'none' }}>
			{renderLineCanvas()}
		</div>
	);
}

export default LineCanvas;
