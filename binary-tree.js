'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if(this.isEmpty()) {
			this.root = new Node(data);
		}
		else {
			var node = this.root;
			while(true) {
				if(data < node.data) {
					if(node.left)
						node = node.left;
					else {
						node.left = new Node(data);
						break;
					}
				}
				else if(data > node.data) {
					if(node.right)
						node = node.right;
					else {
						node.right = new Node(data);
						break;
					}
				}
			}
		}
	}

	contains(data) {
		if (this.isEmpty())
			return false;
		var node = this.root;
		while(node) {
			if(data == node.data)
				return true;
			if(data < node.data)
				node = node.left;
			else if(data > node.data)
				node = node.right;
		}
		return false;
	}

	remove(data) {

		var minimum = function(node) {
			if(node.left === null) {
				return node;
			}
			return minimum(node.left);
		};

		var node = this.root,
			parent = this.root;

		while(node) {
			if(data < node.data) {
				parent = node;
				node = node.left;
			}
			else if(data > node.data) {
				parent = node;
				node = node.right;
			}
			else{
				if(node.left && node.right) {
					parent = node;
					node = node.right;
					parent.data = minimum(node).data;
					parent.right = null;
				}
				else if(!node.left && !node.right) {
					if(data < parent.data)
						parent.left = null;
					else if(data > parent.data)
						parent.right = null;
					else this.root = null;
				}
                else {
                    var newNode;
                    {
                        if(node.left && !node.right)
                            newNode = node.left;
                        else if (!node.left && node.right)
                            newNode = node.right;
                    }
                    if(data < parent.data)
                        parent.left = newNode;
                    else parent.right = newNode;

                }
				return true;
			}
		}
	}

	size() {
		if(this.isEmpty())
			return 0;
		var node = this.root;
		var sum = 0;
		var counter = function (node) {
			if (node.left)
				counter(node.left);
			if (node.right)
				counter(node.right);
			sum++;
		};
		counter(node);
		return sum;

	}

	isEmpty() {
		return this.root === null;
	}
}
