import React, { useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import * as gen from 'gen-engine';
import * as access from 'plugins/access';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-xcode';

import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSchema } from 'plugins/project/tree/selectors';
import { generatedDataState, generateAmountState } from 'plugins/project/components/Content/tree/atoms';

const EditorGen = () => {
	const editorRef = useRef();
	const [generatedData, setGeneratedData] = useRecoilState(generatedDataState);
	const generateAmount = useRecoilValue(generateAmountState);
	const schema = useRecoilValue(selectedSchema);

	
	useEffect(() => {
		
		if (schema && schema.schemaJson) {	
			try {
				const mock = gen.generate(schema.schemaJson,generateAmount);
				const mockString = JSON.stringify(mock, null, 2); 
				setGeneratedData(mockString);
			}
			catch(err){
				setGeneratedData(access.translate('schema is corrupted'));
			}
		}
	}, [schema]); 

	const onLoad = () => { 
		if (editorRef.current) {
			const { editor } = editorRef.current;
			editor.resize();
		}
	};

	const options = {
		showLineNumbers: true,
		tabSize: 2,
	};
 
	const style = {
		height: '100%',
		width: '100%',
		borderRadius: '4px',
	};

	return (
		<AceEditor
			ref={editorRef}
			style={style}
			debounceChangePeriod={150}
			mode="json"
			theme="xcode"
			name="schema-editor"
			onLoad={onLoad}
			fontSize={14}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			value={generatedData}
			setOptions={options}
		/>
	);
};

export default EditorGen;
