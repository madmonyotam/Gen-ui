import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { librariesState, schemasState } from '../tree/atoms';
import Request from 'plugins/request';


const PROJECTS_API = '/projectRestAPI-projectRestAPI/project';
const LIBRARY_API = '/libraryRestAPI-libraryRestAPI/library';
const USERS_API = '/userRestAPI-userRestAPI/user';
const SCHEMAS_API = 'schemaRestAPI-schemaRestAPI/schema/libraries';


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

export const useFetchSchemas = libId => {
	const [loading, setLoading] = useState(true);
	const setSchemas = useSetRecoilState(schemasState);

	useEffect(() => {
		if (!libId) {
			setLoading(false);
			return;
		}
		Request.get(`${SCHEMAS_API}/${libId}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setLoading(false);
					setSchemas(data.schemas);
				}
			});
	}, [libId, setSchemas]);

	return loading; 
}

export const getProject = id => {
	return Request.get(`${PROJECTS_API}/${id}`)
		.then(async ({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				let project = { ...data.project };

				return project;

			}
		});
};
