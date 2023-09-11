import {
  Field,
  Input,
  PropertyDefinition,
  PropertyType,
} from "@playground/common";

type StringPropertyProps = {
  definition: PropertyDefinition;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export function StringProperty({
  definition,
  name,
  value = "",
  onChange,
}: StringPropertyProps) {
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
