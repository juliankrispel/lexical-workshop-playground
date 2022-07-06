# Getting started with lexical and react

To render an Editor component we first need to render `LexicalComposer` and pass in some default arguemnts


```tsx
export default function LexicalEditor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [],
        editorState: JSON.stringify(initialState),
        theme: {
          highlight: "boing",
        },
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <>Nothing right now</>
    </LexicalComposer>
  );
}
```