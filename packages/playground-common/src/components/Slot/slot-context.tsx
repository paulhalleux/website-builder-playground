import React, {
  createContext,
  ElementType,
  PropsWithChildren,
  useMemo,
} from "react";

type SlotContextType = {
  elements: React.ReactElement[];
};

const defaultValue: SlotContextType = {
  elements: [],
};

export const SlotContext = createContext<SlotContextType>(defaultValue);

export type SlotProviderProps = PropsWithChildren<{
  element: React.ReactNode;
}>;

export function SlotProvider({ element, children }: SlotProviderProps) {
  const ChildrenArray = useMemo(
    () => React.Children.toArray(element).filter(React.isValidElement),
    [element],
  );

  return (
    <SlotContext.Provider
      value={{
        elements: ChildrenArray,
      }}
    >
      {children}
    </SlotContext.Provider>
  );
}

export function useSlotContext() {
  return React.useContext(SlotContext);
}

export function useSlot(
  type: ElementType | string | (ElementType | string)[],
  condition?: (
    element: React.ReactElement,
    elements: React.ReactElement[],
  ) => boolean,
) {
  const { elements } = React.useContext(SlotContext);
  return elements.find((element) => {
    if (Array.isArray(type)) {
      return type.some((t) => {
        return (
          (typeof t === "string"
            ? // @ts-ignore
              element.type.$type === t
            : element.type === t) &&
          (!condition || condition?.(element, elements))
        );
      });
    }

    return (
      (typeof type === "string"
        ? // @ts-ignore
          element.type.$type === type
        : element.type === type) &&
      (!condition || condition?.(element, elements))
    );
  });
}

export function useListSlot(
  type: ElementType | string | (ElementType | string)[],
  condition?: (
    element: React.ReactElement,
    elements: React.ReactElement[],
  ) => boolean,
) {
  const { elements } = React.useContext(SlotContext);

  function extractFragmentContent(
    element: React.ReactElement,
  ): React.ReactElement[] {
    if (element.type === React.Fragment) {
      return React.Children.toArray(element.props.children).flatMap((child) =>
        extractFragmentContent(child as React.ReactElement),
      );
    }
    return [element];
  }

  return elements.flatMap((element) => {
    const elementsToFilter = extractFragmentContent(element);
    return elementsToFilter.filter((el) => {
      if (Array.isArray(type)) {
        return type.some((t) => {
          return (
            (typeof t === "string"
              ? // @ts-ignore
                el.type.$type === t
              : el.type === t) &&
            (!condition || condition(el, elementsToFilter))
          );
        });
      }

      return (
        (typeof type === "string"
          ? // @ts-ignore
            el.type.$type === type
          : el.type === type) &&
        (!condition || condition(el, elementsToFilter))
      );
    });
  });
}

export function useSlotExists(type: ElementType) {
  const { elements } = React.useContext(SlotContext);
  return elements.some((element) => element.type === type);
}
