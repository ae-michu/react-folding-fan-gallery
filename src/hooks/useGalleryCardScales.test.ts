import { renderHook } from '@testing-library/react';
import { useGalleryCardScales } from './useGalleryCardScales';

describe('useGalleryCardScale', () => {
	it('returns an empty array when card count is zero', () => {
		const { result } = renderHook(() => useGalleryCardScales(0, null, 0.8, 1.2));
		expect(result.current).toEqual([]);
	});

	it('returns an array of scales for each card when no active index is provided', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, null, 0.8, 1.2));
		expect(result.current).toEqual([0.8, 0.9, 1, 0.9, 0.8]);
	});

	it('returns an array of scales for each card based on the active index (active center)', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, 2, 0.8, 1.2));
		expect(result.current).toEqual([0.8, 0.9, 1.2, 0.9, 0.8]);
	});

	it('returns an array of scales for each card based on the active index (left edge second to last)', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, 1, 0.8, 1.2));
		expect(result.current).toEqual([0.93, 1.2, 0.93, 0.87, 0.8]);
	});

	it('returns an array of scales for each card based on the active index (right edge second to last)', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, 3, 0.8, 1.2));
		expect(result.current).toEqual([0.8, 0.87, 0.93, 1.2, 0.93]);
	});

	it('returns an array of scales for each card based on the active index (left edge last)', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, 0, 0.8, 1.2));
		expect(result.current).toEqual([1.2, 0.95, 0.9, 0.85, 0.8]);
	});

	it('returns an array of scales for each card based on the active index (right edge last)', () => {
		const { result } = renderHook(() => useGalleryCardScales(5, 4, 0.8, 1.2));
		expect(result.current).toEqual([0.8, 0.85, 0.9, 0.95, 1.2]);
	});
});
