import { ElementType, JSX } from "react";

import { useListSlot } from "./slot-context";

export type ListSlotProps = {
  elementType: ElementType | string | (ElementType | string)[];
  condition?: (element: JSX.Element, elements: JSX.Element[]) => boolean;
  children?: (element: JSX.Element[]) => JSX.Element;
};

export function ListSlot({ elementType, children, condition }: ListSlotProps) {
  const elements = useListSlot(elementType, condition);
  if (!elements || elements.length === 0) return null;
  return children ? (
    children(elements)
  ) : (
    <>{elements.map((el) => el.props.children || null)}</>
  );
}
