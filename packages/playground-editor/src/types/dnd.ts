import React from "react";
import { PreviewState } from "react-dnd-preview";

export enum DragItemType {
  Element = "element",
  Component = "component",
}

export type PreviewProps<T> = {
  state: PreviewState<DragItem<T>, Element>;
};

export type DragItem<T> = {
  item: T;
  ref: React.RefObject<HTMLElement>;
};
