export function createResizeObserverMock() {
	let callback: ResizeObserverCallback;

	class ResizeObserverMock {
		constructor(cb: ResizeObserverCallback) {
			callback = cb;
		}

		observe() {}
		unobserve() {}
		disconnect() {}
	}

	function trigger(width: number, height: number) {
		callback?.([{ contentRect: { width, height } } as ResizeObserverEntry], {} as ResizeObserver);
	}

	return { ResizeObserverMock, trigger };
}
