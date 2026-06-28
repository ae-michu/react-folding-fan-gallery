import css from './MeasurementWrapper.module.css';

/**
 * A wrapper component that renders its children in a hidden absolute container, allowing for measurement of the children's size without affecting the layout of the page.
 * The children are rendered in a relative container inside the hidden absolute container, so that they can be measured without being visible to the user.
 * The component is aria-hidden to ensure that it is not announced by screen readers.
 */
export const MeasurementWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className={css.hiddenAbsoluteContainer} aria-hidden="true">
		<div className={css.relativeContainer}>{children}</div>
	</div>
);
