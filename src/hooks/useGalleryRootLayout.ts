import { useMemo } from 'react';

/**
 * Calculates padding and height of the gallery root container based on the spread degrees, card height, card width, circle height, anchor height, and card scales.
 * Allows for the gallery bounding box (root) to never be overflowed by the cards, even when they are rotated and scaled.
 * @param spreadDegrees - The angle in degrees that the cards are spread across.
 * @param cardHeight - The height of a single card in pixels.
 * @param cardWidth - The width of a single card in pixels.
 * @param circleHeight - The height of the circle element in pixels.
 * @param anchorHeightPX - The pixel height of the anchor for the card.
 * @param cardScales - The scale values for each card.
 * @returns An object containing the calculated height and padding-top for the gallery root container.
 */
export function useGalleryRootLayout(
	spreadDegrees: number,
	cardHeight: number,
	cardWidth: number,
	circleHeight: number,
	anchorHeightPX: number,
	cardScales: number[]
): {
	height: number;
	paddingTop: number;
} {
	return useMemo(() => {
		const radius = circleHeight / 2;
		const thetaTop = -(Math.PI / 2);
		const alfa = spreadDegrees * (Math.PI / 180);
		const deltaTheta = alfa / (cardScales.length - 1);
		const thetaStart = thetaTop - alfa / 2;

		const maxYValues = cardScales.map((scale, index) => {
			// calculate y position of the card
			const thetaI = thetaStart + deltaTheta * index;
			const y = radius + radius * Math.sin(thetaI);

			// get y origin from top
			const yOriginFromTop = y + anchorHeightPX;

			// calculate rotation in degrees
			const rotation = thetaI * (180 / Math.PI) + 90;

			// from this origin and rotation calculate y position (from top) for each card corner
			const r = rotation * (Math.PI / 180);
			const cosR = Math.cos(r);
			const sinR = Math.sin(r);
			const halfW = cardWidth / 2;
			const aboveAnchor = anchorHeightPX;
			const belowAnchor = cardHeight - anchorHeightPX;

			// dx/dy are corner offsets from the pivot (transform-origin) in pre-rotation space
			const topLeftY = yOriginFromTop + scale * (-halfW * sinR - aboveAnchor * cosR);
			const topRightY = yOriginFromTop + scale * (halfW * sinR - aboveAnchor * cosR);
			const bottomLeftY = yOriginFromTop + scale * (-halfW * sinR + belowAnchor * cosR);
			const bottomRightY = yOriginFromTop + scale * (halfW * sinR + belowAnchor * cosR);

			// return the maximum y position (from top) for each card corner
			return {
				max: Math.max(topLeftY, topRightY, bottomLeftY, bottomRightY),
				min: Math.min(topLeftY, topRightY, bottomLeftY, bottomRightY),
			};
		});

		return {
			height: Math.max(...maxYValues.map((v) => v.max)),
			paddingTop: Math.abs(Math.min(...maxYValues.map((v) => v.min))),
		};
	}, [spreadDegrees, cardHeight, cardWidth, circleHeight, anchorHeightPX, cardScales]);
}
