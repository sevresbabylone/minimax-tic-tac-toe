var nodeArray = [null, null, null, null, null, null, null, 3, 5, 6, 9, 1, 2, 0, -1]

function minimax (scoreArray, currentIndex, isMaximisingPlayer, alpha, beta) {
  // if it's a leaf
  if (currentIndex >= Math.floor(nodeArray.length / 2)) {
    scoreArray[currentIndex] = nodeArray[currentIndex]
    return currentIndex
  }

  var leftChildIndex = (2 * currentIndex) + 1
  var rightChildIndex = (2 * currentIndex) + 2
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

console.log('Between 1 and 2, the best move for maximising player to make at position 0 is ' + getBestMove(1, true))

console.log('Between 5 and 6, the best move for minimising player to make at position 2 is ' + getBestMove(2, false))

// expected scoreArray without Alpha Beta Pruning
// [ 5, 5, 0, 5, 9, 2, 0, 3, 5, 6, 9, 1, 2, 0, -1 ]
// expected scoreArray after alpha beta pruning
// [5, 5, 2, 5, 6, 2, null , 3, 5, 6, null, 1, 2, null, null]
