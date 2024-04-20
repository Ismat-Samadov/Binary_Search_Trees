# Node class for creating nodes in the tree
class Node
  include Comparable

  attr_accessor :data, :left, :right

  def initialize(data)
    @data = data
    @left = nil
    @right = nil
  end

  def <=>(other)
    @data <=> other.data
  end
end

# Tree class for creating and managing the binary search tree
class Tree
  attr_accessor :root

  def initialize(array)
    @root = build_tree(array.uniq.sort)
  end

  # Build a balanced binary search tree from a sorted array
  def build_tree(array)
    return nil if array.empty?

    mid = (array.length - 1) / 2
    root = Node.new(array[mid])

    root.left = build_tree(array[0...mid])
    root.right = build_tree(array[mid + 1..-1])

    root
  end

  # Insert a value into the tree
  def insert(value, node = @root)
    return Node.new(value) unless node

    if value < node.data
      node.left = insert(value, node.left)
    elsif value > node.data
      node.right = insert(value, node.right)
    end

    node
  end

  # Delete a value from the tree
  def delete(value, node = @root)
    return nil unless node

    if value < node.data
      node.left = delete(value, node.left)
    elsif value > node.data
      node.right = delete(value, node.right)
    else
      return node.right unless node.left
      return node.left unless node.right

      temp = min_value_node(node.right)
      node.data = temp.data
      node.right = delete(temp.data, node.right)
    end

    node
  end

  # Find a node with a given value
  def find(value, node = @root)
    return nil unless node

    if value < node.data
      find(value, node.left)
    elsif value > node.data
      find(value, node.right)
    else
      node
    end
  end

  # Perform a level order traversal of the tree
  def level_order
    return [] unless @root

    queue = [@root]
    result = []

    until queue.empty?
      current = queue.shift
      result << current.data

      queue << current.left if current.left
      queue << current.right if current.right
    end

    block_given? ? result.each { |data| yield data } : result
  end

  # Perform an inorder traversal of the tree
  def inorder(node = @root, &block)
    return [] unless node

    inorder(node.left, &block) + [node.data] + inorder(node.right, &block)
  end

  # Perform a preorder traversal of the tree
  def preorder(node = @root, &block)
    return [] unless node

    [node.data] + preorder(node.left, &block) + preorder(node.right, &block)
  end

  # Perform a postorder traversal of the tree
  def postorder(node = @root, &block)
    return [] unless node

    postorder(node.left, &block) + postorder(node.right, &block) + [node.data]
  end

  # Get the height of a node in the tree
  def height(node = @root)
    return -1 unless node

    [height(node.left), height(node.right)].max + 1
  end

  # Get the depth of a node in the tree
  def depth(value, node = @root)
    return 0 unless node

    if value < node.data
      1 + depth(value, node.left)
    elsif value > node.data
      1 + depth(value, node.right)
    else
      0
    end
  end

  # Check if the tree is balanced
  def balanced?(node = @root)
    return true unless node

    left_height = height(node.left)
    right_height = height(node.right)
    (left_height - right_height).abs <= 1 && balanced?(node.left) && balanced?(node.right)
  end

  # Rebalance the tree
  def rebalance
    @root = build_tree(inorder)
  end

  private

  # Get the minimum value node in the tree
  def min_value_node(node)
    current = node
    current = current.left while current.left
    current
  end
end

# Driver script
def driver_script
  # Create a binary search tree from an array of random numbers
  array = Array.new(15) { rand(1..100) }
  tree = Tree.new(array)

  puts 'Original Tree:'
  puts '---------------------'
  puts 'Balanced? :', tree.balanced?
  puts 'Level order:', tree.level_order
  puts 'Preorder:', tree.preorder
  puts 'Inorder:', tree.inorder
  puts 'Postorder:', tree.postorder
  puts '---------------------'

  # Unbalance the tree by adding several numbers > 100
  array = Array.new(10) { rand(101..200) }
  array.each { |num| tree.insert(num) }

  puts 'Tree after unbalancing:'
  puts '---------------------'
  puts 'Balanced? :', tree.balanced?
  puts 'Level order:', tree.level_order
  puts 'Preorder:', tree.preorder
  puts 'Inorder:', tree.inorder
  puts 'Postorder:', tree.postorder
  puts '---------------------'

  # Balance the tree
  tree.rebalance

  puts 'Tree after rebalancing:'
  puts '---------------------'
  puts 'Balanced? :', tree.balanced?
  puts 'Level order:', tree.level_order
  puts 'Preorder:', tree.preorder
  puts 'Inorder:', tree.inorder
  puts 'Postorder:', tree.postorder
  puts '---------------------'
end

# Run the driver script
driver_script if __FILE__ == $PROGRAM_NAME
