import { Outlet } from "react-router";
import { Element, ElementProps, findLayer } from "@playground/common";

import { ElementType } from "../../../types";

import styles from "./LayoutContent.module.scss";

type LayoutContentProps = ElementProps<{}>;

export function LayoutContent({ isEditing }: LayoutContentProps) {
  return isEditing ? <div className={styles["layout-content"]} /> : <Outlet />;
}

export const LayoutContentElement: Element<{}> = {
  name: ElementType.LayoutContent,
  displayName: "Layout content",
  target: "layer",
  icon: "placeholder",
  acceptChildren: false,
  applicable: (page) =>
    page.children.length > 0 &&
    !findLayer(
      page.layers,
      (layer) => layer.type === ElementType.LayoutContent,
    ),
  component: LayoutContent,
  properties: [],
};
