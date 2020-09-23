import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-xcode';
import { useRecoilValue } from 'recoil';

import { selectedSchema } from 'plugins/project/tree/selectors';
import { selectedSchemaId } from 'plugins/project/tree/atoms';

const Editor = () => {
	const editorRef = useRef();
	const selectedId = useRecoilValue(selectedSchemaId);
	const selected = useRecoilValue(selectedSchema);

	const [code, setCode] = useState('');

	useEffect(() => {
		// reset undo maneger
		if (editorRef.current) {
			const { editor } = editorRef.current;
			const session = editor.getSession();
			const undoManager = session.getUndoManager();
			undoManager.reset();
			session.setUndoManager(undoManager);
		}
		if (selectedId && selected && selected.schemaJson) {
			const c = JSON.stringify(selected.schemaJson, null, 2);
			setCode(c);
		}

	}, [selectedId]);

	const onLoad = () => { };

	const onChange = value => {
		console.log('onChange', value)
		setCode(value);
	};

	const options = {
		showLineNumbers: true,
		tabSize: 2
	};

	const style = {
		height: 'calc(100% - 41px)',
		width: '100%',
		borderTopRightRadius: '4px',
		borderTop: '1px solid #dedede',
		borderRight: '1px solid #dedede',
	};

	return (
		<AceEditor
			ref={editorRef}
			style={style}
			debounceChangePeriod={1000}
			mode="json"
			theme="xcode"
			name="editor"
			onLoad={onLoad}
			onChange={onChange}
			fontSize={14}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			value={code}
			setOptions={options}
		/>
	);
};

export default Editor;