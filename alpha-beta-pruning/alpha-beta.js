// Alpha-Beta pruning is an optimisation technique for the Minimax algorithm
// It cuts off branches in the game tree which need not be searched because there already
// exists a better move available

// Alpha is the best value that the maximizer currently can guarantee at that level or above.
// Beta is the best value that the minimizer currently can guarantee at that level or above.
// Game Tree (Complete Binary)
//              A               (MAX)
//      B               C       (MIN)
//   D     E         F     G    (MAX)
// 3   5 6   9     1   2 0  -1  (MIN)

var nodeArray = [null, null, null, null, null, null, null, 3, 5, 6, 9, 1, 2, 0, -1]

// best move for maximizer at A (0) is to pick B (1)

function minimax (nodeArray, currentIndex, isMaximisingPlayer) {

  if (currentIndex >= Math.floor(nodeArray.length / 2)) {
    return currentIndex
  }
  var leftChildIndex = (2 * currentIndex) + 1
  var rightChildIndex = (2 * currentIndex) + 2

  if (isMaximisingPlayer) {
    var maxChild = nodeArray[minimax(nodeArray, rightChildIndex, false)] >= nodeArray[minimax(nodeArray, leftChildIndex, false)] ? rightChildIndex : leftChildIndex
    nodeArray[currentIndex] = nodeArray[maxChild]
    return maxChild
  } else {
    return nodeArray[minimax(nodeArray, rightChildIndex, true)] < nodeArray[minimax(nodeArray, leftChildIndex, true)] ? rightChildIndex : leftChildIndex
  }
}

console.log(minimax(nodeArray, 0, true))
