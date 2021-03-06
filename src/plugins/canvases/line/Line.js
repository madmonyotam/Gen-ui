import * as d3 from 'd3';
import access from 'plugins/access';
import moment from 'moment';
import { maxBy, get, isEmpty } from 'lodash';

export default class Line {
	constructor(params) {
		this.monthBack = get(params,'monthBack', 1);

		this.init(params);
		this.createGradients();

		this.YField = get(params,'YField','amount');

		this.initTimeAxis();
	}

	init(params) {
		this.canvas = params.canvas;
		this.width = params.width;
		this.height = params.height;
		this.mainGroup = this.canvas.append('g').attr('class', 'line');
		this.linesGroup = this.canvas.append('g').attr('class', 'linesGroup');
		this.defs = this.linesGroup.append('defs');
	}

	initTimeAxis() {
		this.xScale = d3.scaleTime()
			.domain([moment().subtract(this.monthBack, 'month'),moment()])
			.range([10,this.width - 10]);
		
		this.axis = d3.axisBottom().ticks(12).scale(this.xScale);
	}

	updateTimeAxis(monthBack) {
		this.monthBack = monthBack;
		this.xScale.domain([moment().subtract(this.monthBack, 'month'),moment()]);
		this.axis.scale(this.xScale);

		d3.select('#timeAxis')
			.transition()
			.duration(1200)
			.call(this.axis);

		this.setData(this.data);	
		this.updateLine(0);
	}

	paintAxis() { 
		const Xaxis = this.mainGroup.attr('transform', `translate(0,${this.height - 20})`).attr('id','timeAxis').call(this.axis);

		Xaxis.selectAll('.tick text')			
			.attr('fill', access.color('lineCanvas.fg'))
			.attr('font-size',9)
			.attr('stroke', access.color('lineCanvas.fg'))
			.attr('stroke-width',0.3);
		
		Xaxis.selectAll('.tick line')
			.attr('stroke',access.color('lineCanvas.fg'));	

		Xaxis.select('.domain')	
			.attr('stroke',access.color('lineCanvas.fg'))
			.attr('stroke-width',1.5);

	}

	createGradients() {
		this.defs = this.linesGroup.append('defs');
		const colors = [
			{
				start: access.color('lineCanvas.line'),
				end: access.color('lineCanvas.fg'),
			},
			{
				start: '#b3898d',
				end: access.color('lineCanvas.fg'),
			}
		];

		colors.map(this.createGradient.bind(this));
	}

	createGradient(color, index) {
		var gradient = this.defs
			.append('linearGradient')
			.attr('id', `svgGradient-${index}`)
			.attr('x1', '0%')
			.attr('x2', '0%')
			.attr('y1', '100%')
			.attr('y2', '0%');
	
		gradient
			.append('stop')
			.attr('class', 'start')
			.attr('offset', '0%')
			.attr('stop-color', color.start)
			.attr('stop-opacity', 0.8);
	
		gradient
			.append('stop')
			.attr('class', 'end')
			.attr('offset', '100%')
			.attr('stop-color', color.end)
			.attr('stop-opacity', 1);
	}

	setData(data) {
		this.data = data;
		this.createScale();
	}

	paintGraph() {
		this.paintAxis();
		this.paintLine(this.data,0);
	}

	createScale() {
		const Ymax = isEmpty(this.data) ? 100 : maxBy(this.data, this.YField)[this.YField];

		const yScale = d3.scaleLinear()
			.domain([0,Ymax])
			.range([25,this.height-15]);

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
			.attr('d', this.Dline)
			.attr('opacity',0.8)
			.attr('stroke-width',1)
			.on('end', function(){
				d3.select(this)
					.transition()
					.duration(500)
					.ease((t)=> d3.easeCubicInOut(t))
					.attr('stroke-width',2)
					.attr('opacity',1);
			});
	}

	paintLine(data, index) {
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
}
