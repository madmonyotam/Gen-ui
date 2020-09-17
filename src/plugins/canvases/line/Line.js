import * as d3 from 'd3';
import * as access from 'plugins/access';
import moment from 'moment';

import { move } from 'plugins/canvases/utils/canvasActions';

export default class Line {
	constructor(params) {
		this.colorScaleRange = [
			access.color('canvases.packBgStart'),
			access.color('canvases.packBgEnd')
		];

		// const colorScale = d3
		// .scaleLinear()
		// .domain([0, packDomain])
		// .range(colorScaleRange);

		this.textClasses = {
			in: 'light-text',
			out: 'text'
		};

		this.init(params);
	}

	init(params) {
		this.canvas = params.canvas;
		this.width = params.width;
		this.height = params.height;
		this.mainGroup = this.canvas.append('g').attr('class', 'line');
	}

	setData(users) {

		// console.log(users);
		this.paintAxis();
	}

	paintAxis() {
		const widthScale = d3.scaleTime()
			.domain([moment().add(-1, 'month'),moment()])
			.range([0,this.width - 20]);   
				
		const axis = d3.axisBottom()
			.ticks(12)
			.scale(widthScale);

		const Xaxis = this.mainGroup.attr('transform', `translate(10,${this.height - 20})`).call(axis);

		Xaxis.selectAll('.tick text')			
			.attr('fill', access.color('lineCanvas.fg'))
			.attr('font-size',10)
			.attr('stroke', access.color('lineCanvas.fg'))
			.attr('stroke-width',0.3);
		
		Xaxis.selectAll('.tick line')
			.attr('stroke',access.color('lineCanvas.fg'));	

		Xaxis.select('.domain')	
			.attr('stroke',access.color('lineCanvas.fg'))
			.attr('stroke-width','2');

	}
}
