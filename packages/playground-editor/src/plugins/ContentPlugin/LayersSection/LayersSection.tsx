import React, { useMemo } from "react";
import {
  ContextMenu,
  EditorPluginSectionProps,
  Layer,
} from "@playground/common";

import { ElementTree } from "../../../components/ElementTree";
import { ElementTreeItem } from "../../../components/ElementTree/ElementTree";
import { useLayersActions } from "../../../hooks/useLayersActions";
import { getLayerElement } from "../../../utils/layers";

export function LayersSection({ editor }: EditorPluginSectionProps) {
  const { updateLayer, removeLayer } = useLayersActions();

  const rename = (id: string, name: string) => {
    updateLayer(id, { name });
  };

  const onItemSelect = (id: string, layer: Layer) => {
    if (id === "delete-layer") {
      removeLayer(layer.id);
    }
  };

  const onMouseOver = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Layer,
  ) => {
    editor.selection.setHoveredLayer(item.id);
  };

  const onMouseOut = () => {
    editor.selection.setHoveredLayer(undefined);
  };

  const items = useMemo(() => {
    return getLayerItems(editor.selection.selectedPage?.layers ?? [], rename);
  }, [editor.selection.selectedPage?.layers]);

  return (
    <ElementTree
      items={items}
      selected={editor.selection.selectedLayerId}
      onSelect={editor.selection.setSelectedLayer}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      contextMenu={(item) => (
        <ContextMenu onItemSelect={(id) => onItemSelect(id, item.data)}>
          <ContextMenu.Item id="delete-layer">Delete</ContextMenu.Item>
        </ContextMenu>
      )}
    />
  );
}

const getLayerItems = (
  layers: Layer[],
  rename?: (id: string, name: string) => void,
): ElementTreeItem<Layer>[] => {
  return layers
    .sort((a, b) => a.order - b.order)
    .map((layer) => {
      const element = getLayerElement(layer);
      return {
        id: layer.id,
        label: layer.name,
        icon: element?.icon
          ? typeof element.icon === "function"
            ? element.icon({
                children: [],
                properties: layer.properties as any,
              })
            : element.icon
          : "box",
        onChange: (name: string) => rename?.(layer.id, name),
        children: getLayerItems(layer.children, rename),
        data: layer,
      };
    });
};
