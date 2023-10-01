import { ListProperty } from "./ListProperty";
import { NumberProperty } from "./NumberProperty";
import { PaddingProperty } from "./PaddingProperty";
import { StringProperty } from "./StringProperty";

export const PropertyList = [
  StringProperty,
  NumberProperty,
  PaddingProperty,
  ListProperty,
] as const;
