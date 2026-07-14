import { useElementSize } from './useElementSize';
import {
	type CardAnchorHeight,
	useGalleryResolveCardAnchorHeight,
} from './useGalleryResolveCardAnchorHeight';
import { useGalleryCardZIndices } from './useGalleryCardZIndices';
import { useGalleryCardScales } from './useGalleryCardScales';
import { useGalleryRootLayout } from './useGalleryRootLayout';

type GalleryLayoutProps = {
	// card anchor height in CSS units (px, %, rem)
	anchorHeight: CardAnchorHeight;
	// total number of cards in the gallery
	cardCount: number;
	// index of the currently active card (or null if none)
	activeIndex: number | null;
	// angle in degrees that the cards are spread across
	spreadDegrees: number;
	// minimum scale value for the cards
	scaleLow: number;
	// maximum scale value for the active card
	scaleHigh: number;
	// flag indicating whether to only calculate the initial root height without updating the layout on subsequent renders
	initialRootHeight?: boolean;
	// flag indicating whether to only calculate the initial root padding without updating the layout on subsequent renders
	initialRootPadding?: boolean;
};

type GalleryLayout = {
	// element refs
	// ref for dummy card element (used for measuring card size)
	cardRef: ReturnType<typeof useElementSize<HTMLDivElement>>['ref'];
	// ref for circle element (used for measuring circle size)
	circleRef: ReturnType<typeof useElementSize<HTMLDivElement>>['ref'];
	// pixel height of the anchor for the card
	anchorHeightPX: number;
	// calculated z-index for each card
	zIndices: number[];
	// calculated scale for each card based on the active index
	scales: number[];
	// resolved pixel height for the root container
	rootHeight: number;
	// resolved pixel padding-top for the root container
	rootPaddingTop: number;
	// diameter of the circle in pixels
	circleDiameterPX: number;
	// card height in pixels
	cardHeightPX: number;
	// flag indicating whether the initial calculations are done (i.e., both card and circle measurements are complete)
	initialCalculationsDone: boolean;
};

/**
 * Custom hook to calculate the layout for the gallery component.
 *
 * @param props - The properties required to calculate the gallery layout.
 * @returns The calculated gallery layout including element refs, z-indices, scales, and dimensions.
 */
export function useGalleryLayout(props: GalleryLayoutProps): GalleryLayout {
	// measurement hook for dummy card element
	const {
		ref: cardRef,
		height: cardHeight,
		width: cardWidth,
		measured: cardMeasured,
	} = useElementSize<HTMLDivElement>();

	// measurement hook for circle element
	const {
		ref: circleRef,
		height: circleHeight,
		width: circleWidth,
		measured: circleMeasured,
	} = useElementSize<HTMLDivElement>();

	// calculate pixel height of the anchor for the card
	const anchorHeightPX = useGalleryResolveCardAnchorHeight(cardHeight, props.anchorHeight);

	// calculate z-index for each card
	const zIndices = useGalleryCardZIndices(props.cardCount, props.activeIndex);

	// calculate scale for each card based on the active index
	const initialScales = useGalleryCardScales(
		props.cardCount,
		null,
		props.scaleLow,
		props.scaleHigh
	);
	const scales = useGalleryCardScales(
		props.cardCount,
		props.activeIndex,
		props.scaleLow,
		props.scaleHigh
	);

	// calculate root height
	const { height: initRootHeight, paddingTop: initRootPaddingTop } = useGalleryRootLayout(
		props.spreadDegrees,
		cardHeight,
		cardWidth,
		circleHeight,
		anchorHeightPX,
		initialScales
	);
	const { height: rootHeight, paddingTop: rootPaddingTop } = useGalleryRootLayout(
		props.spreadDegrees,
		cardHeight,
		cardWidth,
		circleHeight,
		anchorHeightPX,
		props.initialRootHeight && props.initialRootPadding ? initialScales : scales
	); // here we insert the initial scales to save some work when user doesn't want to adjust bbox

	return {
		cardRef,
		circleRef,
		anchorHeightPX,
		zIndices,
		scales,
		rootHeight: props.initialRootHeight ? initRootHeight : rootHeight,
		rootPaddingTop: props.initialRootPadding ? initRootPaddingTop : rootPaddingTop,
		circleDiameterPX: circleWidth,
		cardHeightPX: cardHeight,
		initialCalculationsDone: cardMeasured && circleMeasured,
	};
}
