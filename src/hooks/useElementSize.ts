import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
	type RefCallback,
} from 'react';

type Size = { width: number; height: number };

type Snapshot = Size & { measured: boolean };

const INITIAL_SNAPSHOT: Snapshot = { width: 0, height: 0, measured: false };

function createElementSizeStore() {
	let snapshot = INITIAL_SNAPSHOT;
	const listeners = new Set<() => void>();
	const emitChange = () => {
		listeners.forEach((listener) => listener());
	};
	return {
		getSnapshot: () => snapshot,
		subscribe: (listener: () => void) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		setSnapshot: (width: number, height: number) => {
			if (snapshot.width === width && snapshot.height === height && snapshot.measured) {
				return;
			}
			snapshot = { width, height, measured: true };
			emitChange();
		},
		reset: () => {
			if (snapshot === INITIAL_SNAPSHOT) {
				return;
			}
			snapshot = INITIAL_SNAPSHOT;
			emitChange();
		},
	};
}

/**
 * Hook to track the size of an HTML element.
 * Measures the element's width and height immediately when the ref is attached (during React's commit phase),
 * then subscribes to future size changes via ResizeObserver.
 * Returns an object containing a ref callback to attach to the element and the current width and height of the element.
 */
export function useElementSize<T extends HTMLElement>(): {
	ref: RefCallback<T>;
	measured: boolean;
} & Size {
	const [store] = useState(createElementSizeStore);
	const observerRef = useRef<ResizeObserver | null>(null);
	const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

	const ref = useCallback<RefCallback<T>>(
		(node) => {
			observerRef.current?.disconnect();
			observerRef.current = null;

			if (!node) {
				store.reset();
				return;
			}

			const rect = node.getBoundingClientRect();
			store.setSnapshot(rect.width, rect.height);

			observerRef.current = new ResizeObserver(([entry]) => {
				const { width, height } = entry.contentRect;
				store.setSnapshot(width, height);
			});

			observerRef.current.observe(node);
		},
		[store]
	);

	useEffect(() => () => observerRef.current?.disconnect(), []);

	return { ref, ...snapshot };
}
