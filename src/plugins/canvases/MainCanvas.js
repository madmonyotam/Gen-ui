import React from 'react';

import Start from 'plugins/tools/Start';
import * as access from 'plugins/access';
import { get } from 'plugins/requests';
import useResizeWindow from 'plugins/hooks/useResizeWindow';

import { move } from 'plugins/canvases/utils/canvasActions';

import LibraryPack from 'plugins/canvases/pack/LibraryPack';
import { setLibraryPack } from 'plugins/canvases/utils/packUtils';

import {
	paintFrame,
	fillFrame,
} from 'plugins/canvases/paint/Frames';

function MainCanvas() {
	const size = useResizeWindow();
	const key = `${size.width}-${size.height}`;

	const getAllLibs = (canvas, width, height) => {
		get('/getAll').then(res => {
			const {data, projectName } = res.data;

			const libraryPack = new LibraryPack({ canvas, width, height });
			libraryPack.initWithData(data,projectName);

			setLibraryPack(libraryPack);
		});
	};

	const onCanvasReady = (canvas, width, height) => {

		const frame = paintFrame(canvas, width, height);
		fillFrame(access.color('types.bg'));
		move(canvas, frame, access.color('canvases.fg'));

		getAllLibs(canvas, width, height);
	};

	const renderStart = () => {
		const margin = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};

		return <Start canvasReady={onCanvasReady} margin={margin} />;
	};

	return (
		<div key={ key } style={{ height: '100%', width: '100%', userSelect: 'none' }}>
			{renderStart()}
		</div>
	);
}

export default MainCanvas;
