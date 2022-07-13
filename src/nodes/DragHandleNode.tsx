import { $isElementNode, DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { CollapsedNode } from "./CollapsedElement";

const Handle = () => {
  return <span className="handle">⊚</span>;
}

export class DragHandleNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "dragHandle";
  }

  constructor(content: null | string = null, key?: NodeKey) {
    super(key);
    this.__content = content;
  }

  static clone(node: DragHandleNode) {
    return new DragHandleNode(node.__content, node.__key);
  }

  importJSON() {
    return new DragHandleNode(this.__content, this.__key);
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

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Handle />;
  }
}