// 576. Out of Boundary Paths https://leetcode.com/problems/out-of-boundary-paths
// TODO: refactor to make simpler, revise modulo applications, study complexity.

interface Position {
  m: number;
  n: number;
}

type Memo = Record<string, number>;

const genMemoKey = (pos: Position, remainingMoves: number) =>
  `${pos.m}-${pos.n}-${remainingMoves}`;

const moveActions = Object.values({
  left: ({ m, n }: Position) => ({
    m: m - 1,
    n,
  }),
  right: ({ m, n }: Position) => ({
    m: m + 1,
    n,
  }),
  top: ({ m, n }: Position) => ({
    m,
    n: n + 1,
  }),
  bottom: ({ m, n }: Position) => ({
    m,
    n: n - 1,
  }),
});

const isOut = (pos: Position, boundaries: Position) =>
  pos.m < 0 || pos.n < 0 || pos.m >= boundaries.m || pos.n >= boundaries.n;

const modulo = 10 ** 9 + 7;

const findRecursive = (
  bound: Position,
  pos: Position,
  maxMove: number,
  memo: Memo,
): number => {
  const memoKey = genMemoKey(pos, maxMove);
  if (memoKey in memo) return memo[memoKey];
  let exits = 0;
  // First we explore next cell, then current (DFS)
  moveActions.forEach((move) => {
    const newPos = move(pos);
    if (isOut(newPos, bound)) {
      exits++;
    } else if (maxMove - 1 > 0) {
      exits += findRecursive(bound, newPos, maxMove - 1, memo) % modulo;
    }
  });
  memo[memoKey] = exits;
  return exits % modulo;
};

function findPaths(
  m: number,
  n: number,
  maxMove: number,
  startRow: number,
  startColumn: number,
): number {
  if (maxMove < 1) return 0;

  const result = findRecursive(
    { m, n },
    { m: startRow, n: startColumn },
    maxMove,
    {},
  );

  return result % modulo;
}
