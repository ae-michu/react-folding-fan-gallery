import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

type Size = {
	width: number;
	height: number;
};

/**
 * Hook to track the size of an HTML element
 * Returns an object containing a ref callback to attach to the element and the current width and height of the element.
 */
export function useElementSize<T extends HTMLElement>(): { ref: Dispatch<SetStateAction<T | null>> } & Size {
  const [node, setNode] = useState<T | null>(null);
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize(prev =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!node || !observerRef.current) return;

    observerRef.current.observe(node);
    return () => observerRef.current?.unobserve(node);
  }, [node]);

	return { ref: setNode, ...size };
}
