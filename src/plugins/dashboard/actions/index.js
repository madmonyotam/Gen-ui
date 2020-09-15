import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Request from 'plugins/request';

import * as gengine from 'gen-engine';
import { projectListState } from '../tree/atoms';


export const useFetchProjects = email => {
	
	const [loading, setLoading] = useState(true);
	const setProjectList = useSetRecoilState(projectListState);

	useEffect(() => {
		if (!email) {
			setLoading(false);
			return;
		}
		Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setProjectList( data.projects );
					setLoading(false);
				}
			});
	}, [email, setProjectList]);

	return loading;
};

export const handleRemoveProject = (id, email) => {
	Request.remove(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/${id}/${email}`)
		.then(({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				// getProjects();
			}
		});
}; 

export const getProjectUsers = projectId => { 
	const random = Math.floor(Math.random() * 25 + 3);

	const schema = {
		firstName: { type: 'firstName' },
		lastName: { type: 'lastName' },
		userName: { type: 'userName' },
		avatar: { type: 'avatar' },
		lastUpdate: {
			type: 'recentDate',
			value: {
				days: 25
			}
		},
		email: { type: 'email' },
		id: { type: 'id' }
	};

	let users = gengine.generate(schema, random);

	users[0].ownership = 'owner';
	users[1].ownership = 'member';
	users[2].ownership = 'guest'; 
	
	return users;
};