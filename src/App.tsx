import "./App.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TreeViewPlugin from "./plugins/TreeViewPlugin/TreeViewPlugin";
import { ParagraphNode } from "./nodes/nodes";
import { DraggablePlugin } from "./plugins/DraggablePlugin/DraggablePlugin";

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

export default function App() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [ParagraphNode],
        editorState: JSON.stringify(initialState),
        theme: {
          highlight: "boing",
        },
        onError: (err) => {
          console.error(err);
        },
      }}
    >
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
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}
