import { renderHook } from '@testing-library/react';
import { useGalleryResolveCardAnchorHeight } from './useGalleryResolveCardAnchorHeight';

describe('useGalleryResolveCardAnchorHeight', () => {
	it('resolves a px anchor height directly', () => {
		const { result } = renderHook(() => useGalleryResolveCardAnchorHeight(200, '50px'));
		expect(result.current).toBe(50);
	});

	it('resolves a percentage anchor height relative to card height', () => {
		const { result } = renderHook(() => useGalleryResolveCardAnchorHeight(200, '25%'));
		expect(result.current).toBe(50);
	});

	it('resolves a 100% anchor height equal to card height', () => {
		const { result } = renderHook(() => useGalleryResolveCardAnchorHeight(300, '100%'));
		expect(result.current).toBe(300);
	});

	it('resolves a rem anchor height using the root font size (defaults to 16px)', () => {
		vi.spyOn(window, 'getComputedStyle').mockReturnValue({
			fontSize: '16px',
		} as CSSStyleDeclaration);

		const { result } = renderHook(() => useGalleryResolveCardAnchorHeight(200, '2rem'));
		expect(result.current).toBe(32);
	});

	it('updates when cardHeight changes', () => {
		let cardHeight = 200;
		const { result, rerender } = renderHook(() =>
			useGalleryResolveCardAnchorHeight(cardHeight, '50%')
		);
		expect(result.current).toBe(100);

		cardHeight = 400;
		rerender();
		expect(result.current).toBe(200);
	});

	it('updates when anchorHeight changes', () => {
		let anchorHeight: `${number}px` | `${number}%` | `${number}rem` = '50px';
		const { result, rerender } = renderHook(() =>
			useGalleryResolveCardAnchorHeight(200, anchorHeight)
		);
		expect(result.current).toBe(50);

		anchorHeight = '100px';
		rerender();
		expect(result.current).toBe(100);
	});
});
