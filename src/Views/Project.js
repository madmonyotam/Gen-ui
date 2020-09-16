import React, { useState, useCallback, useEffect } from 'react';
import { useBranch } from 'baobab-react/hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

import * as libsActions from 'tree/actions/libs';
import * as access from 'plugins/access';

import MenuPanel from 'Views/MenuPanel';
import SchemaPanel from 'Views/SchemaPanel';
import Mask from 'plugins/tools/Mask';

import Menu from 'plugins/menuModal/Menu';

import Request from 'plugins/request';

const InitMask = styled(Mask)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function OldProjectView() {
	const { viewKey } = useBranch({ viewKey: ['viewKey'] });
	const [loading, setLoading] = useState(true);
	const { libs, dispatch } = useBranch({ libs: ['libs'] });
	const stableDispatch = useCallback(dispatch, []);

	useEffect(() => {
		Request.get('/getAllLibraries')
			.then(res => {
				stableDispatch(libsActions.setLibs, res.data);
			});
	}, [stableDispatch]);

	useEffect(() => {
		const t = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(t);
		};
	}, []);

	if (loading) {
		return (
			<InitMask opacity={1} mask={access.color('backgrounds.secondary')}>
				<img alt="logo" src={process.env.PUBLIC_URL + '/gen_logo.png'} />
				<div style={{ width: 400 }}>
					<LinearProgress value={50} color={'primary'} />
				</div>
			</InitMask>
		);
	}

	return (
		<Mask
			opacity={1}
			top={`${access.dim('topBar.height')}px`}
			mask={access.color('backgrounds.secondary')}
			style={{ display: 'flex' }}
		>
			<MenuPanel viewKey={viewKey} />
			<SchemaPanel />
			<Menu />
		</Mask>
	);
}

export default OldProjectView;
