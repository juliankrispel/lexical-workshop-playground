import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  INSERT_PARAGRAPH_COMMAND,
  DRAGSTART_COMMAND,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  $getNearestNodeFromDOMNode,
  DRAGEND_COMMAND,
  CLICK_COMMAND,
  COMMAND_PRIORITY_HIGH,
} from "lexical";
import {
  $findMatchingParent,
  addClassNamesToElement,
  removeClassNamesFromElement,
} from "@lexical/utils";
import { useLayoutEffect } from "react";
import { ParagraphNode } from "../../nodes/nodes";
import { $getNodeByKey } from "lexical/LexicalUtils";

export function DraggablePlugin() {
  const [editor] = useLexicalComposerContext();
  useLayoutEffect(() => {
    editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }
        selection.insertNodes([new ParagraphNode()]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    editor.registerCommand(
      DRAGSTART_COMMAND,
      (event: DragEvent) => {
        const element = event.target as Element;
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    editor.registerCommand(
      DRAGOVER_COMMAND,
      (event: DragEvent) => {
        const selection = $getSelection();
        const node = $getNearestNodeFromDOMNode(event.target as Element);
        if (node != null) {
          const droppable = $findMatchingParent(
            node,
            (_node) => _node.getType() === "paragraph"
          );
          if (droppable != null) {
            event.preventDefault();
            const el = editor.getElementByKey(
              droppable.getKey()
            )
            if (el == null) throw new Error("waah");
            addClassNamesToElement(el, 'drop-over')
            return true;
          }
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );

    editor.registerCommand(
      CLICK_COMMAND,
      (event: DragEvent) => {
        console.log("click");
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    editor.registerCommand(
      DRAGEND_COMMAND,
      (event: DragEvent) => {
        console.log("drag end");
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );


    editor.registerCommand(
      DROP_COMMAND,
      (event: DragEvent) => {
        const element = event.target as Element;
        console.log("drop");
        console.log(element);
        event.preventDefault();

        const node = $getNearestNodeFromDOMNode(event.target as Element);
        if (node == null) throw new Error('node needs to be defined')

        const droppable = $findMatchingParent(
          node,
          (_node) => _node.getType() === "paragraph"
        );
        if (droppable != null) {
          event.preventDefault();
          const el = editor.getElementByKey(
            droppable.getKey()
          )
          if (el == null) throw new Error("waah");
          removeClassNamesFromElement(el, "drop-over");
          /**
           * TODO: move dragging element
           */
          return true;
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
