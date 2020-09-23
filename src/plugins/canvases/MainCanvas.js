import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Start from 'plugins/tools/Start';
import * as access from 'plugins/access';

import { move } from 'plugins/canvases/utils/canvasActions';

import LibraryPack from 'plugins/canvases/pack/LibraryPack';

import { paintFrame } from 'plugins/canvases/paint/Frames';


class MainCanvas extends PureComponent {
	constructor(props) {
		super(props);
		this.setDataToGraph = this.setDataToGraph.bind(this);
		this.onCanvasReady = this.onCanvasReady.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { data } = this.props;
		if (prevProps.data !== data && this.pack){
			this.pack.createPack(data);
		}
	}

	setDataToGraph(canvas, width, height) {
		const { data } = this.props;
		this.pack = new LibraryPack({ canvas, width, height });
		this.pack.createPack(data);
	}

	onCanvasReady(canvas, width, height) {

		const frame = paintFrame(canvas, width, height);
		move(canvas, frame, access.color('canvases.move'));

		this.setDataToGraph(canvas, width, height);
	}

	renderPackCanvas() {
		const margin = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};

		return <Start canvasReady={this.onCanvasReady} margin={margin} />;
	}

	render(){

		return (
			<div style={{ height: '100%', width: '100%', userSelect: 'none' }}>
				{this.renderPackCanvas()}
			</div>
		);
	}
}

MainCanvas.propTypes = {
	data: PropTypes.object.isRequired
};

export default MainCanvas;
