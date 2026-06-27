import { renderHook, act } from "@testing-library/react";
import { useElementSize } from "./useElementSize";
import { createResizeObserverMock } from "../../mocks/resizeObserver";

describe("useElementSize", () => {
    const { ResizeObserverMock, trigger } = createResizeObserverMock();
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);

	it("returns initial size", () => {
		const { result } = renderHook(() => useElementSize());

		expect(result.current.width).toBe(0);
		expect(result.current.height).toBe(0);
		expect(result.current.ref).toBeDefined();
	});

    it("updates size from ResizeObserver", () => {
        const { result } = renderHook(() => useElementSize());

        act(() => {
            trigger(300, 150);
        });

        expect(result.current.width).toBe(300);
        expect(result.current.height).toBe(150);
    });
});