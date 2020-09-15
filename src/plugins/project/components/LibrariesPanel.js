import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'; 

import styled from 'styled-components';

import * as access from 'plugins/access';
import Panel from 'plugins/tools/Panel'; 
import Badge from 'plugins/tools/Badge';

const TreeWrapper = styled.div`
	height: 100%;
    padding-right: 15px;
    overflow: auto;
	width: 100%;
`;

const TitleWrapper = styled.div`
	padding: 5px 0; 
    height: 30px;
	min-height: 30px;
    max-height: 30px;
    display: flex;
    align-items: center;
`;


const Tree = ({ children, name, style, defaultOpen = false }) => {
	// const [isOpen, setOpen] = useState(defaultOpen)
	// const previous = usePrevious(isOpen)
	// const [bind, { height: viewHeight }] = useMeasure()
	// const { height, opacity, transform } = useSpring({
	//     from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
	//     to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
	// })
	// const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
	return (
		<div>
			{ name }
		</div>
	// <Frame>
	//     <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
	//     <Title style={style}>{name}</Title>
	//     <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
	//         <a.div style={{ transform }} {...bind} children={children} />
	//     </Content>
	// </Frame>
	);
};


const LibrariesPanel = props => {
     
	return (
		<Panel>
			<TitleWrapper>
				<Typography style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
					{ props.projectName }
					<Badge>{ props.libraries.length }</Badge>
				</Typography>
			</TitleWrapper>

			<Divider style={{ marginBottom: 15 }} />

			<TreeWrapper> 
				<Tree name={ 'Libraries' }/>
			</TreeWrapper>
		</Panel>
	);
};

LibrariesPanel.propTypes = { 
};

LibrariesPanel.defaultProps = { 
};

export default LibrariesPanel;