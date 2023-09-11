import { ElementType, JSX } from "react";

import { useListSlot } from "./slot-context";

export type EachSlotProps = {
  elementType: ElementType | string | (ElementType | string)[];
  condition?: (element: JSX.Element, elements: JSX.Element[]) => boolean;
  children?: (element: JSX.Element) => JSX.Element;
};

export function EachSlot({ elementType, children, condition }: EachSlotProps) {
  const elements = useListSlot(elementType, condition);
  if (!elements) return null;
  return elements.map((element) =>
    children && element ? (
      children(element)
    ) : (
      <>{element.props.children || null}</>
    ),
  );
}
