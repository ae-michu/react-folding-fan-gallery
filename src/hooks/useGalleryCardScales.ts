import { useMemo } from 'react';

/**
 * Custom hook to calculate the scale for each gallery card based on the active index.
 *
 * @param cardCount - Total number of cards in the gallery.
 * @param activeIndex - Index of the currently active card, or null if no card is active.
 * @param scaleLow - Minimum scale value for the cards.
 * @param scaleHigh - Maximum scale value for the active card.
 * @returns An array of scale values for each card.
 */
export function useGalleryCardScales(
	cardCount: number,
	activeIndex: number | null,
	scaleLow: number,
	scaleHigh: number
): number[] {
	return useMemo(() => {
		if (activeIndex === null) {
			const increment = (1 - scaleLow) / Math.floor(cardCount / 2);
			return Array.from({ length: cardCount }, (_, index) => {
				const distanceFromCenter = Math.abs(index - Math.floor(cardCount / 2));
				return Math.round((1 - increment * distanceFromCenter) * 100) / 100;
			});
		}

		const longestDistance = Math.max(cardCount - (activeIndex + 1), activeIndex);
		const increment = (1 - scaleLow) / (longestDistance > 0 ? longestDistance : 1);

		return Array.from({ length: cardCount }, (_, index) => {
			if (index === activeIndex) return scaleHigh;
			const distanceFromActive = Math.abs(index - activeIndex);
			return Math.round((1 - increment * distanceFromActive) * 100) / 100;
		});
	}, [cardCount, activeIndex, scaleLow, scaleHigh]);
}
