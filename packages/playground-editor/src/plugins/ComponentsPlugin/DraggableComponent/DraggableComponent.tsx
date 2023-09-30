import { useRef } from "react";
import { Element, Icon, IconProps, mergeRefs } from "@playground/common";
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

  const icon: IconProps["name"] | undefined = element.icon
    ? typeof element.icon === "string"
      ? element.icon
      : element.icon(undefined)
    : "box";

  return (
    <>
      <div
        ref={mergeRefs([ref, elementRef])}
        className={clsx(styles.component, {
          [styles[`component--dragging`]]: isDragging,
        })}
      >
        <Icon name={icon} className={styles.icon} size={14} />
        {element.displayName}
      </div>
    </>
  );
}

DraggableComponent.Preview = ({ state }: PreviewProps<Element<any>>) => {
  const icon: IconProps["name"] | undefined = state.item.item.icon
    ? typeof state.item.item.icon === "string"
      ? state.item.item.icon
      : state.item.item.icon(undefined)
    : "box";

  return (
    <div
      className={clsx(styles.component, styles["component--drag-preview"])}
      style={{
        ...state.style,
        width: state.item.ref.current?.offsetWidth,
        height: state.item.ref.current?.offsetHeight,
      }}
    >
      <Icon name={icon} className={styles.icon} size={14} />
      {state.item.item.displayName}
    </div>
  );
};
