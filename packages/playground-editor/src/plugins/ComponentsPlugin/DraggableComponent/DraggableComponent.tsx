import { useRef } from "react";
import { Element, mergeRefs } from "@playground/common";
import { clsx } from "clsx";

import { PreviewProps } from "../../../types/dnd";

import { useComponentDrag } from "./useComponentDrag";

import styles from "./DraggableComponent.module.scss";

type DraggableComponentProps<T> = {
  element: Element<T>;
};

export function DraggableComponent<T>({ element }: DraggableComponentProps<T>) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isDragging, ref } = useComponentDrag(element, elementRef);

  return (
    <>
      <div
        ref={mergeRefs([ref, elementRef])}
        className={clsx(styles.component, {
          [styles[`component--dragging`]]: isDragging,
        })}
      >
        {element.name}
      </div>
    </>
  );
}

DraggableComponent.Preview = ({ state }: PreviewProps<Element<any>>) => (
  <div
    className={styles.component}
    style={{
      ...state.style,
      width: state.item.ref.current?.offsetWidth,
      height: state.item.ref.current?.offsetHeight,
    }}
  >
    {state.item.item.name}
  </div>
);
