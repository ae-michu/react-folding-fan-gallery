import { resolveCSSHeight } from './resolveCSSHeight';

describe('resolveCSSHeight', () => {
	describe('px', () => {
		it('returns the numeric pixel value', () => {
			expect(resolveCSSHeight('200px', 0)).toBe(200);
		});

		it('handles fractional px values', () => {
			expect(resolveCSSHeight('10.5px', 0)).toBe(10.5);
		});
	});

	describe('rem', () => {
		it('converts rem to px using the root font size', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '16px',
			} as CSSStyleDeclaration);

			expect(resolveCSSHeight('2rem', 0)).toBe(32);
		});

		it('handles fractional rem values', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '16px',
			} as CSSStyleDeclaration);

			expect(resolveCSSHeight('1.5rem', 0)).toBe(24);
		});

		it('uses a different root font size when set', () => {
			vi.spyOn(window, 'getComputedStyle').mockReturnValue({
				fontSize: '20px',
			} as CSSStyleDeclaration);

			expect(resolveCSSHeight('1rem', 0)).toBe(20);
		});
	});

	describe('%', () => {
		it('returns a percentage of the element size', () => {
			expect(resolveCSSHeight('50%', 400)).toBe(200);
		});

		it('handles 100%', () => {
			expect(resolveCSSHeight('100%', 300)).toBe(300);
		});

		it('throws when elementSizePx is NaN', () => {
			expect(() => resolveCSSHeight('50%', NaN)).toThrow(
				'Cannot resolve percentage height without a reference element size in pixels.'
			);
		});
	});
});
