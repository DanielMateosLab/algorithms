// 875

function minEatingSpeed(piles: number[], h: number): number {
  const sortedPiles = [...piles].sort((a, b) => b - a);
  const availableExtraRounds = h - piles.length;
  let k =
    sortedPiles[
      availableExtraRounds < piles.length - 1
        ? availableExtraRounds
        : piles.length - 1
    ];

  const kIsValid = () => {
    const usedExtraRounds = sortedPiles
      .slice(0, availableExtraRounds)
      .map((p) => Math.ceil(p / k - 1))
      .reduce((a, b) => a + b, 0);
    return usedExtraRounds <= availableExtraRounds;
  };
  // TODO: used must equal available, so you have to decide when to add or subtract to K

  while (!kIsValid()) {
    k++;
  }

  return k;
}

minEatingSpeed([312884470], 312884469);
