import { useDrop } from "react-dnd";
import { Element, Layer } from "@playground/common";

import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";
import { getLayerElement } from "../../utils/layers";

export function useWorkspaceElementDrop(layer: Layer) {
  const { addLayer } = useLayersActions();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragItemType.Component,
    canDrop: (item: DragItem<Element<any>>) => {
      const elementDefinition = getLayerElement(layer);
      if (!elementDefinition) return false;
      return typeof elementDefinition.acceptChildren === "boolean"
        ? elementDefinition.acceptChildren
        : elementDefinition.acceptChildren.includes(item.item.name);
    },
    drop: (item: DragItem<Element<any>>) => {
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
    }),
  }));

  return { canDrop, isOver, drop };
}
