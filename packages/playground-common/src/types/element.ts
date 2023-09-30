import React from "react";

import { IconProps } from "../components";

import { PropertyDefinition } from "./property";
import { Page } from "./website";

export type ElementProps<T, P = {}> = {
  isEditing: boolean;
  properties: T;
  children: React.ReactNode;
} & P;

export type ElementProperties<T> = {
  [key in keyof T]: PropertyDefinition<T[key]>;
};

export type Element<T> = {
  name: string;
  displayName: string;
  icon?: ((properties: T | undefined) => IconProps["name"]) | IconProps["name"];
  target: "workspace" | "layer" | "both";
  applicable?: (page: Page) => boolean;
  acceptChildren: boolean | string[];
  component: React.FC<ElementProps<T>>;
  properties: ElementProperties<T>;
};
