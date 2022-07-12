import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { NodeKey, EditorConfig, LexicalEditor, $isElementNode, $parseSerializedNode } from "lexical";

const Toggle = ({ onUpdate }: { onUpdate: () => void }) => {
  const [editor] = useLexicalComposerContext();

  return <span className="toggle" onClick={() => editor.update(onUpdate)}>↓</span>;
};

export class CollapsedNode extends DecoratorBlockNode {
  __content: string | null;

  static getType(): string {
    return "collapsed";
  }

  constructor(content: null | string = null, key?: NodeKey) {
    super(key as any);
    this.__content = content;
  }

  static clone(node: CollapsedNode) {
    return new CollapsedNode(node.__content, node.__key);
  }

  importJSON() {
    return new CollapsedNode(this.__content, this.__key);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      content: this.__content,
      version: 1,
    };
  }

  exportDOM() {
    const element = document.createElement("span");
    return { element };
  }

  expandElement = () => {
    if (this.__content != null) {
      console.log(this.__content);
      this.insertBefore($parseSerializedNode(JSON.parse(this.__content)));
      const _this = this.getWritable();
      _this.__content = null;
      this.remove();
    }
  };

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <Toggle onUpdate={this.expandElement} />;
  }
}

