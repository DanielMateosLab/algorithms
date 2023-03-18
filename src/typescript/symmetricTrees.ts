// 101

/** Definition for a binary tree node. */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

type Level = Array<TreeNode | null>;
type NullableNode = TreeNode | null;

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;
  let left: Level = [root.left];
  let right: Level = [root.right];
  let isSymmetric = isSymmetricLevel(left, right);
  while (isSymmetric && left.length) {
    left = nextLevel(left);
    right = nextLevel(right);
    isSymmetric = isSymmetricLevel(left, right);
  }
  return isSymmetric;
}

function isSymmetricRecursive(root: TreeNode | null) {
  if (!root) return true;
  return isSymmetricAux(root.left, root.right);
}
function isSymmetricAux(left: NullableNode, right: NullableNode): boolean {
  if (!left && !right) return true;
  if (!left || !right || right.val !== left.val) return false;
  return (
    isSymmetricAux(left.left, right.right) &&
    isSymmetricAux(left.right, right.left)
  );
}

function isSymmetricLevel(left: Level, right: Level) {
  if (left.length !== right.length) return false;
  for (const [i, leftNode] of left.entries()) {
    const rightNode = right[right.length - 1 - i];
    if (leftNode?.val !== rightNode?.val) return false;
  }
  return true;
}

function nextLevel(level: Level) {
  return level.flatMap((node) => (node ? [node.left, node.right] : []));
}

isSymmetric(
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(3), new TreeNode(4)),
    new TreeNode(2, new TreeNode(4), new TreeNode(3)),
  ),
);
