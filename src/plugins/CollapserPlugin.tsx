import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, $isElementNode, ParagraphNode } from "lexical";
import { useEffect } from "react";
import { CollapserNode } from "../nodes/CollapserNode";

export function CollapserPlugin() {
  const [editor] = useLexicalComposerContext();

  editor.registerMutationListener(ParagraphNode, (mutations) => {
    editor.update(() => {
      for (const [key, type] of mutations) {
        const node = $getNodeByKey(key);

        switch (type) {
          case "created":
            const prevSibling = node?.getPreviousSibling();
            if (prevSibling?.getType() !== "collapser" && $isElementNode(node)) {
              const collapser = new CollapserNode();
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
