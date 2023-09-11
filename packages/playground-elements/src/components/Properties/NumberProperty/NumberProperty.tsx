import { Input, PropertyDefinition, PropertyType } from "@playground/common";

type NumberPropertyProps = {
  definition: PropertyDefinition;
  value: number;
  onChange: (value: number) => void;
};

export function NumberProperty({
  definition,
  value,
  onChange,
}: NumberPropertyProps) {
  return (
    <Input
      label={definition.label}
      type="number"
      value={value || 0}
      onChange={(event) => onChange(parseInt(event.currentTarget.value, 10))}
    />
  );
}

NumberProperty.$type = PropertyType.Number;
