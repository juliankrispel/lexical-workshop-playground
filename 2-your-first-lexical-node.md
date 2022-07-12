Your first lexical node, let's start with an element node shall we?

There are 3 different types of nodes you can extend to create your own elements, they are:

- `ElementNode`
- `TextNode`
- `DecoratorNode`

Let's create a node by extending ElementNode first:

```tsx
// CustomElementNode.ts
import { ElementNode } from "lexical";

export class CustomElementNode extends ElementNode { }
```

I think the best way to learn is by trial and error so let's see what happens if we use this node in our lexical editor. All we need to do is add our CustomElementNode to the nodes property in our config like this:

```tsx
<LexicalComposer
  initialConfig={{
    nodes: [CustomElementNode],
    namespace: "test",
    editorState: JSON.stringify(initialState),
    onError: (err) => {
      console.error(err);
    },
  }}
>
  ...
```

When you reload the page and open your browsers console you will now see an exception like this: `LexicalNode: Node CustomElementNode does not implement .getType().` 

This exception tells us that our node needs to implement getType in order to be a valid node. Alright let's define one:

```tsx
// CustomElementNode.ts
import { ElementNode } from "lexical";

export class CustomElementNode extends ElementNode {
  static getType(): string {
    return "custom";
  }
}
```

Please note that the getType method needs be a static class method in order to work.

Refresh the browser and you will no longer see an error in the console. However, we're not actually using the node yet. To change that, let's rename the `paragraph` node in our default content to `custom` and see what happens:


```tsx
const initialState = {
  root: {
    children: [
      {
        type: "custom",
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
```

Now lexical will actually try to import the custom node and for that it requires you implement an `importJSON` class method.

```tsx
export class CustomElementNode extends ElementNode {
  static getType(): string {
    return "custom";
  }

  static importJSON(_serializedNode: SerializedLexicalNode): CustomElementNode {
    return new CustomElementNode();
  }
}
```

That's not all however, we also need to implement a few other methods, such as `exportJSON`, `createDOM` and `updateDOM` and `clone`. Let's look at these methods one by one:

```tsx
static clone(node) {
  return new CustomElementNode(node.__key);
}
```

the clone method is used for producing a copy of the class instance. Pressing enter for example does this. It'll create a copy of the node that our cursor is in currently.

```tsx
createDOM(config: EditorConfig): HTMLElement {
  const el = document.createElement("div");
  const classNames = getCachedClassNameArray(config.theme, 'custom');
  el.classList.add(...(classNames || []));
  return el;
}
```

The createDOM method will create the dom element for your node. classNames are injected from the lexical config.

```tsx
updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
  return false;
}
```

`updateDOM` returns a boolean which determines whether or not the node's DOM element should be updated. This is used directly by the lexical reconciler.

```tsx
exportJSON(): SerializedElementNode {
  return {
    ...super.exportJSON(),
    type: this.getType(),
  };
}
```

`exportJSON` produces the json that you will need to persist the document. This also provides an opportunity to leave out data that you don't want to persist.

