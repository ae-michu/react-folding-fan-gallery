import css from './CardWrapper.module.css';
import { type RefCallback, type CSSProperties, memo } from 'react';

interface CardWrapperProps {
	ref?: RefCallback<HTMLDivElement>;
	children?: React.ReactNode;
	isActive?: boolean;
	onShow?: () => void;
	onHide?: () => void;
	overwriteToCenter?: boolean;
	debug?: boolean;
	// css vars
	transitionCssVar?: string;
	zIndexCssVar?: string;
	scaleCssVar?: string;
	indexCssVar?: string;
	cardCountCssVar?: string;
	angleSpanDegreesCssVar?: string;
	circleDiameterPXCssVar?: string;
	anchorHeightPXCssVar?: string;
	cardHeightPXCssVar?: string;
}

/**
 * CardWrapper component is a memoized wrapper for individual cards in the gallery. It handles the display, interaction, and styling of each card based on its active state and provided CSS variables.
 *
 * @param props.ref - A React ref callback for the card wrapper element.
 * @param props.children - The content to be rendered inside the card wrapper.
 * @param props.isActive - A boolean indicating whether the card is currently active.
 * @param props.onShow - A callback function to be called when the card is shown (e.g., on mouse enter or focus).
 * @param props.onHide - A callback function to be called when the card is hidden (e.g., on mouse leave or blur).
 * @param props.overwriteToCenter - A boolean indicating whether to overwrite the default positioning and center the card.
 * @param props.debug - A boolean indicating whether to enable debug mode for additional visual cues.
 * @param props.transitionCssVar - CSS variable for the transition property.
 * @param props.zIndexCssVar - CSS variable for z-index of the card.
 * @param props.scaleCssVar - CSS variable for scale transformation of the card.
 * @param props.indexCssVar - CSS variable for the index of the card in the gallery.
 * @param props.cardCountCssVar - CSS variable for the total number of cards in the gallery.
 * @param props.angleSpanDegreesCssVar - CSS variable for the angle span in degrees for the card's position.
 * @param props.circleDiameterPXCssVar - CSS variable for the diameter of the circle in pixels.
 * @param props.anchorHeightPXCssVar - CSS variable for the anchor height of the card in pixels.
 * @param props.cardHeightPXCssVar - CSS variable for the height of the card in pixels.
 * @returns A memoized React component that renders a card wrapper with the specified properties and styles.
 */
export const CardWrapper = memo(
	function CardWrapper({
		ref,
		children,
		isActive = false,
		onShow = () => {},
		onHide = () => {},
		overwriteToCenter = false,
		debug = false,
		// css vars
		transitionCssVar,
		zIndexCssVar,
		scaleCssVar,
		indexCssVar,
		cardCountCssVar,
		angleSpanDegreesCssVar,
		circleDiameterPXCssVar,
		anchorHeightPXCssVar,
		cardHeightPXCssVar,
	}: CardWrapperProps) {
		function handleKeyDown(e: React.KeyboardEvent) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onShow();
			}
		}

		return (
			<div
				ref={ref}
				className={`${css.cardWrapper} ${overwriteToCenter ? css.overwriteToCenter : ''} ${debug === true ? css.debugAnchorHeight : ''}`
					.trim()
					.replace(/\s+/g, ' ')}
				role="button"
				tabIndex={0}
				aria-pressed={isActive}
				style={
					{
						'--index': indexCssVar,
						'--anchor-height': anchorHeightPXCssVar,
						'--card-height': cardHeightPXCssVar,
						'--transition': transitionCssVar,
						'--z-index': zIndexCssVar,
						'--circle-diameter': circleDiameterPXCssVar,
						'--angle-span-degrees': angleSpanDegreesCssVar,
						'--cards-count': cardCountCssVar,
						'--scale': scaleCssVar,
					} as CSSProperties
				}
				onMouseEnter={onShow}
				onMouseLeave={onHide}
				onFocus={onShow}
				onBlur={onHide}
				onKeyDown={handleKeyDown}
			>
				{children}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.isActive === nextProps.isActive &&
			prevProps.transitionCssVar === nextProps.transitionCssVar &&
			prevProps.zIndexCssVar === nextProps.zIndexCssVar &&
			prevProps.scaleCssVar === nextProps.scaleCssVar &&
			prevProps.indexCssVar === nextProps.indexCssVar &&
			prevProps.cardCountCssVar === nextProps.cardCountCssVar &&
			prevProps.angleSpanDegreesCssVar === nextProps.angleSpanDegreesCssVar &&
			prevProps.circleDiameterPXCssVar === nextProps.circleDiameterPXCssVar &&
			prevProps.anchorHeightPXCssVar === nextProps.anchorHeightPXCssVar &&
			prevProps.cardHeightPXCssVar === nextProps.cardHeightPXCssVar &&
			prevProps.overwriteToCenter === nextProps.overwriteToCenter &&
			prevProps.debug === nextProps.debug
		);
	}
);
