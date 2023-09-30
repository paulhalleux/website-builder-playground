import { DropTargetMonitor, useDrop } from "react-dnd";
import { Element, Layer } from "@playground/common";

import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";

export function useWorkspaceDrop(layer?: Layer, before: boolean = false) {
  const { addLayer } = useLayersActions();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragItemType.Component,
    canDrop: (item) => ["workspace", "both"].includes(item.item.target),
    drop: (item: DragItem<Element<any>>, monitor: DropTargetMonitor) => {
      if (monitor.didDrop()) return;

      addLayer(
        {
          name: "New Layer",
          type: item.item.name,
          order: layer ? (before ? layer.order - 1 : layer.order + 1) : 0,
          id: crypto.randomUUID(),
          properties: {},
          children: [],
        },
        layer?.id,
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, isOver, drop };
}
