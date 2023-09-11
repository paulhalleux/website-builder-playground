import React, { ReactElement, ReactNode } from "react";

export function getFirstChildren(children: ReactNode): ReactElement | null {
  const childrenArray = React.Children.toArray(children);
  if (
    childrenArray.length === 0 ||
    childrenArray[0] === null ||
    !React.isValidElement(childrenArray[0])
  ) {
    return null;
  }

  return childrenArray[0];
}
