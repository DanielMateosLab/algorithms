const mergeSort = (nums: number[]): number[] => {
  if (nums.length < 2) return [...nums];

  const middle = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, middle));
  const right = mergeSort(nums.slice(middle));
  return merge(left, right);
};

const merge = (listA: number[], listB: number[]) => {
  const sorted: number[] = [];
  let iA = 0,
    iB = 0;

  // While there are items left in both lists...
  while (iA < listA.length && iB < listB.length) {
    const firstA = listA[iA];
    const firstB = listB[iB];

    if (firstA < firstB) {
      sorted.push(firstA);
      iA++;
    } else {
      sorted.push(firstB);
      iB++;
    }
  }

  // Push remaining items. There will be items only in one list, and they will be already sorted
  sorted.push(...listA.slice(iA), ...listB.slice(iB));

  return sorted;
};
