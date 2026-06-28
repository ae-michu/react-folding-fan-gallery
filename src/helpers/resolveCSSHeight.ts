export type ResolvableCSSHeight = `${number}px` | `${number}%` | `${number}rem`;

/**
 * Resolves a CSS height value (in px, %, or rem) to a numeric pixel value.
 * @param height - The CSS height value to resolve.
 * @param elementSizePx - The size of the reference element in pixels (used for percentage heights).
 * @returns The resolved height in pixels.
 * @throws Will throw an error if the height format is invalid or if a percentage height is provided without a valid reference element size.
 */
export const resolveCSSHeight = (height: ResolvableCSSHeight, elementSizePx: number): number => {
	const ROOT_FONT_SIZE =
		typeof window !== 'undefined'
			? parseFloat(getComputedStyle(document.documentElement).fontSize)
			: 16;

	if (!height) throw new Error('Height is required to resolve CSS height.');

	if (height.endsWith('px')) return parseFloat(height);

	if (height.endsWith('rem')) {
		return parseFloat(height) * ROOT_FONT_SIZE;
	}

	if (height.endsWith('%')) {
		if (isNaN(elementSizePx))
			throw new Error(
				'Cannot resolve percentage height without a reference element size in pixels.'
			);
		return (parseFloat(height) / 100) * elementSizePx;
	}

	throw new Error(
		`Invalid height format: ${height}. Must be a string ending with 'px', '%', or 'rem'.`
	);
};
