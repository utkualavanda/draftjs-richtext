import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RichUtils, EditorState } from 'draft-js';

import './TextEditor.css';

export const renderInlineStyleButton = (value, style, icon, title, editorState, setEditorState) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    let className = '';
    if (currentInlineStyle.has(style)) {
        className = 'active';
    }
    let styling = {};
    if(className){
        styling = { backgroundColor: 'lightgray' }
    }
    return (
        <Tooltip title={title} style={styling}>
            <IconButton
                value={value}
                className={className}
                onMouseDown={() => {
                    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
                }}
            >
                <i className={icon} />
            </IconButton>
        </Tooltip>
    );
};

export const renderBlockTypeButton = (value, type, icon, title, editorState, setEditorState) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    let className = '';
    if (currentInlineStyle.has(type)) {
        className = 'active';
    }

    return (
        <Tooltip title={title}>
            <IconButton
                value={value}
                className={className}
                onMouseDown={() => {
                    setEditorState(RichUtils.toggleBlockType(editorState, type));
                }}
            >
                <i className={icon} />
            </IconButton>
        </Tooltip>
    );
};

export const renderActionButton = (value, icon, title, editorState, setEditorState) => {
    return (
        <Tooltip title={title}>
            <IconButton
                onMouseDown={() => {
                    value === 'Undo' ? setEditorState(EditorState.undo(editorState)) : setEditorState(EditorState.redo(editorState));
                }}
            >
                <i className={icon} />
            </IconButton>
        </Tooltip>
    );
};