import { useDrop } from "react-dnd";
import { Element } from "@playground/common";

import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";

export function useWorkspaceDrop() {
  const { addLayer } = useLayersActions();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragItemType.Component,
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
        undefined,
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, isOver, drop };
}
