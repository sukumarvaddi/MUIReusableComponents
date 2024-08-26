import React, { useState } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import { stateToHTML } from "draft-js-export-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";

export interface RichTextEditorProps {
  onChange?: (htmlString: string) => void;
  htmlText: string;
}
export function RichTextEditor(args: RichTextEditorProps) {
  const blocksFromHTML = convertFromHTML(args.htmlText || "");
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state),
  );
  return (
    <Editor
      editorClassName="editor-class"
      editorState={editorState}
      onEditorStateChange={(editorState) => {
        setEditorState(editorState);
        if (args.onChange) {
          args.onChange(
            DOMPurify.sanitize(stateToHTML(editorState.getCurrentContent())),
          );
        }
      }}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
    />
  );
}
