import css from './Card.module.css';
import { DetailedHTMLProps, ImgHTMLAttributes, memo, SourceHTMLAttributes } from 'react';

type ImageWithSrcSet = {
	src: string;
	srcSet: string;
	type: SourceHTMLAttributes<HTMLSourceElement>['type'];
};

export type CardProps = {
	image?: string | ImageWithSrcSet | null;
	alt?: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Card = memo(
	function Card({ image, alt, ...rest }: CardProps) {
		return (
			<div className={css.card}>
				<picture>
					{typeof image === 'object' && image !== null && (
						<source srcSet={image.srcSet} type={image.type} />
					)}
					<img
						className={css.image}
						src={typeof image === 'object' && image !== null ? image.src : image || undefined}
						alt={alt}
						loading="eager"
						decoding="async"
						fetchPriority="high"
						{...rest}
					/>
				</picture>
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison function to prevent unnecessary re-renders
		if (typeof prevProps.image !== typeof nextProps.image) return false;

		if (
			typeof prevProps.image === 'object' &&
			prevProps.image !== null &&
			typeof nextProps.image === 'object' &&
			nextProps.image !== null
		) {
			return (
				prevProps.image.src === nextProps.image.src &&
				prevProps.image.srcSet === nextProps.image.srcSet &&
				prevProps.image.type === nextProps.image.type &&
				prevProps.alt === nextProps.alt
			);
		}
		return prevProps.image === nextProps.image && prevProps.alt === nextProps.alt;
	}
);
