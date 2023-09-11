import { PopoverAlignment, PopoverPosition } from "./Popover";

const AnimationMap = {
  top: {
    initial: { opacity: 0, bottom: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  bottom: {
    initial: { opacity: 0, top: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  left: {
    initial: { opacity: 0, right: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  right: {
    initial: { opacity: 0, left: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
};

export function getAnimation(
  position: PopoverPosition,
  alignment: PopoverAlignment,
  animate: boolean,
) {
  const animation = AnimationMap[position];
  return {
    ...animation,
    initial: {
      ...animation.initial,
      left:
        alignment === "start"
          ? "0"
          : alignment === "center"
          ? "50%"
          : undefined,
      right: alignment === "end" ? "0" : undefined,
      x: alignment === "start" ? "0" : alignment === "center" ? "-50%" : "0%",
    },
    animate: {
      ...animation.animate,
      transition: animate ? undefined : { duration: 0 },
    },
    exit: {
      ...animation.exit,
      transition: animate ? animation.exit.transition : { duration: 0 },
    },
  };
}
