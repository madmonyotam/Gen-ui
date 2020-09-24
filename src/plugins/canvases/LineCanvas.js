import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Start from 'plugins/tools/Start';
import * as access from 'plugins/access';

import { paintFrame } from 'plugins/canvases/paint/Frames';
import { move } from 'plugins/canvases/utils/canvasActions';
import { setContributeLine } from 'plugins/canvases/utils/lineUtils';
import LineGraph from 'plugins/canvases/line/Line';



class LineCanvas extends PureComponent {
	constructor(props) {
		super(props);
		this.setDataToGraph = this.setDataToGraph.bind(this);
		this.onCanvasReady = this.onCanvasReady.bind(this);
	}

	
	componentDidUpdate(prevProps) {
		const { data } = this.props;
		if (prevProps.data !== data && this.lineGraph){
			this.lineGraph.setData(data);
			this.lineGraph.updateLine(0); 
		}
	}
	

	setDataToGraph(canvas, width, height) {
		const { data } = this.props;
		const lineGraph = new LineGraph({ canvas, width, height });
		setContributeLine(lineGraph);

		this.lineGraph = lineGraph;
      
		this.lineGraph.setData(data);
		this.lineGraph.paintGraph();
	}

	onCanvasReady(canvas, width, height) {

		const frame = paintFrame(canvas, width, height, 'lineGraph');
		move(canvas, frame, access.color('lineCanvas.move'));
		this.setDataToGraph(canvas, width, height);
	}

	renderLineCanvas() {
		const margin = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};

		return <Start canvasReady={this.onCanvasReady} margin={margin} />;
	}
	
	render() {
		return(
			<div style={{ height: '100%', width: '100%', userSelect: 'none' }}>
				{this.renderLineCanvas()}
			</div>
		);
	}
}

LineCanvas.propTypes = {
	data: PropTypes.array
};

export default LineCanvas;
