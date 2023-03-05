function twoSum(nums: number[], target: number): number[] {
  let result: number[] = [];
  const hashmap = {} as { [key: number]: number };

  nums.some((n, i) => {
    const compliment = target - n;
    const complimentIndex = hashmap[compliment];
    if (complimentIndex !== undefined) {
      result = [i, complimentIndex];
      return true;
    }
    hashmap[n] = i;
  });

  return result;
}
