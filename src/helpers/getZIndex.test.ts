import { getZIndex } from "./getZIndex";

describe("getZIndex", () => {
  it("returns highest z-index for active element", () => {
    const result = getZIndex(2, 5, 2);

    expect(result).toBe(6); // length + 1
  });

  it("calculates z-index based on distance from middle (non-active)", () => {
    // length = 5 → middle = 2
    // i = 0 → distance = 2 → 5 - 2 = 3
    expect(getZIndex(0, 5, 2)).toBe(3);

    // i = 1 → distance = 1 → 5 - 1 = 4
    expect(getZIndex(1, 5, 2)).toBe(4);

    // i = 3 → distance = 1 → 5 - 1 = 4
    expect(getZIndex(3, 5, 2)).toBe(4);

    // i = 4 → distance = 2 → 5 - 2 = 3
    expect(getZIndex(4, 5, 2)).toBe(3);
  });

  it("uses floor for middle index in even-length arrays", () => {
    // length = 4 → middle = 2
    expect(getZIndex(0, 4, 99)).toBe(2); // 4 - |0 - 2| = 2
    expect(getZIndex(1, 4, 99)).toBe(3); // 4 - |1 - 2| = 3
    expect(getZIndex(2, 4, 99)).toBe(4); // 4 - |2 - 2| = 4
    expect(getZIndex(3, 4, 99)).toBe(3); // 4 - |3 - 2| = 3
  });

  it("active index overrides middle-based calculation", () => {
    const length = 7;
    const activeIndex = 1;

    expect(getZIndex(1, length, activeIndex)).toBe(length + 1);
    expect(getZIndex(3, length, activeIndex)).not.toBe(length + 1);
  });

  it("works for single-element list", () => {
    expect(getZIndex(0, 1, 0)).toBe(2); // length + 1
  });

  it("does not return negative z-index values", () => {
    const length = 3;

    for (let i = 0; i < length; i++) {
      const z = getZIndex(i, length, 99);
      expect(z).toBeGreaterThanOrEqual(0);
    }
  });
});