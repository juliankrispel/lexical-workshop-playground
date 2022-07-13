import "./App.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { createEmptyHistoryState, HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CustomElementNode } from "./nodes/CustomElementNode";
import { CollapserNode } from "./nodes/CollapserNode";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CollapserPlugin } from "./plugins/CollapserPlugin";
import { CollapsedNode } from "./nodes/CollapsedElement";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ResetPlugin } from "./plugins/ToolbarPlugin";
import { DragAndDropPlugin } from "./plugins/DragAndDropPlugin";
import { DragHandleNode } from "./nodes/DragHandleNode";

const initialState = {
  root: {
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "Hello ",
            type: "text",
          },
          {
            text: "World",
            type: "text",
          },
        ],
      },
    ],
    type: "root",
  },
};

export default function App() {
  const history = createEmptyHistoryState();
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [
          CustomElementNode,
          CollapserNode,
          CollapsedNode,
          DragHandleNode,
        ],
        editorState: JSON.stringify(initialState),
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <HistoryPlugin externalHistoryState={history} />
      <OnChangePlugin
        onChange={(editorState) => {
          console.log(editorState.toJSON().root.children);
        }}
      />
      <DragAndDropPlugin />
      <CollapserPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div className="placeholder">Type something</div>}
      />
      <ClearEditorPlugin />
      <ResetPlugin />
    </LexicalComposer>
  );
}