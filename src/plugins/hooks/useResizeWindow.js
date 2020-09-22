// Hook
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';


const useWindowSize =() => {

	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
    
		window.addEventListener('resize', debounce(handleResize, 250));
    
		handleResize();
    
		return () => window.removeEventListener('resize', handleResize);
		
	}, []);

	return windowSize;
};

export default useWindowSize;
