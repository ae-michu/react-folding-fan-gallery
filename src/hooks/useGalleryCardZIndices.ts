import { useMemo } from 'react';

/**
 * Calculates the z-index for each card in a gallery based on the number of cards and the index of the active card.
 * @param cardCount - The total number of cards in the gallery (must be odd and positive).
 * @param activeIndex - The index of the currently active card.
 * @returns An array of z-index values for each card, where the active card has the highest z-index.
 */
export function useGalleryCardZIndices(
	cardCount: number,
	activeIndex: number | null = null
): number[] {
	const resolvedCardCount = cardCount ?? 0;
	if (resolvedCardCount % 2 === 0 && resolvedCardCount !== 0)
		throw new Error('Card count must be an odd number');
	if (resolvedCardCount < 0) throw new Error('Card count cannot be negative');

	return useMemo(() => {
		if (activeIndex === null || activeIndex === Math.floor(resolvedCardCount / 2)) {
			return Array.from({ length: resolvedCardCount }, (_, index) => {
				const frontCard = Math.floor(resolvedCardCount / 2);
				return index > frontCard ? frontCard - (index - frontCard) : index;
			});
		}

		const longestDistance = Math.max(resolvedCardCount - (activeIndex + 1), activeIndex);

		return Array.from({ length: resolvedCardCount }, (_, index) => {
			const distanceFromActive = Math.abs(index - activeIndex);

			return longestDistance - distanceFromActive;
		});
	}, [resolvedCardCount, activeIndex]);
}
