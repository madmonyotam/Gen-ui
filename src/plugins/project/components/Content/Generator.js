import React from 'react';
import styled from 'styled-components';
import * as gen from 'gen-engine'; 
 
import { Divider } from '@material-ui/core'; 
import WidgetHeader from 'plugins/tools/WidgetHeader';

import * as access from 'plugins/access'; 

window.gen = gen; 
 
const Box = styled.div`
	position: relative;
	background: #fefefe;
	border:  1px solid ${ access.color('borders.primary') };
	border-radius: 4px;
	margin-top: 10px;
	flex: 1;
`; 
const Generator = () => {
	return (
		<div style={{ width: '50%' , marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
			<WidgetHeader title={access.translate('Generator')} icon={'gavel'}   />
			<Box >
				{/* <div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
						Generator
					</Typography> 
				</div>  */}
			</Box> 
		</div>
	);
};

export default Generator;
