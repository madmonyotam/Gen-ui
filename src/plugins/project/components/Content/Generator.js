import React from 'react';
import styled from 'styled-components';
import * as gen from 'gen-engine'; 
 
import EditorGenerator from 'plugins/project/components/Content/EditorGenerator';
import WidgetHeader from 'plugins/tools/WidgetHeader';
import Mask from 'plugins/tools/Mask';

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
		<div style={{ width: '65%' , marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
			<WidgetHeader title={access.translate('Generator')} icon={'gavel'}   />
			<Box >
				{/* <Mask mask={'transparent'} zIndex={5}/> */}
				<EditorGenerator/>
			</Box> 
		</div>
	);
};

export default Generator;
