import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Request from 'plugins/request';
import { projectListState } from '../tree/atoms';

const LIBRARY_API = '/libraryRestAPI-libraryRestAPI/library';

export const useFetchProjects = email => {
	
	const [loading, setLoading] = useState(true);
	const setProjectList = useSetRecoilState(projectListState);

	useEffect(() => {
		if (!email) {
			setLoading(false);
			return;
		}
		Request.get(`projectRestAPI-projectRestAPI/project/users/${email}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setProjectList( data.projects );
					setLoading(false);
				}
			});
	}, [email, setProjectList]);

	return loading;
};

export const deleteProject = (id, email) => {
	
	return Request.delete(`projectRestAPI-projectRestAPI/project/${id}/${email}`)
		.then(({ data }) => {
			return data.status.toLowerCase() === 'success';
		})
		.catch(error => {
			console.error(error);
			return false;
		});
}; 

export const getUsersContributes = (projectId) => {
	const amount = Math.floor(Math.random() * 5 + 1);

	const offlineParams = {
		lib: 'users', 
		cat: 'user',
		amount
	};
	
	return Request.get('url', { projectId }, offlineParams)
		.then(({ data }) => {
			return data;
		})
		.catch(error => {
			console.error(error);
			return false;
		});
};

export const getAllLibraries = (projectId) => {
	return Request.get(`${LIBRARY_API}/projects/${projectId}`)
		.then(({ data }) => {
			if(data.status.toLowerCase() === 'success') return data.libraries;
		});
};
