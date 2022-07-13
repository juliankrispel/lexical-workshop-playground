import { DecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $isElementNode, DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { CollapsedNode } from "./CollapsedElement";

const Handle = () => {
  return <span className="handle" onMouseDown={(e) => {
    const el = e.target as HTMLElement;
    const p = el.closest("p")
    // e.preventDefault();
    e.stopPropagation();
    if (p != null) {
      p.draggable = true;
    }
  }}>⊚</span>;
}

export class DragHandleNode extends DecoratorBlockNode {
  static getType(): string {
    return "dragHandle";
  }

  constructor(key?: NodeKey) {
    super(key as any);
  }

  static clone(node: DragHandleNode) {
    return new DragHandleNode(node.__key);
  }

  static importJSON() {
    return new DragHandleNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      version: 1,
    };
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Handle />;
  }
}