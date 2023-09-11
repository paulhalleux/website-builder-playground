import { Page } from "@playground/common";

import { useEditor } from "../contexts";
import { addPage, deletePage, updatePage } from "../utils/pages";

export function usePagesActions() {
  const { editor } = useEditor();

  return {
    addPage: (page: Page, parent: string | undefined) => {
      const newValue = addPage(editor.value.content, page, parent);
      editor.onChange({ ...editor.value, content: newValue });
    },
    removePage: (id: string) => {
      const newValue = deletePage(editor.value.content, id);
      editor.onChange({ ...editor.value, content: newValue });
    },
    updatePage: (id: string, page: Partial<Page>) => {
      const newValue = updatePage(editor.value.content, id, page);
      editor.onChange({ ...editor.value, content: newValue });
    },
  };
}
