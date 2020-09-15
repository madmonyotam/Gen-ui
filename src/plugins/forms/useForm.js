import { useState } from 'react';

export const useForm = initialValues => {

	const [values, setValues] = useState(initialValues);
	const update = e => setValues({
		...values,
		[e.target.name]: e.target.value
	});

	return [
		values,
		update
	];
};
