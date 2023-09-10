#include <stdlib.h>

struct ListNode {
  int val;
  struct ListNode *next;
};

struct ListNode* createNode(int val) {
  struct ListNode* node = malloc(sizeof(struct ListNode));
  node->val = val;
  node->next = NULL;
  return node;
}

void appendNode(struct ListNode** tail, struct ListNode* next) {
  (*tail)->next = next;
  *tail = next;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
  int surplus = 0;
  int sum;
  struct ListNode* head = NULL;
  struct ListNode* tail = NULL;
  struct ListNode* temp = NULL;

  while (l1 && l2) {
    sum = surplus + (l1->val + l2->val);
    surplus = sum / 10;
    temp = createNode(sum);
    if (!head) {
      head = temp;
      tail = temp;
    }
    else
      appendNode(tail, temp);

    l1 = l1->next;
    l2 = l2->next;
  } 
  
  if (surplus) {
    sum = surplus;
    if (l1) {
      sum += l1->val;
      l1 = l1->next;
    }
    if (l2) {
      sum += l2->val;
      l2 = l2->next;
    }
    temp = createNode(sum);
    appendNode(tail, temp);
  }

  struct ListNode* trailing = l1 ? l1 : l2;
  while (trailing) {
    appendNode(tail, trailing);
    trailing = trailing->next;
  }
  tail->next = NULL;

  return head;
}