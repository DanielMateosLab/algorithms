// 23

/** Definition for singly-linked list. */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
const convertToArray = (node: ListNode | null): number[] =>
  node ? [node.val, ...convertToArray(node.next)] : [];

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const arrayList = lists.flatMap(convertToArray).sort((a, b) => a - b);
  let result: ListNode | null = null;
  for (let index = arrayList.length; index >= 0; index--) {
    const element = arrayList[index];
    if (element !== undefined) {
      result = new ListNode(element, result);
    }
  }
  return result;
}
