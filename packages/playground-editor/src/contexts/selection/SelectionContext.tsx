import React from "react";
import { SelectionContextType } from "@playground/common";

import { getLayerById } from "../../utils/layers";
import { getPageById } from "../../utils/pages";
import { useEditorContext } from "../editor";

export const SelectionContext = React.createContext<SelectionContextType>(
  {} as SelectionContextType,
);

export type SelectionProviderProps = React.PropsWithChildren;

export function SelectionProvider({ children }: SelectionProviderProps) {
  const { value } = useEditorContext();

  const [selectedPageId, setSelectedPageId] = React.useState<string>();
  const [selectedLayerId, setSelectedLayerId] = React.useState<string>();
  const [hoveredLayerId, setHoveredLayerId] = React.useState<string>();

  const selectedPage = React.useMemo(
    () => (selectedPageId ? getPageById(value, selectedPageId) : undefined),
    [selectedPageId, value.content],
  );

  const selectedLayer = React.useMemo(
    () =>
      selectedLayerId && selectedPage
        ? getLayerById(selectedPage, selectedLayerId)
        : undefined,
    [selectedLayerId, selectedPage],
  );

  return (
    <SelectionContext.Provider
      value={{
        selectedPageId,
        selectedLayerId,
        hoveredLayerId,
        setSelectedPage: setSelectedPageId,
        setSelectedLayer: setSelectedLayerId,
        setHoveredLayer: setHoveredLayerId,
        selectedPage,
        selectedLayer,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelectionContext() {
  return React.useContext(SelectionContext);
}
