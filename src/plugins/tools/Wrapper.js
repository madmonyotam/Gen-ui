import React, { Fragment } from 'react';
import TopPanel from 'plugins/tools/TopPanel';
const Wrapper = (props) => {
	const userName = localStorage.getItem('gen-user-name');
	return (
		<Fragment>
			<TopPanel userName={ userName }/>
			{
				props.children
			}
		</Fragment>
	)
	
};
export default Wrapper