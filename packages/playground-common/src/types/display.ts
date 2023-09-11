import { CSSProperties } from "react";

export enum DisplayType {
  InlineBlock = "inline-block",
  Block = "block",
  Flex = "flex",
}

export type DisplayInlineBlock = {
  type: DisplayType.InlineBlock;
};

export type DisplayBlock = {
  type: DisplayType.Block;
};

export enum Alignment {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  TopSpaced = "top-spaced",
  MiddleLeft = "middle-left",
  MiddleRight = "middle-right",
  MiddleCenter = "middle-center",
  MiddleSpaced = "middle-spaced",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomSpaced = "bottom-spaced",
  LeftSpaced = "left-spaced",
  CenterSpaced = "center-spaced",
  RightSpaced = "right-spaced",
}

export const DirectionSpacedMap = {
  column: {
    [Alignment.TopSpaced]: Alignment.LeftSpaced,
    [Alignment.MiddleSpaced]: Alignment.CenterSpaced,
    [Alignment.BottomSpaced]: Alignment.RightSpaced,
  },
  row: {
    [Alignment.CenterSpaced]: Alignment.MiddleSpaced,
    [Alignment.LeftSpaced]: Alignment.TopSpaced,
    [Alignment.RightSpaced]: Alignment.BottomSpaced,
  },
};

export type DisplayFlex = {
  type: DisplayType.Flex;
  direction: "row" | "column" | "wrap";
  align: Alignment;
  gap: number;
};

export type Display = DisplayInlineBlock | DisplayBlock | DisplayFlex;

export const getAlignmentStyle = (
  align: Alignment,
  direction: DisplayFlex["direction"],
): CSSProperties => {
  switch (align) {
    case Alignment.TopLeft:
      return { justifyContent: "flex-start", alignItems: "flex-start" };
    case Alignment.TopCenter:
      if (direction === "column")
        return { justifyContent: "flex-start", alignItems: "center" };
      else return { justifyContent: "center", alignItems: "flex-start" };
    case Alignment.TopRight:
      if (direction === "column")
        return { justifyContent: "flex-start", alignItems: "flex-end" };
      else return { justifyContent: "flex-end", alignItems: "flex-start" };
    case Alignment.MiddleLeft:
      if (direction === "column")
        return { justifyContent: "center", alignItems: "flex-start" };
      else return { justifyContent: "flex-start", alignItems: "center" };
    case Alignment.MiddleCenter:
      return { justifyContent: "center", alignItems: "center" };
    case Alignment.MiddleRight:
      if (direction === "column")
        return { justifyContent: "center", alignItems: "flex-end" };
      else return { justifyContent: "flex-end", alignItems: "center" };
    case Alignment.BottomLeft:
      if (direction === "column")
        return { justifyContent: "flex-end", alignItems: "flex-start" };
      else return { justifyContent: "flex-start", alignItems: "flex-end" };
    case Alignment.BottomCenter:
      if (direction === "column")
        return { justifyContent: "flex-end", alignItems: "center" };
      return { justifyContent: "center", alignItems: "flex-end" };
    case Alignment.BottomRight:
      return { justifyContent: "flex-end", alignItems: "flex-end" };
    case Alignment.TopSpaced:
      return { justifyContent: "space-between", alignItems: "flex-start" };
    case Alignment.BottomSpaced:
      return { justifyContent: "space-between", alignItems: "flex-end" };
    case Alignment.LeftSpaced:
      return { justifyContent: "space-between", alignItems: "flex-start" };
    case Alignment.CenterSpaced:
      return { placeContent: "space-between", alignItems: "center" };
    case Alignment.RightSpaced:
      return { justifyContent: "space-between", alignItems: "flex-end" };
    case Alignment.MiddleSpaced:
      return { justifyContent: "space-between", alignItems: "center" };
  }

  return {};
};
