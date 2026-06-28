export type ResolvableCSSHeight = `${number}px` | `${number}%` | `${number}rem`;

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
