import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

import { Tooltip, IconButton, Icon } from '@material-ui/core';
import * as access from 'plugins/access';

import { useRecoilValue } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';
import { fieldDrawerState } from 'plugins/project/tree/atoms';

const Editor = () => {
	const editorRef = useRef();
	const schema = useRecoilValue(selectedSchema);
	const fieldDrawerId = useRecoilValue(fieldDrawerState);

	const [code, setCode] = useState('');

	useEffect(() => {
		// reset undo maneger
		if (editorRef.current) {
			const { editor } = editorRef.current;
			window.editor = editor;
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

	useEffect(() => {
		if (editorRef && editorRef.current) {
			const { editor } = editorRef.current;
			setTimeout(() => {
				editor.resize();
			}, 250);
		}
	}, [fieldDrawerId, !fieldDrawerId]);

	const onLoad = () => { 
		if (editorRef.current) {
			const { editor } = editorRef.current;
			editor.resize();
		}
	}; 
	// eslint-disable-next-line no-unused-vars
	const onBeforeLoad = ace => { 
	};

	const onChange = value => {
		if (!value || !editorRef) return;
		setCode(value);
	};

	const options = {
		showLineNumbers: true,
		tabSize: 2,
	};
 

	const style = {
		height: 'calc(100% - 41px)',
		width: '100%',
		borderTopRightRadius: '4px',
		border: 'solid #dedede',
		borderTop: 1,
		borderBottom: 0,
		borderRight: 1,
		borderLeft: 0,
		transition: 'height 0.35s linear'

	};

	return (
		<div style={{ flex: 1 }} >
			<div style={{ height: 40, paddingLeft: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					<Tooltip title={access.translate('Undo')}  >
						<IconButton size={'small'} style={{ marginRight: 10 }}>
							<Icon fontSize={'small'}>undo</Icon>
						</IconButton>
					</Tooltip>
					<Tooltip title={access.translate('Redo')}  >
						<IconButton size={'small'}>
							<Icon fontSize={'small'}>redo</Icon>
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip title={access.translate('Save')}  >
						<IconButton size={'small'} style={{ marginRight: 10 }}>
							<Icon fontSize={'small'}>save</Icon>
						</IconButton>
					</Tooltip>
					<Tooltip title={access.translate('Copy')}  >
						<IconButton size={'small'}>
							<Icon fontSize={'small'}>content_copy</Icon>
						</IconButton>
					</Tooltip>
				</div>
			</div>
			
			<AceEditor
				ref={editorRef}
				style={style}
				onBeforeLoad={onBeforeLoad}
				debounceChangePeriod={150}
				mode="json"
				theme="github"
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

		</div>
 
	);
};

export default Editor;
