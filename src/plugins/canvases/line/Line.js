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
		this.linesGroup = this.canvas.append('g').attr('class', 'linesGroup');
	}

	setData(data) {
		this.data = data;
	}

	paintGraph() {
		this.createScale();
		this.paintAxis();
		this.paintLine(this.data,0);
	}

	paintAxis() { 
				
		const axis = d3.axisBottom()
			.ticks(12)
			.scale(this.xScale);

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

	createScale() {
		this.xScale = d3.scaleTime()
			.domain([moment().subtract(1, 'month'),moment()])
			.range([10,this.width - 10]);

		const yScale = d3.scaleLinear()
			.domain([0,100])
			.range([25,this.height-25]);

		this.Dline = d3.line()
			.x(d => this.xScale(d.date))
			.y(d => this.height - yScale(d.amount))
			.curve(d3.curveBasis);

	}

	updateLine(index) {
		this.linesGroup.select(`#linePath-${index}`)
			.data([this.data])
			.transition()
			.duration(700)
			.ease((t)=> d3.easeCubicInOut(t))
			.attr('d', this.Dline);
	}

	paintLine(data, index) {
		const defs = this.linesGroup.append('defs');
		this.createGradient(defs, index);

		this.linesGroup.selectAll('.linePath')
			.data([data])
			.enter()
			.append('path')
			.attr('id',`linePath-${index}`)
			.attr('fill','none')
			.attr('stroke',  `url(#svgGradient-${index})`)
			.attr('stroke-width',2)
			.attr('d', this.Dline);
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
