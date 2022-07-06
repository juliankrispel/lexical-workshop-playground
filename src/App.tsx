import "./App.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TreeViewPlugin from "./plugins/TreeViewPlugin/TreeViewPlugin";
import { ParagraphNode } from "./nodes/nodes";
import { DraggablePlugin } from "./plugins/DraggablePlugin/DraggablePlugin";
import { LexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";
import { createEditor } from "lexical";

const initialState = {
  root: {
    children: [
      {
        type: "paragraph",
        version: 0,
      },
    ],
    direction: "ltr",
    format: "left",
    indent: 0,
    type: "root",
    version: 1,
  },
};

const WithLexicalComposer = (props: React.PropsWithChildren<{}>) => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [ParagraphNode],
        editorState: JSON.stringify(initialState),
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <>{props.children}</>
    </LexicalComposer>
  );
};

export default function App() {
  return (
    <WithLexicalComposer>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={
            <span className="placeholder">Please type something</span>
          }
        />
        <DraggablePlugin />
      </div>
      <TreeViewPlugin />
    </WithLexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
