import {
  EditorConfig,
  ElementNode,
  LexicalEditor,
  SerializedElementNode,
} from "lexical";
import { removeClassNamesFromElement } from "@lexical/utils";

export class DraggableNode extends ElementNode {
  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: this.getType(),
    };
  }

  updateDOM(prevNode: ParagraphNode, dom: HTMLElement): boolean {
    return false;
  }
}

export class ParagraphNode extends DraggableNode {
  static getType(): string {
    return "paragraph";
  }

  static clone(node: ParagraphNode): ParagraphNode {
    return new ParagraphNode();
  }

  static importJSON(): ParagraphNode {
    return new ParagraphNode();
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("p");
    const drag = document.createElement("span");
    console.log("create dom");
    drag.id = `n-${Math.random()}`;
    el.addEventListener("dragend", () => {
      console.log("drag end");
      el.setAttribute("draggable", "false");
      removeClassNamesFromElement(el, "drop-over");
    });

    drag.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      el.setAttribute("draggable", "true");
    });
    drag.className = "drag-handle";
    el.setAttribute("draggable", "false");
    drag.contentEditable = "false";
    el.prepend(drag);
    return el;
  }
}
