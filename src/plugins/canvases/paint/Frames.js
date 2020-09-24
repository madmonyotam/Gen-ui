import * as access from 'plugins/access';
import * as d3 from 'd3';

export const paintFrame = (canvas, width, height, id = 'mainFrame') => {
	const frame = canvas
		.append('rect')
		.attr('id',id)
		.attr('width', width)
		.attr('height', height)
		.attr('fill', access.color('canvases.bg'));

	return frame;
};

export const fillFrame = (color, id = 'mainFrame') => { 
	d3.select(`#${id}`)
		.transition()
		.duration(1000)
		.attr('fill', color);
};
