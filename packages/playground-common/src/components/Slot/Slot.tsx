import React, { ElementType, JSX, ReactNode } from "react";

import { EachSlot } from "./EachSlot";
import { ListSlot } from "./ListSlot";
import { useSlot } from "./slot-context";

export type SlotProps<ElementProps> = {
  elementType: ElementType | string | (ElementType | string)[];
  condition?: (element: JSX.Element, elements: JSX.Element[]) => boolean;
  children?: (element: JSX.Element) => JSX.Element;
  props?: ElementProps;
  fallback?: ReactNode;
};

export function Slot<ElementProps extends Record<string, any>>({
  elementType,
  children,
  props,
  condition,
  fallback,
}: SlotProps<ElementProps>) {
  const element = useSlot(elementType, condition);

  if (!element) return fallback || null;
  const elementWithProps = React.cloneElement(element, {
    ...props,
  });

  return children
    ? children(elementWithProps)
    : elementWithProps.props.children || null;
}

Slot.List = ListSlot;
Slot.Each = EachSlot;
