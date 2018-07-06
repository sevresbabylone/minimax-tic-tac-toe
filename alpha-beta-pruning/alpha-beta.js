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
  // if it's a leaf
  if (currentIndex >= Math.floor(nodeArray.length / 2)) {
    scoreArray[currentIndex] = nodeArray[currentIndex]
    return currentIndex
  }

  var leftChildIndex = (2 * currentIndex) + 1
  var rightChildIndex = (2 * currentIndex) + 2
  // console.log('leftChildIndex', leftChildIndex)
  // console.log('rightChildIndex', rightChildIndex)
  var betterIndex
  if (isMaximisingPlayer) {
    minimax(scoreArray, leftChildIndex, !isMaximisingPlayer, alpha, beta)

    alpha = Math.max(alpha, scoreArray[leftChildIndex])
    betterIndex = leftChildIndex
    if (!(beta <= alpha)) {
      minimax(scoreArray, rightChildIndex, !isMaximisingPlayer, alpha, beta)
      betterIndex = scoreArray[leftChildIndex] >= scoreArray[rightChildIndex] ? leftChildIndex : rightChildIndex
    }
  } else {
    minimax(scoreArray, leftChildIndex, !isMaximisingPlayer, alpha, beta)
    beta = Math.min(beta, scoreArray[leftChildIndex])
    betterIndex = leftChildIndex
    if (!(beta <= alpha)) {
      minimax(scoreArray, rightChildIndex, !isMaximisingPlayer, alpha, beta)
      betterIndex = scoreArray[leftChildIndex] < scoreArray[rightChildIndex] ? leftChildIndex : rightChildIndex
    }
  }
  scoreArray[currentIndex] = scoreArray[betterIndex]
  return betterIndex
}

function getBestMove (currentIndex, isMaximisingPlayer) {
  var scoreArray = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  var bestMove = minimax(scoreArray, currentIndex, isMaximisingPlayer, -10000, 10000)
  // console.log(scoreArray)
  return bestMove
}
// throwaway scoreArray
// best move for maximizer at A (0) is to pick B (1)
// [ 5, 5, 0, 5, 9, 2, 0, 3, 5, 6, 9, 1, 2, 0, -1 ]

console.log('Between 1 and 2, the best move for maximising player to make at position 0 is ' + getBestMove(1, true))
// expected scoreArray after alpha beta pruning
// [5, 5, 2, 5, 6, 2, null , 3, 5, 6, null, 1, 2, null, null]
// expected bestMove => 1
console.log('Between 5 and 6, the best move for minimising player to make at position 2 is ' + getBestMove(2, false))
