
import moment from 'moment';
import { sortBy } from 'lodash';

const getContributeForDay = (users, day) => {
	const currentDay = day.format('x');
	const lastDay = moment(day).subtract(1,'day').format('x');

	const allContributes = users.reduce((allCon,user) => {
		let contributeByDay = 0;

		user.contribute.forEach(con => {
			if(con.date > lastDay && con.date < currentDay){
				contributeByDay += con.amount;
			}
		});

		allCon += contributeByDay;

		return allCon;
	},0);

	return allContributes;
};

export const setAllContributeByDate = (users) => {
	const datesArray = [];
	const start = moment();

	for (let i = 0; i < 32; i++) {
		const currentDay = moment(start).subtract(i, 'days');
		datesArray[i] = {
			date: currentDay.format('x'),
			amount: getContributeForDay(users,currentDay)
		};	
	}

	return( sortBy(datesArray,'date') );
};
