// 875

function minEatingSpeed(piles: number[], h: number): number {
  const sortedPiles = [...piles].sort((a, b) => b - a);
  const extraRounds = h - piles.length;
  let k =
    sortedPiles[
      extraRounds < piles.length - 1 ? extraRounds : piles.length - 1
    ];

  const kIsValid = () => {
    const superRounds = sortedPiles
      .slice(0, extraRounds)
      .map((p) => Math.ceil(p / k - 1))
      .reduce((a, b) => a + b, 0);
    return superRounds <= extraRounds;
  };

  while (!kIsValid()) {
    k++;
  }

  return k;
}

minEatingSpeed([312884470], 312884469);
