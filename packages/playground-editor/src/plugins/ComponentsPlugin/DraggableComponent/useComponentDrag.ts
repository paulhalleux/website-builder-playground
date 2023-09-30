import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Element } from "@playground/common";

import { DragItemType } from "../../../types/dnd";

export function useComponentDrag<T>(
  element: Element<T>,
  ref: React.RefObject<HTMLDivElement>,
) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragItemType.Component,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      item: element,
      ref,
    },
  }));

  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);

  return { isDragging, ref: drag };
}
