// Node class representing each node in the BST
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Tree class representing the binary search tree
class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // Function to build a balanced binary search tree from an array
    buildTree(array) {
        if (array.length === 0) return null;

        const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

        const buildSubTree = (arr, start, end) => {
            if (start > end) return null;

            const mid = Math.floor((start + end) / 2);
            const node = new Node(arr[mid]);

            node.left = buildSubTree(arr, start, mid - 1);
            node.right = buildSubTree(arr, mid + 1, end);

            return node;
        };

        return buildSubTree(sortedArray, 0, sortedArray.length - 1);
    }

    // Function to insert a value into the BST
    insert(value) {
        const insertNode = (node, value) => {
            if (node === null) return new Node(value);

            if (value < node.data) {
                node.left = insertNode(node.left, value);
            } else if (value > node.data) {
                node.right = insertNode(node.right, value);
            }

            return node;
        };

        this.root = insertNode(this.root, value);
    }

    // Function to delete a value from the BST
    delete(value) {
        const deleteNode = (node, value) => {
            if (node === null) return null;

            if (value < node.data) {
                node.left = deleteNode(node.left, value);
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value);
            } else {
                if (node.left === null && node.right === null) {
                    return null;
                } else if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }

                const minRight = findMin(node.right);
                node.data = minRight.data;
                node.right = deleteNode(node.right, minRight.data);
            }

            return node;
        };

        const findMin = (node) => {
            while (node.left !== null) {
                node = node.left;
            }
            return node;
        };

        this.root = deleteNode(this.root, value);
    }

    // Function to find a node with a given value
    find(value) {
        const findNode = (node, value) => {
            if (node === null) return null;

            if (value === node.data) {
                return node;
            } else if (value < node.data) {
                return findNode(node.left, value);
            } else {
                return findNode(node.right, value);
            }
        };

        return findNode(this.root, value);
    }

    // Function to traverse the tree in breadth-first level order
    levelOrder(callback) {
        if (!this.root) return [];

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }

            if (callback) {
                callback(node);
            }
        }

        return result;
    }

    // Function to perform in-order traversal of the tree
    inOrder(callback) {
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                if (callback) callback(node);
                traverse(node.right);
            }
        };

        traverse(this.root);
    }

    // Function to perform pre-order traversal of the tree
    preOrder(callback) {
        const traverse = (node) => {
            if (node !== null) {
                if (callback) callback(node);
                traverse(node.left);
                traverse(node.right);
            }
        };

        traverse(this.root);
    }

    // Function to perform post-order traversal of the tree
    postOrder(callback) {
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                if (callback) callback(node);
            }
        };

        traverse(this.root);
    }

    // Function to calculate the height of a given node
    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Function to calculate the depth of a given node
    depth(node) {
        if (node === null) return 0;

        let depth = 0;
        let currentNode = node;

        while (currentNode !== null) {
            depth++;
            currentNode = currentNode.parent;
        }

        return depth;
    }

    // Function to check if the tree is balanced
    isBalanced() {
        const checkBalanced = (node) => {
            if (node === null) return true;

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            if (Math.abs(leftHeight - rightHeight) <= 1 &&
                checkBalanced(node.left) &&
                checkBalanced(node.right)) {
                return true;
            }

            return false;
        };

        return checkBalanced(this.root);
    }

    // Function to rebalance the tree
    rebalance() {
        const nodes = [];
        this.inOrder((node) => nodes.push(node.data));

        this.root = this.buildTree(nodes);
    }
}

// Function to print a tree structure
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Driver script
const getRandomNumbers = (count) => {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * 100));
    }
    return Array.from(numbers);
};

const bst = new Tree(getRandomNumbers(15));
console.log("Is balanced:", bst.isBalanced());
console.log("Level order:");
console.log(bst.levelOrder());
console.log("Pre order:");
bst.preOrder((node) => console.log(node.data));
console.log("Post order:");
bst.postOrder((node)
