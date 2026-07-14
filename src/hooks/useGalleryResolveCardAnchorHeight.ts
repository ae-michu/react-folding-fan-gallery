import { useMemo } from 'react';
import { resolveCSSSize } from '../helpers/resolveCSSSize';

export type CardAnchorHeight = `${number}px` | `${number}%` | `${number}rem`;

/**
 * Resolves the height in pixels of a card anchor based on the card's height and the specified anchor height.
 * @param cardHeight - The height of the card in pixels.
 * @param anchorHeight - The height of the anchor in CSS units (px, %, rem).
 * @returns The resolved height of the card anchor in pixels.
 */
export function useGalleryResolveCardAnchorHeight(
	cardHeight: number,
	anchorHeight: CardAnchorHeight
): number {
	return useMemo(() => resolveCSSSize(anchorHeight, cardHeight), [cardHeight, anchorHeight]);
}
