import { renderHook, act } from '@testing-library/react';
import { useElementSize } from './useElementSize';
import { createResizeObserverMock } from '../../mocks/resizeObserver';

describe('useElementSize', () => {
	const { ResizeObserverMock, trigger } = createResizeObserverMock();
	vi.stubGlobal('ResizeObserver', ResizeObserverMock);

	function createElement(width: number, height: number) {
		const element = document.createElement('div');
		vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
			width,
			height,
			top: 0,
			left: 0,
			bottom: height,
			right: width,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect);

		return element;
	}

	it('returns initial size', () => {
		const { result } = renderHook(() => useElementSize());

		expect(result.current.width).toBe(0);
		expect(result.current.height).toBe(0);
		expect(result.current.measured).toBe(false);
		expect(result.current.ref).toBeDefined();
	});

	it('measures synchronously when a node is attached', () => {
		const { result } = renderHook(() => useElementSize());
		const element = createElement(120, 80);

		act(() => {
			result.current.ref(element);
		});

		expect(result.current.width).toBe(120);
		expect(result.current.height).toBe(80);
		expect(result.current.measured).toBe(true);
	});

	it('updates size from ResizeObserver', () => {
		const { result } = renderHook(() => useElementSize());
		const element = createElement(120, 80);

		act(() => {
			result.current.ref(element);
		});

		act(() => {
			trigger(300, 150);
		});

		expect(result.current.width).toBe(300);
		expect(result.current.height).toBe(150);
		expect(result.current.measured).toBe(true);
	});
});
