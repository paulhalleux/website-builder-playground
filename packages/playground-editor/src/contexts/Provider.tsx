import { PropsWithChildren } from "react";

import {
  EditorProvider,
  EditorProviderProps,
  useEditorContext,
} from "./editor/EditorContext";
import {
  SelectionProvider,
  SelectionProviderProps,
  useSelectionContext,
} from "./selection/SelectionContext";

type ProviderProps = PropsWithChildren<
  EditorProviderProps & SelectionProviderProps
>;

export function Provider({
  plugins,
  onChange,
  defaultValue,
  children,
}: ProviderProps) {
  return (
    <EditorProvider
      defaultValue={defaultValue}
      onChange={onChange}
      plugins={plugins}
    >
      <SelectionProvider>{children}</SelectionProvider>
    </EditorProvider>
  );
}

export function useEditor() {
  const editor = useEditorContext();
  const selection = useSelectionContext();
  return {
    editor,
    selection,
  };
}
