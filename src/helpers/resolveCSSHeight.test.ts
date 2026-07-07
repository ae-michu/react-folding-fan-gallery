import { resolveCSSSize } from './resolveCSSSize';

describe('resolveCSSSize', () => {
	describe('px', () => {
		it('returns the numeric pixel value', () => {
			expect(resolveCSSSize('200px', 0)).toBe(200);
		});

		it('handles fractional px values', () => {
			expect(resolveCSSSize('10.5px', 0)).toBe(10.5);
		});
	});

	describe('rem', () => {
		it('converts rem to px using the root font size', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '16px',
			} as CSSStyleDeclaration);

			expect(resolveCSSSize('2rem', 0)).toBe(32);
		});

		it('handles fractional rem values', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '16px',
			} as CSSStyleDeclaration);

			expect(resolveCSSSize('1.5rem', 0)).toBe(24);
		});

		it('uses a different root font size when set', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '20px',
			} as CSSStyleDeclaration);

			expect(resolveCSSSize('1rem', 0)).toBe(20);
		});
	});

	describe('%', () => {
		it('returns a percentage of the element size', () => {
			expect(resolveCSSSize('50%', 400)).toBe(200);
		});

		it('handles 100%', () => {
			expect(resolveCSSSize('100%', 300)).toBe(300);
		});

		it('throws when elementSizePx is NaN', () => {
			expect(() => resolveCSSSize('50%', NaN)).toThrow(
				'Cannot resolve percentage height without a reference element size in pixels.'
			);
		});
	});
});
