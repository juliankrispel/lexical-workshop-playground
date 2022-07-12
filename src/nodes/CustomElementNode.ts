import {
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  SerializedElementNode,
  SerializedLexicalNode,
} from "lexical";

export class CustomElementNode extends ElementNode {
  static getType(): string {
    return "custom";
  }

  static importJSON(_serializedNode: SerializedLexicalNode): CustomElementNode {
    return new CustomElementNode();
  }

  static clone(): LexicalNode {
    return new CustomElementNode();
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: this.getType(),
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const el = document.createElement("div");
    const className = config.theme?.custom;
    if (className != null) el.className = className;
    return el;
  }

  updateDOM(): boolean {
    return false;
  }
}
