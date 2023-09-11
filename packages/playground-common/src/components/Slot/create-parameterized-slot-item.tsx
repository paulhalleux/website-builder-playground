import React, { ElementType } from "react";

type ParameterizedSlotItemProps<ChildrenPropsData> = {
  children?: (props: ChildrenPropsData) => React.ReactNode;
};

/**
 * Creates a component with a `children` prop that is a function that returns a ReactNode.
 * The children function takes props of type `ChildrenPropsData`. These props are injected
 * by the `Slot` component.
 *
 * @returns The component.
 */
export function createParameterizedSlotItem<ChildrenPropsData>(): ElementType<{
  children?: (props: ChildrenPropsData) => React.ReactNode;
}> {
  const Component = ({
    children,
    ...rest
  }: ParameterizedSlotItemProps<ChildrenPropsData>) => {
    return children ? <>{children(rest as ChildrenPropsData)}</> : undefined;
  };

  Component.isSlotItem = true;

  return Component as ElementType<{
    children?: (props: ChildrenPropsData) => React.ReactNode;
  }> & {
    isSlotItem: true;
  };
}
