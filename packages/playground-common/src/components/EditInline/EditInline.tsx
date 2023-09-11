import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import styles from "./EditInline.module.scss";

export type EditInlineProps = {
  value: string;
  onChange: (value: string) => void;
  trigger?: "click" | "double-click";
  inputClassName?: string;
  onStartEditing?: () => void;
  onStopEditing?: () => void;
};

export function EditInline({
  value,
  onChange,
  trigger = "double-click",
  inputClassName,
  onStartEditing,
  onStopEditing,
}: EditInlineProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editValue, setEditValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const onClose = () => {
    setEditing(false);
    onStopEditing?.();
  };

  useClickAway(inputRef, onClose);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
      if (editValue.trim().length > 0) {
        onChange(editValue);
        setEditValue(value);
      }
    } else if (e.key === "Escape") {
      onClose();
      setEditValue(value);
    }
  };

  const onClick = (event: React.MouseEvent) => {
    if (trigger !== "click") return;

    event.stopPropagation();
    event.preventDefault();

    onStartEditing?.();

    setEditing(true);
    setEditValue(value);
  };

  const onDoubleClick = (event: React.MouseEvent) => {
    if (trigger !== "double-click") return;

    event.stopPropagation();
    event.preventDefault();

    onStartEditing?.();

    setEditing(true);
    setEditValue(value);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditValue(e.target.value);

  return (
    <div ref={inputRef} className={styles.edit}>
      {editing ? (
        <input
          autoFocus
          className={clsx(styles.edit__input, inputClassName)}
          type="text"
          value={editValue}
          onChange={onValueChange}
          onKeyDown={onKeyDown}
          onBlur={onClose}
        />
      ) : (
        <span
          className={styles.edit__value}
          onDoubleClick={onDoubleClick}
          onClick={onClick}
        >
          {value}
        </span>
      )}
    </div>
  );
}
