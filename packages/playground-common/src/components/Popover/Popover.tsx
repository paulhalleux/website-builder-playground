import React, {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { getAnimation } from "./animation";

import styles from "./Popover.module.scss";

export type PopoverTrigger = "hover" | "click";
export type PopoverPosition = "top" | "bottom" | "left" | "right";
export type PopoverAlignment = "start" | "center" | "end";
export type PopoverProps = PropsWithChildren<{
  /**
   * The content of the popover.
   */
  content: ReactNode | ((close: () => void) => ReactNode);
  /**
   * The position of the popover.
   */
  position?: PopoverPosition;
  /**
   * The alignment of the popover.
   */
  alignment?: PopoverAlignment;
  /**
   * The delay of the popover.
   */
  delay?: number;
  /**
   * The trigger of the popover.
   */
  trigger?: PopoverTrigger;
  /**
   * Close the popover when clicking outside.
   */
  closeOnClickOutside?: boolean;
  /**
   * The offset of the popover.
   */
  offset?: number;
  /**
   * The style of the popover container.
   */
  containerStyle?: React.CSSProperties;
  /**
   * The class name of the popover container.
   */
  containerClassName?: string;
  /**
   * Whether to disable pointer events on the popover.
   */
  noPointerEvents?: boolean;
  /**
   * The portal container.
   */
  portalContainer?: HTMLElement;
  /**
   * Whether to animate the popover.
   */
  animate?: boolean;
  /**
   * Callback when the popover is closed.
   */
  onClose?: () => void;
  /**
   * Callback when the popover is opened.
   */
  onOpen?: () => void;
}>;

export type PopoverRef = {
  close: () => void;
  focus: () => void;
};

function Popover(
  {
    content,
    children,
    alignment = "center",
    position = "top",
    trigger = "hover",
    closeOnClickOutside = true,
    offset = 5,
    delay = 0,
    containerStyle,
    containerClassName,
    noPointerEvents,
    portalContainer,
    animate = true,
    onOpen,
    onClose,
  }: PopoverProps,
  ref: React.Ref<PopoverRef>,
) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const enterTimout = useRef<NodeJS.Timeout>();
  const exitTimout = useRef<NodeJS.Timeout>();
  const [active, setActive] = useState(false);

  const onMouseLeave = () => {
    if (trigger !== "hover") return;
    if (enterTimout.current) clearTimeout(enterTimout.current);
    exitTimout.current = setTimeout(() => setActive(false), delay);
  };

  const onMouseEnter = () => {
    if (trigger !== "hover") return;
    if (exitTimout.current) clearTimeout(exitTimout.current);
    enterTimout.current = setTimeout(() => setActive(true), delay);
  };

  const onClick = () => {
    if (trigger !== "click") return;
    setActive((prev) => !prev);
  };

  useClickAway(popoverRef, (event) => {
    if (!closeOnClickOutside) return;
    if (contentRef.current?.contains(event.target as Node)) return;
    setActive(false);
  });

  useImperativeHandle(
    ref,
    () => ({
      close: () => setActive(false),
      focus: () => {
        contentRef.current?.focus();
      },
    }),
    [contentRef],
  );

  const PopoverContent = (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          ref={contentRef}
          tabIndex={0}
          className={clsx(
            styles.popover__container,
            styles[`popover--${position}`],
          )}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={() => {
            contentRef.current?.focus();
            if (active) {
              onOpen?.();
            } else {
              onClose?.();
            }
          }}
          variants={getAnimation(position, alignment, animate)}
          style={
            {
              "--offset": `${offset}px`,
              pointerEvents: noPointerEvents ? "none" : "all",
            } as React.CSSProperties
          }
        >
          {typeof content === "function"
            ? content(() => setActive(false))
            : content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={popoverRef}
      className={clsx(styles.popover__wrapper, containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={containerStyle}
    >
      {portalContainer
        ? createPortal(
            <div
              style={{
                position: "absolute",
                top: popoverRef.current?.getBoundingClientRect().top,
                left: popoverRef.current?.getBoundingClientRect().left,
                height: popoverRef.current?.getBoundingClientRect().height,
                width: popoverRef.current?.getBoundingClientRect().width,
              }}
            >
              {PopoverContent}
            </div>,
            portalContainer,
          )
        : PopoverContent}
      <div className={styles.popover__children} onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

const ForwardedPopover = forwardRef(Popover);
ForwardedPopover.displayName = "Popover";

export { ForwardedPopover as Popover };
