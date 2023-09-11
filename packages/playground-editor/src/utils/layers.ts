import { Layer, Page } from "@playground/common";
import { Elements } from "@playground/elements";

export function getLayerById(page: Page, layerId: string): Layer | undefined {
  function findLayerRecursive(layers: Layer[]): Layer | undefined {
    for (const layer of layers) {
      if (layer.id === layerId) {
        return layer;
      }

      const foundLayer = findLayerRecursive(layer.children);
      if (foundLayer) {
        return foundLayer;
      }
    }
    return undefined;
  }

  return findLayerRecursive(page.layers);
}

export function addLayer(
  layers: Layer[],
  layerToAdd: Layer,
  parentId: string | undefined,
): Layer[] {
  const newLayers = [...layers];

  if (!parentId) {
    newLayers.push(layerToAdd);
    return newLayers;
  }

  function addLayerRecursive(
    layers: Layer[],
    id: string,
    layerToAdd: Layer,
  ): boolean {
    for (const layer of layers) {
      if (layer.id === id) {
        layer.children.push(layerToAdd);
        return true;
      } else {
        const added = addLayerRecursive(layer.children, id, layerToAdd);
        if (added) {
          return true;
        }
      }
    }

    return false;
  }

  if (addLayerRecursive(newLayers, parentId, layerToAdd)) {
    return newLayers;
  } else {
    throw new Error(`Cannot find parent layer with id ${parentId}`);
  }
}

export function removeLayer(layers: Layer[], layerId: string): Layer[] {
  const newLayers = [...layers];

  function removeLayerRecursive(layers: Layer[], id: string): boolean {
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      if (layer.id === id) {
        layers.splice(i, 1);
        return true;
      }

      if (removeLayerRecursive(layer.children, id)) {
        return true;
      }
    }

    return false;
  }

  if (removeLayerRecursive(newLayers, layerId)) {
    return newLayers;
  } else {
    throw new Error(`Cannot find layer with id ${layerId}`);
  }
}

export function updateLayer(
  layers: Layer[],
  layerId: string,
  update: Partial<Layer>,
): Layer[] {
  const newLayers = [...layers];

  function updateLayerRecursive(
    layers: Layer[],
    id: string,
    update: Partial<Layer>,
  ): boolean {
    for (const layer of layers) {
      if (layer.id === id) {
        Object.assign(layer, update);
        return true;
      }

      if (updateLayerRecursive(layer.children, id, update)) {
        return true;
      }
    }

    return false;
  }

  if (updateLayerRecursive(newLayers, layerId, update)) {
    return newLayers;
  } else {
    throw new Error(`Cannot find layer with id ${layerId}`);
  }
}

export function getLayerElement(layer: Layer) {
  return Object.values(Elements).find((element) => element.name === layer.type);
}
