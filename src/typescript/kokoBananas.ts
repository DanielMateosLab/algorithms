// 875

function minEatingSpeed(piles: number[], h: number): number {
  const sortedPiles = [...piles].sort((a, b) => b - a);
  const baseRounds = piles.length;
  const availableExtraRounds = h - piles.length;
  const max = sortedPiles[0];

  // TODO: There is a problem because this function ignores the baseRounds
  const getUsedRounds = (k: number) =>
    baseRounds +
    sortedPiles
      .slice(0, availableExtraRounds)
      .map((p) => Math.ceil(p / k - 1))
      .reduce((a, b) => a + b, 0);

  return bisectionSearch({
    min: 1,
    max,
    getUsedRounds: getUsedRounds,
    target: h,
  });
}

interface BSArgs {
  min: number;
  max: number;
  getUsedRounds: (k: number) => number;
  target: number;
}
/** Finds a K that makes the cb return target. */
const bisectionSearch = (args: BSArgs): number => {
  const { min, max, getUsedRounds, target } = args;
  const middle = Math.floor((max + min) / 2);
  const usedRounds = getUsedRounds(middle);

  if (usedRounds === target) return middle;

  // k should be higher
  if (usedRounds > target) {
    const newMin = middle;
    // best case found
    if (newMin > max) return middle;
    return bisectionSearch({ ...args, min: newMin });
  }

  // K should be smaller
  const newMax = middle - 1;
  if (newMax < min) return middle;
  return bisectionSearch({ ...args, max: newMax });
};

// minEatingSpeed([312884470], 312884469);
// minEatingSpeed([3, 6, 7, 11], 8);
minEatingSpeed([30, 11, 23, 4, 20], 6);
