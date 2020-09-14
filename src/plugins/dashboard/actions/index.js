import Request from 'plugins/request';

export const getProjects = email => {
	return Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${email}`)
		.then(({ data }) => {
			if (data.status.toLowerCase() === 'success') {
				return data.projects;
			}
		});
};