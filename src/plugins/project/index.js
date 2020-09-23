import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { projectState, selectedLibId } from './tree/atoms';
import * as access from 'plugins/access';
import { Typography, CircularProgress } from '@material-ui/core';

// import Badge from 'plugins/tools/Badge';
import Panel from 'plugins/tools/Panel';
import WidgetHeader from 'plugins/tools/WidgetHeader';
import Libraries from './components/Panel/Libraries';
import Schemas from './components/Content/Schemas';
import { getProject } from './actions';

import moment from 'moment';

const Wrap = styled.div`
  position: absolute;
  display: flex;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  background: ${access.color('backgrounds.content')};
`;

const Box = styled.div`
  position: relative;
  color: #333;
  text-shadow: 0.5px 0.5px 1px #fefefe;
  padding: 5px 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px 15px 0;
  background: ${access.color('backgrounds.content')};
`;

const Loader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(250, 250, 250, 0.5);
  z-index: 2;
`;

const Project = () => {
	const [project, setProject] = useRecoilState(projectState);
	// const libId = useRecoilValue(selectedLibId)
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		getProject(id).then((project) => {
			setProject(project);
			setTimeout(() => {
				setLoading(false);
			}, 250);
		});
	}, [id]);

	const ProjectTitle = () => (
		<>
			<Box>
				<Typography style={{ flex: 1, fontSize: 13, display: 'flex' }}>
					{project.name}
				</Typography>
			</Box>
		</>
	);

	const ProjectStats = () => (
		<div style={{ marginTop: 15 }}>
			<Libraries projectId={id} />
		</div>
	);

	const ProjectDates = () => (
		<div>
			<Box>
				<Typography
					style={{
						flex: 1,
						fontSize: 13,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
          Created at{' '}
					<span>{moment(project.createdTime).format('DD-MM-YY @ hh:mm')}</span>
				</Typography>
			</Box>
			<Box>
				<Typography
					style={{
						flex: 1,
						fontSize: 13,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					Last updated at{' '} <span>{moment(project.updatedTime).format('DD-MM-YY @ hh:mm')}</span>
				</Typography>
			</Box>
		</div>
	);

	const PanelContent = () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				flex: 1,
			}}
		>
			<ProjectStats />
			<div
				style={{
					borderTop: 'solid 1px rgba(221,221,221,.75)',
					background: '#f1f1f1',
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					padding: '10px 15px 0',
					height: 120
				}}
			>
				<ProjectTitle />
				<ProjectDates />
			</div>
		</div>
	);

	return (
		<Wrap>
			<div style={{ display: 'flex', flex: 1 }}>
				<Panel style={{ paddingTop: 0, position: 'relative' }}>
					{loading && (
						<Loader>
							<CircularProgress />{' '}
						</Loader>
					)}
					{!loading && project && <PanelContent />}
				</Panel>
				<Content>
					<Schemas />
					{/* <div style={{ flex: 1 }}>
						<div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 40px)', overflow: 'hidden', width: '100%' }} >
						</div>
					</div>
					<div style={{ flex: 2 }}>
						<WidgetHeader title={'Schema 1'} icon={'edit'} />
						<div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 40px)', overflow: 'hidden', width: '100%' }} >
							<div style={{ flex: 1, marginRight: 25 }}>
								<WidgetHeader title={'Fields'} icon={'edit'} />
							</div>
							<div style={{ flex: 2 }}>
								<WidgetHeader title={'Editor'} icon={'edit'} />
							</div>
		
						</div>
					</div> */}
				</Content>
			</div>
		</Wrap>
	);
};

export default Project;
