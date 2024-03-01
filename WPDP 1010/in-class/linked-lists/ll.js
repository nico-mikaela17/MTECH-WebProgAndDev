class Node {
  constructor(val) {
      this.val = val
      this.next = null
  }
}

function sumOfLinkedListNodes(head) {
  let sum = 0;
  let current = head;

  while (current !== null) {
    sum += current.val;
    current = current.next;
  }

  return sum;
}

function reverseList(head){
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev; // New head of the reversed list
}

const n1 = new Node(0)
const n2 = new Node(1)
const n3 = new Node(2)

n1.next = n2
n2.next = n3


let totalSum = sumOfLinkedListNodes(n1);
console.log("Sum of all elements in the linked list:", totalSum);

const reversedHead = reverseList(n1);
console.log("Reversed list:", reversedHead); 