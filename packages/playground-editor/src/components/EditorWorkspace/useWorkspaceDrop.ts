import { DropTargetMonitor, useDrop } from "react-dnd";
import { Element, Layer } from "@playground/common";

import { useEditor } from "../../contexts";
import { useLayersActions } from "../../hooks/useLayersActions";
import { DragItem, DragItemType } from "../../types/dnd";
import { createDefaultLayer } from "../../utils/layers";

export function useWorkspaceDrop(layer?: Layer, before: boolean = false) {
  const { addLayer } = useLayersActions();
  const { selection } = useEditor();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragItemType.Component,
    canDrop: (item) => ["workspace", "both"].includes(item.item.target),
    drop: (item: DragItem<Element<any>>, monitor: DropTargetMonitor) => {
      if (monitor.didDrop()) return;

      const newLayer = createDefaultLayer({
        type: item.item.name,
        order: layer ? (before ? layer.order - 1 : layer.order + 1) : 0,
      });
      addLayer(newLayer, layer?.id);
      selection.setSelectedLayer(newLayer.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, isOver, drop };
}
