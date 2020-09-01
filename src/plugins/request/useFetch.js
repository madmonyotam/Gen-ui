import { useState, useEffect, useReducer } from 'react';
// TODO: finish this 
// import { getHeaders } from 


// TODO: >- add onChange -<

const DEFAULT_PORT = 5588;
const BASE_URL = `http://localhost:${DEFAULT_PORT}/mocking_G`;
const HEADERS = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

const IsJsonString = (data) => {
	try {
		const obj = JSON.parse(data);
		return (obj && typeof obj === 'object');
	} catch (err) {
		return false;
	}
};

const apiReducer = (state, action) => {
	switch (action.type) {
	case 'FETCH_START':
		return { ...state, fetching: true };

	case 'FETCH_FAILED':
		return { ...state, fetching: false, error: action.payload };

	case 'FETCH_SUCCESS':
		return { ...state, fetching: false, data: action.payload };

	default:
		return state;
	}
};


const useFetch = (api, method = 'get', data) => {

	let options = {
		headers: HEADERS,
		mode: 'cors',
		method: method.toUpperCase()
	};

	const initialState = {
		fetching: false,
		error: null,
		data: []
	};

	const [state, dispatch] = useReducer(apiReducer, initialState);
	const [url, setFetch] = useState({ api, options });
   

	if (method === 'post') {
		options['body'] = JSON.stringify(data); 
	}

	useEffect(() => {
		dispatch({ type: 'DATA_FETCH_START' });
		if (!url || !api) return;
		fetch(BASE_URL + api, options)
			.then(response => {
				if (!response.ok) {
					dispatch({ type: 'FETCH_FAILED', payload: response.statusText });
				}
				return response.text();
			})
			.then(data => {
				let payload = data;

				if (IsJsonString(data)) payload = JSON.parse(data);

				dispatch({ type: 'FETCH_SUCCESS', payload });
			})
			.catch(error => {
				dispatch({ type: 'FETCH_FAILED', payload: error.message });
			});

	}, [url]);

	return state;
};


export default useFetch;
