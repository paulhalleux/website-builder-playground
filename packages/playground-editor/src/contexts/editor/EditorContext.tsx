import React, { useCallback } from "react";
import {
  EditorContextType,
  Plugin,
  useStoreState,
  Website,
} from "@playground/common";

import { defaultPlugins } from "../../plugins";

export const EditorContext = React.createContext<EditorContextType>(
  {} as EditorContextType,
);

export type EditorProviderProps = React.PropsWithChildren<{
  plugins?: Plugin[];
  onChange?: (value: Website) => void;
  defaultValue: Website;
}>;

export function EditorProvider({
  children,
  plugins,
  onChange,
  defaultValue,
}: EditorProviderProps) {
  const [value, setValue] = useStoreState("editor-value", defaultValue);

  const onValueChange = useCallback(
    (value: ((prev: Website) => Website) | Website) => {
      setValue(value);
      onChange?.(typeof value === "function" ? value(defaultValue) : value);
    },
    [setValue, onChange],
  );

  return (
    <EditorContext.Provider
      value={{
        plugins: plugins || defaultPlugins,
        value,
        onChange: onValueChange,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return React.useContext(EditorContext);
}
