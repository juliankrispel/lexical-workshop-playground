import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $isElementNode, $parseSerializedNode, DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey } from "lexical";
import { CollapsedNode } from "./CollapsedElement";

const Toggle = ({
  onUpdate
}: {
  onUpdate: () => void
}) => {
  const [editor] = useLexicalComposerContext()

  return (
    <span className="toggle" onClick={() => editor.update(() => {
    onUpdate()
    })}>
      →
    </span>
  );
};

export class CollapserNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "collapser";
  }

  constructor(content: null | string = null, key?: NodeKey) {
    super(key);
    this.__content = content;
  }

  static clone(node: CollapserNode) {
    return new CollapserNode(node.__content, node.__key);
  }

  importJSON() {
    return new CollapserNode(this.__content, this.__key);
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  exportJSON() {
    return {
      type: this.getType(),
      content: this.__content,
      version: 1,
    };
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("span");
    return el;
  }

  collapseSibling = () => {
    const sibling = this.getNextSibling();

    if ($isElementNode(sibling)) {
      const children = sibling.getChildren().map((node) => node.exportJSON());
      const serializedNode = sibling.exportJSON()
      serializedNode.children = children
      const collapsedNode = new CollapsedNode(JSON.stringify(serializedNode))
      this.insertBefore(collapsedNode);
      sibling?.remove();
      this.selectPrevious();
      this.remove();
    }
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Toggle onUpdate={this.collapseSibling} />;
  }
}
