import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  const callbackRef = useRef(listener);

  useEffect(() => {
    callbackRef.current = listener;
  }, [listener]);

  useEffect(() => {
    window.addEventListener(type, callbackRef.current, options);
    return () => window.removeEventListener(type, callbackRef.current, options);
  }, [type, listener, options]);
}
