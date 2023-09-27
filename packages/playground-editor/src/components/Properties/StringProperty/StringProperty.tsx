import { Field, Input, PropertyProps, PropertyType } from "@playground/common";

export function StringProperty({
  definition,
  name,
  value = "",
  onChange,
}: PropertyProps<string>) {
  return (
    <Field label={definition.label} htmlFor={name}>
      <Input
        id={name}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </Field>
  );
}

StringProperty.$type = PropertyType.String;
