// Hook
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useDisplayAction = (action) => {

	const location = useLocation();
	const [display, setDisplay] = useState(true);

	useEffect(() => {
		if (Array.isArray(action)) {
			if (location.pathname.includes('/project') || location.pathname.includes('/old-project')) {
				setDisplay(true);
			} else setDisplay(false);
		}
		else if (action === 'enter') {
			if (location.pathname.includes('/project') || location.pathname.includes('/old-project')) {
				setDisplay(false);
			} else setDisplay(true);
		}

		
	}, [action, location]);

	return display;
};

