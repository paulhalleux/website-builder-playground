import { useDrop } from "react-dnd";
import { Element, Layer } from "@playground/common";

import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";
import { getLayerElement } from "../../utils/layers";

export function useWorkspaceElementDrop(layer: Layer) {
  const { addLayer } = useLayersActions();

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

      addLayer(
        {
          name: "New Layer",
          type: item.item.name,
          order: 0,
          id: crypto.randomUUID(),
          properties: {},
          children: [],
        },
        layer.id,
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  }));

  return { canDrop, isOver, item, drop };
}
