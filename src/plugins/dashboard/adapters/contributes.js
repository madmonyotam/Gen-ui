
import moment from 'moment';
import { sortBy } from 'lodash';

const getContributeForDay = (user, day) => {
	const currentDay = day.format('x');
	const lastDay = moment(day).subtract(1,'day').format('x');
		
	let contributeByDay = 0;

	user.contribute.forEach(con => {
		if(con.date > lastDay && con.date < currentDay){
			contributeByDay += con.amount;
		}
	});

	return contributeByDay;
};

export const setAllContributeByDate = (users) => {
	const datesArray = [];
	const start = moment();

	for (let i = 0; i < 30; i++) {
		const currentDay = start.subtract(1, 'days');
		datesArray[i] = {
			date: currentDay.format('x'),
			amount: getContributeForDay(users[0],currentDay)
		};	
	}

	return( sortBy(datesArray,'date') );
};
