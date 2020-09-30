import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import * as access from 'plugins/access';

import useResizeWindow from 'plugins/hooks/useResizeWindow';

import styled from 'styled-components';
import { IconButton, Paper, Tooltip, ClickAwayListener, Fade } from '@material-ui/core';
import TimeScaleIcon from '@material-ui/icons/History';
import Popper from '@material-ui/core/Popper'; 

import { getContributeLine } from 'plugins/canvases/utils/lineUtils';
import LineCanvas from 'plugins/canvases/LineCanvas';

import WidgetHeader from 'plugins/tools/WidgetHeader';
import { contributeByDate } from 'plugins/dashboard/tree/selectors'; 


const Container = styled.div`
	position: relative;
	width: auto;
	flex: 1.25;
	border-radius: 2px;
	display: flex;
	flex-direction: column;
`;

const WidgetCont = styled.div`
	width: 100%;
  flex: 1;
	overflow: hidden;
	margin-top: 10px;
	background: ${access.color('backgrounds.widget')};
	border:  1px solid ${ access.color('borders.primary') };
	border-radius: 4px;
`;

const List = styled.div`
`;

const Item = styled.div`
  padding: 4px 10px;
	cursor: pointer;
	background: ${ (p) => p.isSelcted ? access.color('backgrounds.selected') : 'transparent'};
	:hover {
		box-shadow: 0px 0px 13px -7px rgb(186,196,206);
		background: ${ (p) => p.isSelcted ? access.color('backgrounds.selected') : access.color('backgrounds.hover')};
	}
`;

const ContributesGraph = () => {
	const [open, setOpen] = useState(false);
	const [timeFrame, setTimeFrame] = useState(1);
	const anchorRef = useRef(null);

	const contribute = useRecoilValue(contributeByDate);
	const size = useResizeWindow();
	const sizeKey = `${size.width}-${size.hight}`; 

	const handleClose = () => {
		setOpen(false);
	};

	const renderItemInList  = (value) => {
		const label = value > 1 ? access.translate('Months') : access.translate('Month');
		const handleItemClick = (v) => () => {
			getContributeLine().updateTimeAxis(v);
			setTimeFrame(v);
			handleClose();
		};

		return(
			<Item isSelcted={timeFrame === value} onClick={handleItemClick(value)}>
				{ `${value} ${label}` }
			</Item>
		);
	};

	const renderList = () => {
		const values = [1,3,6,12];

		return(
			<List>
				{ values.map(renderItemInList) }
			</List>
		);
	};

	const renderTimeSelect = () => {
		const label = timeFrame > 1 ? access.translate('Months') : access.translate('Month');
		const title = open ? '' : `${timeFrame} ${label}`;
		return (
			<>	
				<Tooltip title={title} placement={'top'} >
					<IconButton
						ref={anchorRef}
						size={'small'}
						onClick={() => setOpen(!open)}>
						<TimeScaleIcon fontSize={'small'} color={ 'primary' }/>
					</IconButton>
				</Tooltip>						
			
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={ 'bottom-end' }>
					{({ TransitionProps }) => (
						<Fade { ...TransitionProps }>
							<Paper style={{ marginTop: 10 }} >
								<ClickAwayListener onClickAway={handleClose}>
									{ renderList() }
								</ClickAwayListener>
							</Paper>
						</Fade>
					)}
				</Popper>
			</>
		);
	};

	return (
		<Container>
			<WidgetHeader title={access.translate('Updated By Time')} icon={'insert_chart_outlined'} actionBtns={ renderTimeSelect }/>
			<WidgetCont>
				<LineCanvas key={sizeKey} data={contribute}/>
			</WidgetCont>
		</Container>
	);
};

export default ContributesGraph;
