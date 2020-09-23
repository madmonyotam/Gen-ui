import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

const Editor = ({ value }) => {
	const editorRef = useRef();
	const [code, setCode] = useState(value || '');

	useEffect(() => {
		// reset undo maneger
		if (editorRef.current) {
			const { editor } = editorRef.current;
			const session = editor.getSession();
			const undoManager = session.getUndoManager();
			undoManager.reset();
			session.setUndoManager(undoManager);
		}
		if (value) setCode(value);
	}, [value]);

	const onLoad = () => { };

	const onChange = c => {
		setCode(c);
	};

	const options = {
		showLineNumbers: true,
		tabSize: 2
	};

	const style = {
		height: '100%',
		width: '100%'
	};

	return (
		<AceEditor
			ref={editorRef}
			style={style}
			debounceChangePeriod={1000}
			mode="json"
			theme="github"
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