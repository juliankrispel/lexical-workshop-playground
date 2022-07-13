import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getNodeByKey, $isElementNode, COMMAND_PRIORITY_EDITOR, DRAGEND_COMMAND, DRAGSTART_COMMAND, ParagraphNode, TextNode } from "lexical";
import { DragHandleNode } from "../nodes/DragHandleNode";

export function DragAndDropPlugin() {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    DRAGSTART_COMMAND,
    (payload, editor) => {
      console.log('dragstart', payload);
      return false;
    },
    COMMAND_PRIORITY_EDITOR
  );

  editor.registerCommand(
    DRAGEND_COMMAND,
    (payload, editor) => {
      console.log("dragend", payload);
      return false;
    },
    COMMAND_PRIORITY_EDITOR
  );

  // editor.registerCommand()
  editor.registerMutationListener(ParagraphNode, (mutations) => {
    editor.update(() => {
      for (const [key, type] of mutations) {
        const node = $getNodeByKey(key);
        switch (type) {
          case "created":
            if ($isElementNode(node)) {
              const children = node.getChildren()
              if (children.length === 0) {
                node.append($createTextNode(""));
              }
              const firstChild = node.getFirstChild()
              if (!children.some(child => child.getType() === 'dragHandle') && firstChild != null) {
                firstChild.insertBefore(new DragHandleNode());
              }
            }
            break;
          default:
            break;
        }
      }
    });
  });


  return null;
}
