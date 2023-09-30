import { PropertyList } from "../components/Properties";

export function getPropertyComponent(name: string) {
  return PropertyList.find((p) => p.$type === name);
}
