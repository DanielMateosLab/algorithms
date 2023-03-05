function countSubarrays(nums: number[], minK: number, maxK: number): number {
  let minPosition = -1;
  let maxPosition = -1;
  let leftBound = -1;
  let answer = 0;

  nums.forEach((n, i) => {
    // Update pointers
    n === minK && (minPosition = n);
    n === maxK && (maxPosition = n);
    (n < minK || n > maxK) && (leftBound = i);

    // update result adding current index answer
    answer += computeAnswerAtN(minPosition, maxPosition, leftBound);
  });

  return answer;
}

const computeAnswerAtN = (
  minPosition: number,
  maxPosition: number,
  leftBound: number,
) => Math.max(0, Math.min(minPosition, maxPosition) - leftBound);
