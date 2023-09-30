export enum PropertyType {
  Display = "display",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Color = "color",
  Padding = "Padding",
}

export type PropertyDefinition<T> = {
  name: string;
  label: string;
  type: PropertyType;
  defaultValue?: T;
};

export type PropertyProps<TValue> = {
  definition: PropertyDefinition<TValue>;
  name: string;
  value: TValue;
  onChange: (value: TValue) => void;
};
