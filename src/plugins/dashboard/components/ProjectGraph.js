import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { Card } from '@material-ui/core';

import WidgetHeader from 'plugins/tools/WidgetHeader';

const moment = extendMoment(Moment); 

const GRAPH_AXES = [
	{ primary: true, type: 'ordinal', position: 'bottom' },
	{ type: 'linear', position: 'left', stacked: true },
];


const ProjectGraph = (props) => {
	const { project } = props;

	const [type, setType] = useState('area');

	const data = useMemo( () => {
		const fromDate = moment().subtract(7, 'days');
		const toDate = moment();

		const range = moment.range(fromDate, toDate);

		const dates = Array.from(range.by('days', { excludeEnd: true })); 
		const data = project.users.map(user => {
			const gData = [];
			dates.forEach(date => {
				gData.push({ primary: date.format('ll @ HH:mm'), secondary: Math.floor(Math.random() * 100 + 10) });
			});
			return {
				label: user,
				data: gData
			};
		});

		return data; 
	}, [project.users]); 

	const axes = useMemo(() => GRAPH_AXES, []);

	if (!project) return null;

	const onIconClick = () => {
		if (type === 'area') setType('line');
		else setType('area');
	};

	return (
		<Card style={{ position: 'relative', width: 'auto', flex: 1.25, padding: '0 15px 15px' }}>
			<WidgetHeader title={'Updated By Time'} icon={'insert_chart_outlined'} onIconClick={ onIconClick }/>

			<div style={{ width: '100%', height: 'calc(100% - 45px)' }} >
			</div>
		</Card>
	);
};

ProjectGraph.propTypes = {
	project: PropTypes.object
};

ProjectGraph.defaultProps = {
	project: { }
};

export default ProjectGraph;
