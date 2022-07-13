import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $isElementNode, ParagraphNode } from "lexical";
import { useEffect } from "react";
import { DragHandleNode } from "../nodes/DragHandleNode";

export function DragAndDropPlugin() {
  const [editor] = useLexicalComposerContext();

  editor.registerMutationListener(ParagraphNode, (mutations) => {
    console.log({ mutations });
    editor.update(() => {
      for (const [key, type] of mutations) {
        const node = $getNodeByKey(key);

        switch (type) {
          case "created":
            const prevSibling = node?.getPreviousSibling();
            if (prevSibling?.getType() !== "dragHandle" && $isElementNode(node)) {
              const collapser = new DragHandleNode();
              node?.insertBefore(collapser);
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
