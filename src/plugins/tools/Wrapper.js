import React, { Fragment } from 'react';
const Wrapper = (props) => {
	return (
		<Fragment>
			{/* <TopPanel userName={ userName } /> */}
			{
				props.children
			}
		</Fragment>
	);
	
};
export default Wrapper;
