import * as d3 from 'd3';
import * as access from 'plugins/access';
import moment from 'moment';

export default class Line {
	constructor(params) {
		this.colorScaleRange = [
			access.color('lineCanvas.fg'),
			access.color('lineCanvas.move')
		];

		this.init(params);
	}

	init(params) {
		this.canvas = params.canvas;
		this.width = params.width;
		this.height = params.height;
		this.mainGroup = this.canvas.append('g').attr('class', 'line');
	}

	setData(data) {
		this.data = data;
	}

	paintGraph() {
		this.paintAxis();
		this.paintLine(this.data,0);
	}

	paintAxis() {
		const widthScale = d3.scaleTime()
			.domain([moment().subtract(1, 'month'),moment()])
			.range([10,this.width - 10]);   
				
		const axis = d3.axisBottom()
			.ticks(12)
			.scale(widthScale);

		const Xaxis = this.mainGroup.attr('transform', `translate(0,${this.height - 20})`).call(axis);

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

	paintLine(data, index) {
		var xScale = d3.scaleTime()
			.domain([moment().subtract(1, 'month'),moment()])
			.range([10,this.width - 10]);

		var yScale = d3.scaleLinear()
			.domain([0,100])
			.range([25,this.height-25]);

		const line = d3.line()
			.x(d => xScale(d.date))
			.y(d => this.height - yScale(d.amount))
			.curve(d3.curveBasis);

		const group = this.canvas.append('g');

		const defs = group.append('defs');
		this.createGradient(defs, index);

		group.selectAll('.linePath')
			.data([data])
			.enter()
			.append('path')
			.attr('fill','none')
			.attr('stroke',  `url(#svgGradient-${index})`)
			.attr('stroke-width',2)
			.attr('d', line);	
	}

	createGradient(defs, index) {


		const colors = [
			{
				start: access.color('lineCanvas.fg'),
				end: '#c3f7eb',
			},
			{
				start: access.color('lineCanvas.fg'),
				end: '#b3898d'
			}
		];

		var gradient = defs
			.append('linearGradient')
			.attr('id', `svgGradient-${index}`)
			.attr('x1', '100%')
			.attr('x2', '0%')
			.attr('y1', '0%')
			.attr('y2', '0%');
	
		gradient
			.append('stop')
			.attr('class', 'start')
			.attr('offset', '0%')
			.attr('stop-color', colors[index].start)
			.attr('stop-opacity', 0.8);
	
		gradient
			.append('stop')
			.attr('class', 'end')
			.attr('offset', '50%')
			.attr('stop-color', colors[index].end)
			.attr('stop-opacity', 1);
	}
}
