import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import { inlineStyleButtons, blockTypeButtons, actionButtons } from './constants';
import { renderInlineStyleButton, renderBlockTypeButton, renderActionButton } from './renderButtons';

import 'draft-js/dist/Draft.css';
import './TextEditor.css';


export default () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    return (
        <div className="textEditorContainer" onClick={focusEditor}>
            <div className="textEditorTab">
                {inlineStyleButtons.map((button, index) => {
                    return (
                        <span key={index}>
                            {renderInlineStyleButton(button.value, button.style, button.icon, button.title, editorState, setEditorState)}
                        </span>
                    );
                })}
                {blockTypeButtons.map((button, index) => {
                    return (
                        <span key={index}>
                            {renderBlockTypeButton(button.value, button.type, button.icon, button.title, editorState, setEditorState)}
                        </span>
                    );
                })}
                {actionButtons.map((button, index) => {
                    return (
                        <span key={index}>
                            {renderActionButton(button.value, button.icon, button.title, editorState, setEditorState)}
                        </span>
                    );
                })}
            </div>
            <div className="textEditor">
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Rich Text Editör"
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </div>
    );
};