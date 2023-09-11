import { PropsWithChildren } from "react";
import {
  Display,
  DisplayType,
  Element,
  ElementProps,
  getAlignmentStyle,
  Padding,
  PropertyType,
} from "@playground/common";

import { ElementType } from "../../../types";

type ContainerElementProperties = {
  backgroundColor: string;
  padding: Padding;
  display: Display;
};

type ContainerProps = ElementProps<
  ContainerElementProperties,
  PropsWithChildren
>;

export function Container({ children, properties }: ContainerProps) {
  const displayProperties =
    properties.display?.type === "flex"
      ? {
          ...getAlignmentStyle(
            properties.display.align,
            properties.display.direction,
          ),
          flexDirection:
            properties.display.direction === "column" ? "column" : "row",
          flexWrap: properties.display.direction === "wrap" ? "wrap" : "nowrap",
          gap: properties.display.gap,
        }
      : {};

  return (
    <div
      style={{
        height: 300,
        backgroundColor: properties.backgroundColor,
        padding: `${properties.padding?.top}px ${properties.padding?.right}px ${properties.padding?.bottom}px ${properties.padding?.left}px`,
        display: properties.display?.type,
        ...displayProperties,
      }}
    >
      {children}
    </div>
  );
}

export const ContainerElement: Element<ContainerElementProperties> = {
  name: ElementType.Container,
  acceptChildren: true,
  component: Container,
  properties: {
    backgroundColor: {
      label: "Background color",
      type: PropertyType.String,
      defaultValue: "#ffffff",
    },
    padding: {
      label: "Padding",
      type: PropertyType.Padding,
      defaultValue: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    display: {
      label: "Display",
      type: PropertyType.Display,
      defaultValue: {
        type: DisplayType.Block,
      },
    },
  },
};
