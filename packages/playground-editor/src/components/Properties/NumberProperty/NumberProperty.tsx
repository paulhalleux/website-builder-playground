import { Input, PropertyProps, PropertyType } from "@playground/common";

export function NumberProperty({
  definition,
  value,
  onChange,
}: PropertyProps<number>) {
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
