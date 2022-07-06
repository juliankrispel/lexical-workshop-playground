# Getting started with lexical and react

At the time of writing this, slate does not actually export it's type declarations in way that it is automatically added to the path. This is highly inconvenient if you like me rely on typescript autocompletion in your IDE/code-editor. Here's a list of types that I add to projects currently in order to get typescript autocompletion for @lexical/react out of the box:

```tsx
// types.d.ts

import "@lexical/react/LexicalRichTextPlugin";
import "@lexical/react/LexicalAutoFocusPlugin";
import "@lexical/react/LexicalAutoLinkPlugin";
import "@lexical/react/LexicalAutoScrollPlugin";
import "@lexical/react/LexicalBlockWithAlignableContents";
import "@lexical/react/LexicalCheckListPlugin";
import "@lexical/react/LexicalCheckListPlugin";
import "@lexical/react/LexicalClearEditorPlugin";
import "@lexical/react/LexicalCollaborationPlugin";
import "@lexical/react/LexicalComposer";
import "@lexical/react/LexicalComposerContext";
import "@lexical/react/LexicalContentEditable";
import "@lexical/react/LexicalDecoratorBlockNode";
import "@lexical/react/LexicalHashtagPlugin";
import "@lexical/react/LexicalHistoryPlugin";
import "@lexical/react/LexicalHorizontalRuleNode";
import "@lexical/react/LexicalLinkPlugin";
import "@lexical/react/LexicalListPlugin";
import "@lexical/react/LexicalMarkdownShortcutPlugin";
import "@lexical/react/LexicalNestedComposer";
import "@lexical/react/LexicalOnChangePlugin";
import "@lexical/react/LexicalPlainTextPlugin";
import "@lexical/react/LexicalRichTextPlugin";
import "@lexical/react/LexicalTablePlugin";
import "@lexical/react/LexicalTreeView";
import "@lexical/react/useLexicalIsTextContentEmpty";
import "@lexical/react/useLexicalNodeSelection";
import "@lexical/react/useLexicalTextEntity";
```

To render an Editor component we first need to render `LexicalComposer` and fill up `initialConfig` with some basics

```tsx
export default function LexicalEditor() {
  const config = {
    namespace: "test",
    nodes: [],
    editorState: JSON.stringify(initialState),
    theme: {
      highlight: "boing",
    },
    onError: (err) => {
      console.error(err);
    },
  }
  return (
    <LexicalComposer initialConfig={config}>
      <>Nothing right now</>
    </LexicalComposer>
  );
}
```

We're not actually rendering anything at this point. We need to render an editable element to make our editor work. For that we will use our first plugin - which renders and manages the editable component.

Plugins in lexical are just react components (if you're using react that is) and so all we need to do is render `PlaintextPlugin` inside LexicalComposer

```tsx
<LexicalComposer initialConfig={config}>
  <PlainTextPlugin
    contentEditable={<ContentEditable />}
    placeholder={<div className="placeholder">Type something</div>}
  />
</LexicalComposer>
```

Now you will see a basic editable plain text field. It doesn't really do much.

Lexicals architecture is very extensible from the ground up and so even basic features like an undo/redo are wrapped in a plugin. To add it simply render it inside LexicalComposer:

```tsx
<LexicalComposer initialConfig={config}>
  <PlainTextPlugin
    contentEditable={<ContentEditable />}
    placeholder={<div className="placeholder">Type something</div>}
  />
  <HistoryPlugin />
</LexicalComposer>
```

To listen to changes to the lexical editor, you can use the `OnChangePlugin`.

```tsx
<LexicalComposer initialConfig={config}>
  <PlainTextPlugin
    contentEditable={<ContentEditable />}
    placeholder={<div className="placeholder">Type something</div>}
  />
  <HistoryPlugin />
  <OnChangePlugin
    onChange={(editorState) => {
      console.log(editorState.toJSON());
    }}
  />
</LexicalComposer>
```

In our case we're just using it to log the editor state. But we could use it to save a copy of the document to our server.

To initialize an editor with existing content, you need to configure the the `editorState` attribute of the `initialConfig` prop you pass to `LexicalComposer`.

Let's have a look at how editor state looks like in it's json form. Here's an exxample:

```tsx
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
  <LexicalComposer
    initialConfig={{
      editorState: JSON.stringify(initialState),
      namespace: "test",
      nodes: [],
      onError: (err) => {
        console.error(err);
      },
    }}
  >
  ...
```

This will work by default since by default lexical registers 4 node types which we're all using here: RootNode, TextNode, LineBreakNode and ParagraphNode.

Try changing the word "paragraph" in your json state to "custom" and you will see an error until a registered node exists with that type name.

Let's do that next. 