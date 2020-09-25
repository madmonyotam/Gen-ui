import React, { useState, useRef, useEffect } from 'react';


import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-xcode';

import { useRecoilValue } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';

const Editor = () => {
	const editorRef = useRef();
	const schema = useRecoilValue(selectedSchema);

	const [code, setCode] = useState('');

	useEffect(() => {
		// reset undo maneger
		if (editorRef.current) {
			const { editor } = editorRef.current;
			const session = editor.getSession();
			const undoManager = session.getUndoManager();
			undoManager.reset();
			session.setUndoManager(undoManager);
			if (schema && schema.schemaJson) {
				try {
					const c = JSON.stringify(schema.schemaJson, null, 2);
					setCode(c);
				}
				catch(err){
					setCode('');
				}
			} else setCode('');
		}

	}, [schema]);

	const onLoad = () => { };
	const onBeforeLoad = ace => { };

	const onChange = value => {
		if (!value || !editorRef) return;
		setCode(value);
	};

	const options = {
		showLineNumbers: true,
		tabSize: 2
	};

	const style = {
		height: 'calc(100% - 171px)',
		width: '100%',
		borderTopRightRadius: '4px',
		borderBottomRightRadius: '4px',
		border: 'solid #dedede',
		borderTop: 1,
		borderBottom: 1,
		borderRight: 1,
		borderLeft: 0
	};

	return (
		<AceEditor
			ref={editorRef}
			style={style}
			onBeforeLoad={onBeforeLoad }
			debounceChangePeriod={150}
			mode="json"
			theme="xcode"
			name="schema-editor"
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
