import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getNodeByKey, $isElementNode, CLICK_COMMAND, COMMAND_PRIORITY_EDITOR, DRAGEND_COMMAND, DRAGOVER_COMMAND, DRAGSTART_COMMAND, ParagraphNode, SELECTION_CHANGE_COMMAND, TextNode } from "lexical";
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
    DRAGOVER_COMMAND,
    (payload, editor) => {
      console.log("dragover", payload);
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
            const el = editor.getElementByKey(key)
            el?.setAttribute("draggable", "true");
            break;
          default:
            break;
        }
      }
    });
  });


  return null;
}
