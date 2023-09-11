import { Layer } from "@playground/common";

import { useEditor } from "../contexts";
import { addLayer, removeLayer, updateLayer } from "../utils/layers";

import { usePagesActions } from "./usePagesActions";

export function useLayersActions() {
  const { updatePage } = usePagesActions();

  const {
    selection: { selectedPage },
  } = useEditor();

  return {
    addLayer: (layer: Layer, parent: string | undefined) => {
      if (!selectedPage) return;
      const newValue = addLayer(selectedPage.layers, layer, parent);
      updatePage(selectedPage.id, {
        layers: newValue,
      });
    },
    removeLayer: (id: string) => {
      if (!selectedPage) return;
      const newValue = removeLayer(selectedPage.layers, id);
      updatePage(selectedPage.id, {
        layers: newValue,
      });
    },
    updateLayer: (id: string, layer: Partial<Layer>) => {
      if (!selectedPage) return;
      const newValue = updateLayer(selectedPage.layers, id, layer);
      updatePage(selectedPage.id, {
        layers: newValue,
      });
    },
  };
}
