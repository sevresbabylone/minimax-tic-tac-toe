// Alpha-Beta pruning is an optimisation technique for the Minimax algorithm
// It cuts off branches in the game tree which need not be searched because there
// exists already a better move available

// Alpha is the best value that the maximizer currently can guarantee at that level or above.
// Beta is the best value that the minimizer currently can guarantee at that level or above.
// Game Tree (Complete Binary)
//              A               (MAX)
//      B               C       (MIN)
//   D     E         F     G    (MAX)
// 3   5 6   9     1   2 0  -1  (MIN)

// Alpha beta case
// Does not visit 9 (10) or G (6) , 0 (13) or -1(14)
// alpha = max(currentAlphaValue, valueOfNode)
// beta = min(currentBetaValue, valueOfNode)
// if (beta <= alpha), don't bother looking at the other nodes

var nodeArray = [null, null, null, null, null, null, null, 3, 5, 6, 9, 1, 2, 0, -1]

function minimax (scoreArray, currentIndex, isMaximisingPlayer, alpha, beta) {
  if (currentIndex >= Math.floor(nodeArray.length / 2)) {
    scoreArray[currentIndex] = nodeArray[currentIndex]
    return currentIndex
  }
  if (beta <= alpha) {

  }
  var leftChildIndex = (2 * currentIndex) + 1
  var rightChildIndex = (2 * currentIndex) + 2

  // console.log('leftChildIndex', leftChildIndex)
  // console.log('rightChildIndex', rightChildIndex)
  var betterIndex
  if (isMaximisingPlayer) {
    minimax(scoreArray, leftChildIndex, !isMaximisingPlayer, alpha, beta)
    minimax(scoreArray, rightChildIndex, !isMaximisingPlayer, alpha, beta)
    betterIndex = scoreArray[leftChildIndex] >= scoreArray[rightChildIndex] ? leftChildIndex : rightChildIndex
    alpha = Math.max(alpha, scoreArray[betterIndex])
  } else {
    minimax(scoreArray, leftChildIndex, !isMaximisingPlayer, alpha, beta)
    minimax(scoreArray, rightChildIndex, !isMaximisingPlayer, alpha, beta)
    betterIndex = scoreArray[leftChildIndex] < scoreArray[rightChildIndex] ? leftChildIndex : rightChildIndex
    beta = Math.min(beta, scoreArray[betterIndex])
  }
  scoreArray[currentIndex] = scoreArray[betterIndex]
  return betterIndex
}

// throwaway scoreArray
var scoreArray = []
// best move for maximizer at A (0) is to pick B (1)
console.log(minimax(scoreArray, 0, true, -10000, 10000))
