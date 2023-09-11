import React from "react";

import { IconProps } from "../components";

import { PropertyDefinition } from "./property";

export type ElementProps<T, P = {}> = {
  properties: T;
  children: React.ReactNode;
} & P;

export type ElementProperties<T> = {
  [key in keyof T]: PropertyDefinition<T[key]>;
};

export type Element<T> = {
  name: string;
  acceptChildren: boolean | string[];
  component: React.FC<ElementProps<T>>;
  icon?: ((props: ElementProps<T>) => IconProps["name"]) | IconProps["name"];
  properties: ElementProperties<T>;
};
