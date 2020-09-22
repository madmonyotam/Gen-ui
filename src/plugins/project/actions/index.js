import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { librariesState } from '../tree/atoms';
import Request from 'plugins/request';


const PROJECTS_API = '/projectRestAPI-projectRestAPI/project';
const LIBRARY_API = '/libraryRestAPI-libraryRestAPI/library';
const USERS_API = '/userRestAPI-userRestAPI/user';


export const useFetchtLibs = id => {

	const [loading, setLoading] = useState(true);
	const setLibraries = useSetRecoilState(librariesState);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			return;
		}
		Request.get(`${LIBRARY_API}/projects/${id}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setLoading(false);
					setLibraries(data.libraries);
				}
			});
	}, [id, setLibraries]);

	return loading; 
};

export const getProject = id => {
	return Request.get(`${PROJECTS_API}/${id}`)
		.then(async ({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				let project = { ...data.project };
				
				
				await Request.get(`${USERS_API}/project/${id}`)
					.then(({ data }) => {
						if (data.status.toLowerCase() === 'success') {
							console.debug(data);
							project['collaborators'] = data.users;
						}
					});
				
				return project;

			}
		});
};
