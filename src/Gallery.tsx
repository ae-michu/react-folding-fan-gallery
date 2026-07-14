import css from './Gallery.module.css';
import { Activity, type CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { MeasurementWrapper } from './components/MeasurementWrapper/MeasurementWrapper';
import { CardWrapper } from './components/CardWrapper/CardWrapper';
import { useGalleryLayout } from './hooks/useGalleryLayout';
import type { CardAnchorHeight } from './hooks/useGalleryResolveCardAnchorHeight';

export interface GalleryProps<T> {
	/** Show the virtual positioning circle and each card's rotation pivot point. Useful while tuning layout values. */
	debug?: boolean;
	/** Data array for the cards. Must contain an **odd** number of items. */
	cards: T[];
	/** Render function called once per card with its data item. Also called once with `undefined` to measure card dimensions — ensure the output has a consistent, data-independent size. */
	renderer: (item?: T) => React.ReactNode;
	/** Diameter of the virtual positioning circle as any CSS length value (e.g. `'80%'`, `'400px'`). Larger values space the cards further apart horizontally. */
	circleSize?: CSSProperties['width'] | CSSProperties['height'];
	/** Angle in degrees over which the cards are distributed. `90` fills a quarter-circle arc, `180` a full semicircle. */
	spreadDegrees?: number;
	/** Distance from the top edge of a card to its rotation pivot, in `px`, `%`, or `rem`. A smaller value fans cards from the top like playing cards in a hand; a larger value opens the fan further at the top. */
	anchorHeight?: CardAnchorHeight;
	/** Scale factor applied to the outermost inactive cards. Cards between the edge and the active card are interpolated between `scaleLow` and `1`. */
	scaleLow?: number;
	/** Scale factor applied to the active (hovered or focused) card. */
	scaleHigh?: number;
	/** When `false`, the container adds `padding-top` so that no card corner extends above its top edge. */
	overflowTop?: boolean;
	/** When `false`, the container increases its `height` so that no card corner extends below its bottom edge. */
	overflowBottom?: boolean;
}

export function Gallery<T>({
	debug = false,
	cards = [],
	renderer,
	circleSize = '80%',
	spreadDegrees = 80,
	anchorHeight = '10%',
	scaleLow = 0.8,
	scaleHigh = 1.2,
	overflowTop = true,
	overflowBottom = true,
}: GalleryProps<T>) {
	const transition = '0.15s cubic-bezier(0.4, 0, 0.2, 1)';

	// guard against empty cards array and non odd number of cards
	if (cards?.length === 0 || cards?.length % 2 === 0) {
		throw new Error(
			'Gallery component requires a non-empty array of cards with an odd number of items.'
		);
	}

	// guard a renderer to be a function
	if (typeof renderer !== 'function') {
		throw new Error('Gallery component requires a renderer function to render the cards.');
	}

	// refs for root container and cards container
	const rootContainerRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);

	// create state to store index of currently pressed / hovered card
	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

	// use calculated gallery layout
	const { cardRef, circleRef, initialCalculationsDone, ...galleryLayoutProps } = useGalleryLayout({
		anchorHeight,
		cardCount: cards.length,
		activeIndex: activeCardIndex,
		spreadDegrees,
		scaleLow,
		scaleHigh,
		initialRootHeight: overflowBottom,
		initialRootPadding: overflowTop,
	});

	// calculate initial CSS variables for each card - these will be updated in the useLayoutEffect below
	const initialCardCssVars: CSSProperties = new Array(cards.length).fill(null).reduce(
		(acc, _, index) => {
			acc[`--card-${index}`] = index;
			acc[`--card-${index}-z-index`] = 0;
			acc[`--card-${index}-scale`] = 1;
			return acc;
		},
		{
			'--card-transition': transition,
			'--card-anchor-height': '0px',
			'--card-card-height': '0px',
			'--card-circle-diameter': '0px',
			'--card-angle-span-degrees': '0deg',
			'--card-cards-count': cards.length,
		} as CSSProperties
	);

	// apply calculated values to the CSS variables for each card - avoids re-rendering of the CardWrapper components when the gallery layout changes
	useLayoutEffect(() => {
		const el = cardsContainerRef.current;
		if (!el) return;

		// set unique css variables for each card§
		new Array(cards.length).fill(null).forEach((_, index) => {
			el.style.setProperty(`--card-${index}`, `${index}`);
			el.style.setProperty(`--card-${index}-z-index`, `${galleryLayoutProps.zIndices[index]}`);
			el.style.setProperty(`--card-${index}-scale`, `${galleryLayoutProps.scales[index]}`);
		});

		// set common css variables for all cards
		el.style.setProperty(`--card-anchor-height`, `${galleryLayoutProps.anchorHeightPX}px`);
		el.style.setProperty(`--card-card-height`, `${galleryLayoutProps.cardHeightPX}px`);
		el.style.setProperty(`--card-circle-diameter`, `${galleryLayoutProps.circleDiameterPX}px`);
		el.style.setProperty(`--card-angle-span-degrees`, `${spreadDegrees}deg`);
		el.style.setProperty(`--card-cards-count`, `${cards.length}`);
	}, [galleryLayoutProps, cards.length, spreadDegrees]);

	// apply calculated root height to the root container - avoids re-rendering of the Gallery component when the gallery layout changes
	useLayoutEffect(() => {
		const el = rootContainerRef.current;
		if (!el) return;

		el.style.height = `${galleryLayoutProps.rootHeight}px`;

		if (!overflowTop) {
			el.style.paddingTop = `${galleryLayoutProps.rootPaddingTop}px`;
		}
	}, [galleryLayoutProps.rootHeight, galleryLayoutProps.rootPaddingTop, overflowTop]);

	return (
		<div ref={rootContainerRef} className={css.root} style={{ transition: transition }}>
			{/* Measure card element offscreen - adds a hidden container with the same size as the parent and renders a sample card inside */}
			<MeasurementWrapper>
				<CardWrapper ref={cardRef}>{renderer()}</CardWrapper>
			</MeasurementWrapper>

			{/* Render hidden (unless debug) half-circle element at center of the container */}
			<MeasurementWrapper>
				<div
					ref={circleRef}
					className={`${css.circle} ${debug ? css.circleDebug : ''}`.trim()}
					style={
						{
							'--top': debug ? `${galleryLayoutProps.anchorHeightPX}px` : '0px',
							'--size': circleSize,
							'--clip-degrees': debug ? spreadDegrees : 0,
						} as CSSProperties
					}
				/>
			</MeasurementWrapper>

			{/* Render cards */}
			<div ref={cardsContainerRef} className={css.cardsContainer} style={initialCardCssVars}>
				<Activity mode={initialCalculationsDone ? 'visible' : 'hidden'}>
					{cards.map((card, index) => (
						<CardWrapper
							key={index}
							indexCssVar={`var(--card-${index})`}
							zIndexCssVar={`var(--card-${index}-z-index)`}
							scaleCssVar={`var(--card-${index}-scale)`}
							anchorHeightPXCssVar={`var(--card-anchor-height)`}
							cardHeightPXCssVar={`var(--card-card-height)`}
							cardCountCssVar={`var(--card-cards-count)`}
							angleSpanDegreesCssVar={`var(--card-angle-span-degrees)`}
							circleDiameterPXCssVar={`var(--card-circle-diameter)`}
							transitionCssVar={`var(--card-transition)`}
							isActive={activeCardIndex === index}
							onShow={() => setActiveCardIndex(index)}
							onHide={() => setActiveCardIndex(null)}
							debug={debug}
						>
							{renderer(card)}
						</CardWrapper>
					))}
				</Activity>
			</div>
		</div>
	);
}
