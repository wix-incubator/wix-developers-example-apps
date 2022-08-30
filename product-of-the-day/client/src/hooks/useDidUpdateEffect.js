import { useEffect, useRef } from "react";

// Like useEffect but doesn't run on first render
export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) return fn();
    didMountRef.current = true;
  }, inputs);
}
