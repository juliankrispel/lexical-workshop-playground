import "./App.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { createEmptyHistoryState, HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

const initialState = {
  root: {
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "Hello",
            type: "text",
          },
          {
            type: "linebreak",
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
        nodes: [],
        editorState: JSON.stringify(initialState),
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div className="placeholder">Type something</div>}
      />
      <HistoryPlugin externalHistoryState={history} />
      <OnChangePlugin
        onChange={(editorState) => {
          console.log(editorState.toJSON().root.children);
        }}
      />
    </LexicalComposer>
  );
}