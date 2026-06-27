import {
	useEffect,
	useRef,
	useState,
	useLayoutEffect,
	type Dispatch,
	type SetStateAction,
} from 'react';

type Size = {
	width: number;
	height: number;
};

/**
 * Hook to track the size of an HTML element.
 * Measures the element's width and height and updates whenever the element is resized.
 * The measurement is triggered in two stages: an initial synchronous measure on mount with layout effect and subsequent measures via a ResizeObserver API.
 * Returns an object containing a ref callback to attach to the element and the current width and height of the element.
 */
export function useElementSize<T extends HTMLElement>(): {
	ref: Dispatch<SetStateAction<T | null>>;
} & Size {
	const [node, setNode] = useState<T | null>(null);
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });
	const observerRef = useRef<ResizeObserver | null>(null);

	// initial synchronous measure (reduces flicker on first render)
	useLayoutEffect(() => {
		if (!node) return;

		const measure = () => {
			const rect = node.getBoundingClientRect();
			setSize((prev) =>
				prev.width === rect.width && prev.height === rect.height
					? prev
					: { width: rect.width, height: rect.height }
			);
		};

		measure();
	}, [node]);

	// setup observer once
	useLayoutEffect(() => {
		observerRef.current = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize((prev) =>
				prev.width === width && prev.height === height ? prev : { width, height }
			);
		});

		return () => observerRef.current?.disconnect();
	}, []);

	// attach/detach observer to the node
	useEffect(() => {
		if (!node || !observerRef.current) return;

		observerRef.current.observe(node);
		return () => observerRef.current?.unobserve(node);
	}, [node]);

	return { ref: setNode, ...size };
}
