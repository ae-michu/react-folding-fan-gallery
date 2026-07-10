import { renderHook } from '@testing-library/react';
import { useGalleryCardZIndices } from './useGalleryCardZIndices';

describe('useGalleryCardZIndices', () => {
	it('returns an empty array when card count is zero', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(0, null));
		expect(result.current).toEqual([]);
	});

	it('throws an error when card count is negative', () => {
		expect(() => renderHook(() => useGalleryCardZIndices(-1, null))).toThrow(
			'Card count cannot be negative'
		);
	});

	it('throws an error when card count is even', () => {
		expect(() => renderHook(() => useGalleryCardZIndices(4, null))).toThrow(
			'Card count must be an odd number'
		);
	});

	it("doesn't throw an error when active card is undefined", () => {
		const { result } = renderHook(() => useGalleryCardZIndices(0, undefined as unknown as number));
		expect(result.current).toEqual([]);
	});

	it("doesn't throw an error when card count is undefined", () => {
		const { result } = renderHook(() =>
			useGalleryCardZIndices(undefined as unknown as number, null)
		);
		expect(result.current).toEqual([]);
	});

	it("doesn't throw an error when card count is null", () => {
		const { result } = renderHook(() => useGalleryCardZIndices(null as unknown as number, null));
		expect(result.current).toEqual([]);
	});

	it('returns an array of indices for each card when no active index is provided (5 cards)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, null));
		expect(result.current).toEqual([0, 1, 2, 1, 0]);
	});

	it('returns an array of indices for each card when no active index is provided (7 cards)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(7, null));
		expect(result.current).toEqual([0, 1, 2, 3, 2, 1, 0]);
	});

	it('returns an array of indices for each card based on the active index (active center)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, 2));
		expect(result.current).toEqual([0, 1, 2, 1, 0]);
	});

	it('returns an array of indices for each card based on the active index (active first)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, 0));
		expect(result.current).toEqual([4, 3, 2, 1, 0]);
	});

	it('returns an array of indices for each card based on the active index (active last)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, 4));
		expect(result.current).toEqual([0, 1, 2, 3, 4]);
	});

	it('returns an array of indices for each card based on the active index (active second)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, 1));
		expect(result.current).toEqual([2, 3, 2, 1, 0]);
	});

	it('returns an array of indices for each card based on the active index (active second to last)', () => {
		const { result } = renderHook(() => useGalleryCardZIndices(5, 3));
		expect(result.current).toEqual([0, 1, 2, 3, 2]);
	});
});
