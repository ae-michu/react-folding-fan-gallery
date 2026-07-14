import { renderHook } from '@testing-library/react';
import { useGalleryRootLayout } from './useGalleryRootLayout';

// Shared baseline: circleHeight=200 → radius=100, spread=90°, cardHeight=100, cardWidth=50, anchorHeightPX=50
// Center card sits at θ=−π/2 (top of arc), outer cards at θ=−3π/4 and θ=−π/4 (tilted ±45°)

describe('useGalleryRootLayout', () => {
	describe('height', () => {
		it('outer tilted cards determine height when all scales are equal', () => {
			// Outer card (±45°, scale=1) lowest corner: yOrigin + scale*(halfW*|sinR| + belowAnchor*cosR)
			// = (150 − 50√2) + 1*(25*(√2/2) + 50*(√2/2)) = 150 − 25√2/2 = 150 − 12.5√2
			const { result } = renderHook(() => useGalleryRootLayout(90, 100, 50, 200, 50, [1, 1, 1]));
			expect(result.current.height).toBeCloseTo(150 - 12.5 * Math.SQRT2, 2);
		});

		it('a scaled-up center card determines height when it exceeds the outer cards', () => {
			// Center card (rotation=0, scale=2): maxY = anchorHeightPX + scale*belowAnchor = 50 + 2*50 = 150
			// Outer cards (scale=1) peak at ≈132.32, so center dominates
			const { result } = renderHook(() => useGalleryRootLayout(90, 100, 50, 200, 50, [1, 2, 1]));
			expect(result.current.height).toBeCloseTo(150, 2);
		});

		it('height grows with a larger circle', () => {
			const { result: small } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, [1, 1, 1])
			);
			const { result: large } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 400, 50, [1, 1, 1])
			);
			expect(large.current.height).toBeGreaterThan(small.current.height);
		});

		it('height grows with a wider spread', () => {
			const { result: narrow } = renderHook(() =>
				useGalleryRootLayout(45, 100, 50, 200, 50, [1, 1, 1])
			);
			const { result: wide } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, [1, 1, 1])
			);
			expect(wide.current.height).toBeGreaterThan(narrow.current.height);
		});

		it('height grows with taller cards', () => {
			const { result: short } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, [1, 1, 1])
			);
			const { result: tall } = renderHook(() =>
				useGalleryRootLayout(90, 200, 50, 200, 100, [1, 1, 1])
			);
			expect(tall.current.height).toBeGreaterThan(short.current.height);
		});
	});

	describe('paddingTop', () => {
		it('returns 0 when no card extends above y=0 (uniform scale=1)', () => {
			// Center card top Y = anchorHeightPX − scale*anchorHeightPX = 50 − 50 = 0, never negative
			const { result } = renderHook(() => useGalleryRootLayout(90, 100, 50, 200, 50, [1, 1, 1]));
			expect(result.current.paddingTop).toBe(0);
		});

		it('returns the extent above y=0 when the center card is scaled beyond 1', () => {
			// Center card (rotation=0, scale=2): topY = anchorHeightPX − scale*anchorHeightPX = 50 − 100 = −50
			const { result } = renderHook(() => useGalleryRootLayout(90, 100, 50, 200, 50, [1, 2, 1]));
			expect(result.current.paddingTop).toBeCloseTo(50, 2);
		});

		it('paddingTop increases with a larger anchor height (more card above the pivot)', () => {
			// Larger anchorHeightPX → more card above the pivot → deeper negative Y when scaled up
			const { result: smallAnchor } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 30, [1, 2, 1])
			);
			const { result: largeAnchor } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 70, [1, 2, 1])
			);
			expect(largeAnchor.current.paddingTop).toBeGreaterThan(smallAnchor.current.paddingTop);
		});
	});

	describe('left-right symmetry', () => {
		it('produces the same result when the scale array is reversed (3 cards, asymmetric scales)', () => {
			// Cards i and (N−1−i) sit at the same y and equal |rotation|, so their scale contributions
			// are interchangeable — reversing the array must not change height or paddingTop.
			const scales = [2, 1, 0.8];
			const { result: forward } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, scales)
			);
			const { result: reversed } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, [...scales].reverse())
			);
			expect(forward.current.height).toBeCloseTo(reversed.current.height, 5);
			expect(forward.current.paddingTop).toBeCloseTo(reversed.current.paddingTop, 5);
		});

		it('produces the same result when the scale array is reversed (5 cards, asymmetric scales)', () => {
			const scales = [2, 0.8, 1, 0.9, 1.5];
			const { result: forward } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, scales)
			);
			const { result: reversed } = renderHook(() =>
				useGalleryRootLayout(90, 100, 50, 200, 50, [...scales].reverse())
			);
			expect(forward.current.height).toBeCloseTo(reversed.current.height, 5);
			expect(forward.current.paddingTop).toBeCloseTo(reversed.current.paddingTop, 5);
		});
	});
});
