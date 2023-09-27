import React from "react";
import {
  Button,
  Field,
  Icon,
  Input,
  PropertyProps,
  PropertyType,
} from "@playground/common";

import styles from "./PaddingProperty.module.scss";

export type Padding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function PaddingProperty({
  definition,
  name,
  value = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange,
}: PropertyProps<Padding>) {
  const [uniform, setUniform] = React.useState(
    value.top === value.bottom && value.left === value.right,
  );

  const onChangeUniform = () => {
    if (!uniform) {
      setUniform(true);
      onChange({
        top: value.top,
        bottom: value.top,
        left: value.left,
        right: value.left,
      });
    } else {
      setUniform(false);
    }
  };

  return (
    <Field label={definition.label} htmlFor={name}>
      <div className={styles.padding}>
        {uniform ? (
          <div className={styles.padding__container}>
            <Input
              leftIcon={<Icon name="padding-block" />}
              className={styles.input}
              id={name}
              type="number"
              value={value.top}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({
                  ...value,
                  top: newValue,
                  bottom: newValue,
                });
              }}
            />
            <Input
              leftIcon={<Icon name="padding-inline" />}
              className={styles.input}
              id={name}
              type="number"
              value={value.left}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({
                  ...value,
                  right: newValue,
                  left: newValue,
                });
              }}
            />
          </div>
        ) : (
          <div className={styles.padding__container}>
            <Input
              leftIcon={<Icon name="padding-top" />}
              className={styles.input}
              type="number"
              value={value.top}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({ ...value, top: newValue });
              }}
            />
            <Input
              leftIcon={<Icon name="padding-left" />}
              className={styles.input}
              type="number"
              value={value.left}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({ ...value, left: newValue });
              }}
            />
            <Input
              leftIcon={<Icon name="padding-bottom" />}
              className={styles.input}
              type="number"
              value={value.bottom}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({ ...value, bottom: newValue });
              }}
            />
            <Input
              leftIcon={<Icon name="padding-right" />}
              className={styles.input}
              type="number"
              value={value.right}
              onChange={(event) => {
                const newValue = parseInt(event.currentTarget.value);
                onChange({ ...value, right: newValue });
              }}
            />
          </div>
        )}
        <Button.Icon icon="padding" size="large" onClick={onChangeUniform} />
      </div>
    </Field>
  );
}

PaddingProperty.$type = PropertyType.Padding;
