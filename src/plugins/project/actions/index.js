import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { librariesState, schemasState } from '../tree/atoms';
import Request from 'plugins/request';

const PROJECTS_API = '/projectRestAPI-projectRestAPI/project';
const LIBRARY_API = '/libraryRestAPI-libraryRestAPI/library';
const SCHEMA_API = '/schemaRestAPI-schemaRestAPI/schema';


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
		setLoading(true);
		setSchemas([]);
		if (!libId) {
			setLoading(false);
			return;
		}
		Request.get(`${SCHEMA_API}/libraries/${libId}`)
			.then(({ data }) => {
				if (data.status.toLowerCase() === 'success') {
					setLoading(false);
					setSchemas(data.schemas);
				}
			});
	}, [libId, setSchemas]);
	return loading; 
};


export const fetchSchema = id => {
	if (!id) return null;
	return Request.get(`${SCHEMA_API}/${id}`)
		.then(({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				return data.schema;
			}
		});
};


export const removeLibrary = (id, userId) => {
	if (!id || !userId) return;
	return Request.delete(`${LIBRARY_API}/${id}/${userId}`)
		.then(({ data }) => {
			return data.status.toLowerCase() === 'success';
		})
		.catch(err => {
			console.error('Delete Library error >>', err);
			return false;
		});
};


export const removeSchema = (id, userId) => {
	if (!id || !userId) return;
	return Request.delete(`${SCHEMA_API}/${id}/${userId}`)
		.then(({ data }) => {
			return data.status.toLowerCase() === 'success';
		})
		.catch(err => {
			console.error('Delete Schema error >>', err);
			return false;
		});
};



export const getProject = id => {
	return Request.get(`${PROJECTS_API}/${id}`)
		.then(async ({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				let project = { ...data.project };
				return project;

			}
		});
};


export default {
	libsActions: {
		useFetchtLibs,
		removeLibrary
	},
	schemasActions: {
		useFetchSchemas,
		fetchSchema,
		removeSchema
	}

};
