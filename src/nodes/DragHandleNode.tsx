import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $isElementNode, DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { useRef } from "react";
import { CollapsedNode } from "./CollapsedElement";

const Handle = () => {
  const [editor] = useLexicalComposerContext()
  return (
    <span
      className="handle"
      onMouseDown={(e) => {
        editor.blur();
        const el = e.target as HTMLElement;
        const p = el.closest("p");
        // e.preventDefault();
        e.stopPropagation();
        console.log(p);
        if (p != null) {
          p.setAttribute("draggable", "true");
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      ⊚
    </span>
  );
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

  isTopLevel(): boolean {
    return true;
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