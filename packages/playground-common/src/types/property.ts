export enum PropertyType {
  Display = "display",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Color = "color",
  Padding = "Padding",
  List = "list",
}

export type PropertyDefinition = {
  name: string;
  label: string;
  hidden?: boolean;
  type: PropertyType;
  defaultValue?: any;
  options?: {
    label: string;
    value: string;
  }[];
};

export type PropertyProps<TValue> = {
  definition: PropertyDefinition;
  name: string;
  value: TValue;
  onChange: (value: TValue) => void;
};
