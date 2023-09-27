import { ElementProperties } from "@playground/common";

import { PropertyList } from "../components/Properties";

export function getPropertyDefinition<T>(
  properties: ElementProperties<T>,
  key: string,
) {
  return properties[key as keyof ElementProperties<T>];
}

export function getPropertyComponent(name: string) {
  return PropertyList.find((p) => p.$type === name);
}
