import { useMemo } from "react";
import {
  Button,
  ContextMenu,
  EditorPluginSectionProps,
  Page,
} from "@playground/common";

import { ElementTree } from "../../../components/ElementTree";
import { ElementTreeItem } from "../../../components/ElementTree/ElementTree";
import { useEditor } from "../../../contexts";
import { usePagesActions } from "../../../hooks/usePagesActions";
import { createDefaultPage } from "../../../utils/pages";

export function PagesSection({ editor }: EditorPluginSectionProps) {
  const { selection } = useEditor();
  const { updatePage, addPage, removePage } = usePagesActions();

  const rename = (id: string, name: string) => {
    updatePage(id, { name });
  };

  const onItemSelect = (id: string, page: Page) => {
    if (id === "delete-page") {
      removePage(page.id);
    } else if (id === "add-page") {
      const newPage = createDefaultPage();
      addPage(newPage, page.id);
      selection.setSelectedPage(newPage.id);
    }
  };

  const items = useMemo(() => {
    return getPageItems(editor.editor.value.content, rename);
  }, [editor.editor.value.content, editor.selection.selectedPageId]);

  return (
    <ElementTree
      items={items}
      selected={editor.selection.selectedPageId}
      onSelect={editor.selection.setSelectedPage}
      contextMenu={(item) => (
        <ContextMenu onItemSelect={(id) => onItemSelect(id, item.data)}>
          <ContextMenu.Item id="delete-page">Delete</ContextMenu.Item>
          <ContextMenu.Item id="add-page">New page</ContextMenu.Item>
        </ContextMenu>
      )}
    />
  );
}

const getPageItems = (
  pages: Page[],
  rename?: (id: string, name: string) => void,
): ElementTreeItem<Page>[] => {
  return pages.map((page) => ({
    id: page.id,
    label: page.name,
    icon: page.children.length > 0 ? "layout" : "file",
    onChange: (name: string) => rename?.(page.id, name),
    children: getPageItems(page.children, rename),
    data: page,
  }));
};

function PagesSectionActions({
  editor: { selection },
}: EditorPluginSectionProps) {
  const { addPage } = usePagesActions();

  const onPageAdd = () => {
    console.log("onPageAdd");
    const newPage = createDefaultPage();
    addPage(newPage, undefined);
    selection.setSelectedPage(newPage.id);
  };

  return <Button.Icon icon="plus" size="small" onClick={onPageAdd} />;
}

PagesSection.Actions = PagesSectionActions;
