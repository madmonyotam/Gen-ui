import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState  } from 'recoil';
import { projectState  } from './tree/atoms';

import * as access from 'plugins/access';

import { Typography } from '@material-ui/core';
import Panel from 'plugins/tools/Panel';
import Libraries from './components/Panel/Libraries';
import Schemas from './components/Content/Schemas';
import { getProject } from './actions';

import moment from 'moment';
import LoaderTimeout from 'plugins/tools/LoaderTimeout';

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
	width: 100%;
  /* flex-direction: column; */
  /* flex: 1; */
	padding: 15px 25px 0;
	background: ${access.color('backgrounds.content')};
`;

const Project = () => {
	const [project, setProject] = useRecoilState(projectState);
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
		<div style={{ height: '100%', marginTop: 15 }}>
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
			<LoaderTimeout isLoading={loading} coverAll={true} pendingExtraTime={1000}>
				<div style={{ display: 'flex', flex: 1 }}>
					<Panel style={{ paddingTop: 0, position: 'relative' }}>
						{ project && <PanelContent /> }
					</Panel>
					<Content>
						{ project && <Schemas /> } 
					</Content>
				</div>
			</LoaderTimeout> 
		</Wrap>
	);
};

export default Project;
