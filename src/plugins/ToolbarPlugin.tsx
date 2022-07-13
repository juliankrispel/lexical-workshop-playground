import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CLEAR_EDITOR_COMMAND } from "lexical"

export function ResetPlugin() {
  const [editor] = useLexicalComposerContext()
  return (
    <aside className="toolbar">
      <button
        onClick={() => {
          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        }}
      >
        Clear
      </button>
    </aside>
  );
}