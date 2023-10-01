import { useDrop } from "react-dnd";
import { Element, Layer } from "@playground/common";

import { useEditor } from "../../contexts";
import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";
import { createDefaultLayer, getLayerElement } from "../../utils/layers";

export function useWorkspaceElementDrop(layer: Layer) {
  const { addLayer } = useLayersActions();
  const { selection } = useEditor();

  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    accept: DragItemType.Component,
    canDrop: (item: DragItem<Element<any>>) => {
      const acceptTarget = ["layer", "both"].includes(item.item.target);
      const elementDefinition = getLayerElement(layer);
      if (!elementDefinition) return false;
      return (
        acceptTarget &&
        (typeof elementDefinition.acceptChildren === "boolean"
          ? elementDefinition.acceptChildren
          : elementDefinition.acceptChildren.includes(item.item.name))
      );
    },
    drop: (item: DragItem<Element<any>>, monitor) => {
      if (monitor.didDrop()) return;

      const newLayer = createDefaultLayer({
        type: item.item.name,
        order: layer.order + 1,
      });
      addLayer(newLayer, layer.id);
      selection.setSelectedLayer(newLayer.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  }));

  return { canDrop, isOver, item, drop };
}
