/**
 * Calculates the z-index for an element based on its index, the total number of elements, and the active index.
 * The active element is given the highest z-index, while other elements are assigned z-indices based on their distance from the middle of the list.
 * This creates a visual stacking effect where the active element appears on top, and elements further from the middle appear behind.
*/
export const getZIndex = (i: number, length: number, activeIndex: number): number => {
  const middle = Math.floor(length / 2);

  if (i === activeIndex) return length + 1;

  return length - Math.abs(i - middle);
};