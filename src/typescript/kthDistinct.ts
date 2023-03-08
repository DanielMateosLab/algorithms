function kthDistinct(arr: string[], k: number): string {
  const records: { [key: string]: number } = {};
  arr.forEach((s) => {
    records[s] = records[s] + 1 || 1;
  });

  const distinctStrings: string[] = [];
  arr.forEach((item) => records[item] === 1 && distinctStrings.push(item));

  return distinctStrings[k - 1] || "";
}
