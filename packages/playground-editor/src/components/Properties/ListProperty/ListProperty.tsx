import { Field, PropertyProps, PropertyType } from "@playground/common";

export function ListProperty({
  definition,
  name,
  value = "",
  onChange,
}: PropertyProps<string>) {
  return (
    <Field label={definition.label} htmlFor={name}>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {definition.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

ListProperty.$type = PropertyType.List;
