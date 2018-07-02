window.document.addEventListener('DOMContentLoaded', function () {
  var paths = document.querySelectorAll('.tic-tac-toe-line')
  var circles = document.querySelectorAll('.tic-tac-toe-nought')
  var crossesRight = document.querySelectorAll('.tic-tac-toe-cross-right')
  var crossesLeft = document.querySelectorAll('.tic-tac-toe-cross-left')
  var cells = document.getElementsByClassName('tic-tac-toe-cell')
  var restartButton = document.querySelector('.restart-button')
  var ticTacToeBoard = document.querySelector('.tic-tac-toe')
  var ticTacToeTable = document.querySelector('.tic-tac-toe-table')
  var displayMessage = document.querySelector('.display-message')
  var displayWinnerMessage = document.querySelector('.display-winner')
  var displayDrawMessage = document.querySelector('.display-draw')
  var mask = document.querySelector('.mask')

  var WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                              [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  var DISTANCES_FROM_CENTRE = [{ top: 78, left: 78 },
                               { top: 78, left: 0 },
                               { top: 78, left: -78 },
                               { top: 0, left: 78 },
                               { top: 0, left: 0 },
                               { top: 0, left: -78 },
                               { top: -78, left: 78 },
                               { top: -78, left: 0 },
                               { top: -78, left: -78 }]

  var STRIKETHROUGH_DISTANCES_FROM_CENTRE = [{ top: 78, left: 0 },
                                             { top: 0, left: 0 },
                                             { top: -78, left: -0 },
                                             { top: 0, left: 78 },
                                             { top: 0, left: 0 },
                                             { top: 0, left: -78 },
                                             { top: -78, left: 78 },
                                             { top: 0, left: 0 },
                                             { top: 0, left: 0 }]

  var STRIKETHROUGH_COORDINATES = [{x1: '6', y1: '42', x2: '234', y2: '42'},
                                   {x1: '6', y1: '120', x2: '234', y2: '120'},
                                   {x1: '6', y1: '198', x2: '234', y2: '198'},
                                   {x1: '42', y1: '6', x2: '42', y2: '234'},
                                   {x1: '120', y1: '6', x2: '120', y2: '234'},
                                   {x1: '198', y1: '6', x2: '198', y2: '234'},
                                   {x1: '6', y1: '6', x2: '234', y2: '234'},
                                   {x1: '234', y1: '6', x2: '6', y2: '234'}]
  var board = [null, null, null, null, null, null, null, null]
  var currentPlayer = 'x'
  var currentNoOfTurns = 0
  var mode = '2'

  drawBoard()

  restartButton.addEventListener('click', function () {
    drawBoard()
  }, false)

  window.document.getElementsByClassName('player-options').addEventListener('click', function (event) {
   if (event.target && event.target.nodeName === 'li') {
     event.target.getAttribute('value')
   }
 })

  function redrawLine (element, offset) {
    element.style.display = 'none'
    element.style.strokeDashoffset = offset
  }
  function drawLine (element, timingDelay) {
    element.style.display = 'block'
    element.transition = element.style.WebkitTransition = 'none'
    element.getBoundingClientRect()
    element.style.transition = element.style.WebkitTransition =
      'stroke-dashoffset 0.3s linear'
    element.style.transitionDelay = timingDelay
    element.style.strokeDashoffset = '0'
  }

  function shrinkDiagonalLine (element, offset, dashArraySize, dashArrayGap, timingDelay) {
    element.transition = element.style.WebkitTransition = 'none'
    element.style.transition = element.style.WebkitTransition =
      'all 0.4s ease'
    element.style.transitionDelay = timingDelay
    element.style.strokeDasharray = dashArraySize + ' ' + dashArrayGap
    element.style.strokeDashoffset = offset
  }

  function shrinkLine (element, timingDelay, winningCombinationIndex, offset, dashArraySize, dashArrayGap) {
    element.transition = element.style.WebkitTransition = 'none'
    element.style.transition = element.style.WebkitTransition =
      'all 0.4s ease'

    element.style.webkitTransform += 'translate(' + STRIKETHROUGH_DISTANCES_FROM_CENTRE[winningCombinationIndex].left +
    'px,' + STRIKETHROUGH_DISTANCES_FROM_CENTRE[winningCombinationIndex].top + 'px)'
    element.style.strokeDasharray = dashArraySize + ' ' + dashArrayGap
    element.style.strokeDashoffset = offset
  }

  // function drawCross (leftStroke, rightStroke) {
  //   drawLine(leftStroke, '0')
  //   drawLine(rightStroke, '0.3s')
  // }
  // function drawNought (circle) {
  //   drawLine(circle, '0')
  // }
  function drawBoard () {
    paths.forEach(function (path) {
      redrawLine(path, '120')
      drawLine(path, '0')
      var symbols = document.querySelectorAll('.tic-tac-toe-cross-left, .tic-tac-toe-cross-right, .tic-tac-toe-nought')
      symbols.forEach(function (symbol) {
        redrawLine(symbol, '130')
      })
      var strikeThrough = document.getElementById('strikeThrough')
      if ((strikeThrough = document.getElementById('strikeThrough')) !== null) {
        strikeThrough.remove()
      }
      newBoard()
    })
  }
  function shrinkTable () {
    ticTacToeTable.transition = ticTacToeTable.style.WebkitTransition = 'none'
    ticTacToeTable.getBoundingClientRect()
    ticTacToeTable.style.transition = ticTacToeTable.style.WebkitTransition =
      'all 0.6s ease'
    ticTacToeTable.style.webkitTransform += 'scale(0.5)'
  }
  function displayWinner (winningCombination, winner, winningCombinationIndex) {
    // Display a stroke through winning combination
    var strikeThrough = window.document.createElementNS('http://www.w3.org/2000/svg', 'line')
    var strikeThroughColour = winner === 'x' ? '#545454' : '#f2ebd4'
    strikeThrough.setAttribute('id', 'strikeThrough')
    strikeThrough.setAttribute('x1', STRIKETHROUGH_COORDINATES[winningCombinationIndex].x1)
    strikeThrough.setAttribute('y1', STRIKETHROUGH_COORDINATES[winningCombinationIndex].y1)
    strikeThrough.setAttribute('x2', STRIKETHROUGH_COORDINATES[winningCombinationIndex].x2)
    strikeThrough.setAttribute('y2', STRIKETHROUGH_COORDINATES[winningCombinationIndex].y2)
    strikeThrough.setAttribute('stroke', strikeThroughColour)
    strikeThrough.setAttribute('stroke-width', '6')
    strikeThrough.setAttribute('stroke-dasharray', '350')
    strikeThrough.setAttribute('stroke-dashoffset', '350')
    document.querySelector('.tic-tac-toe').appendChild(strikeThrough)
    // Winning pieces move towards central cell
    window.setTimeout(function () {
      drawLine(strikeThrough)
    }, 500)
    winningCombination.forEach(function (winningCellIndex) {
      var winningCell = cells[winningCellIndex]
      winningCell.transition = winningCell.style.WebkitTransition = 'none'
      winningCell.style.transition = winningCell.style.WebkitTransition = 'all 0.35s ease'
      window.setTimeout(function () {
        winningCell.classList.add('winning-cell')
        winningCell.style.webkitTransform += 'translate(' + DISTANCES_FROM_CENTRE[winningCellIndex].left + 'px,' + DISTANCES_FROM_CENTRE[winningCellIndex].top + 'px)'
      }, 1000)
      return winningCell
    })
    // tic tac toe grid shrinks and disappears
    window.setTimeout(function () {
      shrinkTable()
      ticTacToeBoard.transition = ticTacToeBoard.style.WebkitTransition = 'none'
      ticTacToeBoard.style.transition = ticTacToeBoard.style.WebkitTransition =
        'all 0.6s ease'
      ticTacToeBoard.style.opacity = '0'
      ticTacToeBoard.style.webkitTransform += 'scale(0.5)'
      Array.prototype.forEach.call(cells, function (cell, index) {
        if (index !== winningCombination[1]) {
          cell.style.opacity = 0
        }
      })
      // winning display moves up a little
      // display another SVG text saying WINNER! below it
      cells[winningCombination[1]].style.webkitTransform += 'scale(4.5) translateY(-10px)'
      displayWinnerMessage.style.display = 'block'
      displayWinnerMessage.transition = displayWinnerMessage.style.WebkitTransition = 'none'
      displayMessage.style.transition = displayMessage.style.WebkitTransition =
        'all 0.6s ease'
      displayMessage.style.opacity = '1'
      displayMessage.style.webkitTransform += 'translateY(-60px)'
    }, 1500)

      // Stroke shrinks inwards towards central cell of winning combination
      // and moves towards central cell of board
    if (winningCombinationIndex > 5) { // if it's the last two combinations, which are diagonal combinations
      window.setTimeout(function () {
        shrinkDiagonalLine(strikeThrough, '-150', '0', '400', '0')
      }, 1000)
    } else {
      window.setTimeout(function () {
        shrinkLine(strikeThrough, '0.4s', winningCombinationIndex, '-110', '0', '400')
      }, 1000)
    }
  }

  function displayDraw () {
    window.setTimeout(function () {
      shrinkTable()
      ticTacToeBoard.transition = ticTacToeBoard.style.WebkitTransition = 'none'
      ticTacToeBoard.style.transition = ticTacToeBoard.style.WebkitTransition =
        'all 0.6s ease'
      ticTacToeBoard.style.opacity = '0'
      ticTacToeBoard.style.webkitTransform += 'scale(0.5)'
      var crossDrawIndex = 3
      var noughtDrawIndex = 5
      Array.prototype.forEach.call(cells, function (cell, index) {
        if (index !== crossDrawIndex && index !== noughtDrawIndex) {
          cell.style.opacity = 0
        }
      })
      displayDrawMessage.style.display = 'block'
      displayDrawMessage.transition = displayWinnerMessage.style.WebkitTransition = 'none'
      displayMessage.style.transition = displayMessage.style.WebkitTransition =
        'all 0.6s ease'
      displayMessage.style.opacity = '1'
      displayMessage.style.webkitTransform += 'translateY(-60px)'
      var drawCells = [noughtDrawIndex, crossDrawIndex]
      drawCells.forEach(function (drawCellIndex) {
        cells[drawCellIndex].style.webkitTransform += 'translateX(' + DISTANCES_FROM_CENTRE[drawCellIndex].left / 4 + 'px)' + ' scale(2.5)'
      })
    }, 1500)
  }

  function removeEventListenersFromCells () {
    Array.prototype.forEach.call(cells, function (cell) {
      cell.removeEventListener('click', addMove)
      cell.removeEventListener('click', addMoveMinimax)
    })
  }
  function newBoard () {
    board = [null, null, null, null, null, null, null, null]
    currentPlayer = 'x'
    currentNoOfTurns = 0
    ticTacToeBoard.style.webkitTransform = null
    ticTacToeBoard.style.opacity = '1'
    ticTacToeTable.style.opacity = '1'
    ticTacToeTable.style.webkitTransform = null

    displayMessage.style.opacity = '0'
    displayMessage.style.webkitTransform = null
    window.setTimeout(function () {
      displayWinnerMessage.style.display = 'none'
      displayDrawMessage.style.display = 'none'
    }, 200)
    var winningCells = document.getElementsByClassName('winning-cell')
    Array.prototype.forEach.call(winningCells, function (winningCell) {
      winningCell.classList.remove('winning-cell')
    })
    removeEventListenersFromCells()
    if (mode === '1') {
      Array.prototype.forEach.call(cells, function (cell) {
        cell.style.opacity = null
        cell.style.webkitTransform = null
        cell.addEventListener('click', addMove, { once: true })
      })
    } else {
      Array.prototype.forEach.call(cells, function (cell) {
        cell.style.opacity = null
        cell.style.webkitTransform = null
        cell.addEventListener('click', addMoveMinimax, { once: true })
      })
    }
  }

  function addMove (event) {
    var position = event.currentTarget.getAttribute('position')
    if (currentPlayer === 'x') {
      drawCross(crossesLeft[position], crossesRight[position])
      board[position] = 'x'
    } else {
      drawNought(circles[position])
      board[position] = 'o'
    }
    currentNoOfTurns = currentNoOfTurns + 1
    checkWin()
    switchPlayer()
  }

  function addMoveMinimax (event) {
    var position = event.currentTarget.getAttribute('position')
    drawCross(crossesLeft[position], crossesRight[position])
    board[position] = 'x'
    mask.style.display = 'block'
    currentNoOfTurns = currentNoOfTurns + 1
    if (checkWin()) {
      mask.style.display = 'none'
      return
    }
    var bestMove = findBestMove()
    board[bestMove] = 'o'
    drawNought(circles[bestMove])
    currentNoOfTurns = currentNoOfTurns + 1
    checkWin()
    mask.style.display = 'none'
  }

  function switchPlayer () {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
  }

  function checkWin () {
    var winningCombination = null
    // Array.prototype.some short-circuits when a winning combination is found
    var isWon = WINNING_COMBINATIONS.some(function (combination, index) {
      winningCombination = index
      return board[combination[0]] === board[combination[1]] &&
             board[combination[1]] === board[combination[2]] &&
             board[combination[0]] !== null
    })
    if (isWon) {
      removeEventListenersFromCells()
      displayWinner(WINNING_COMBINATIONS[winningCombination], board[WINNING_COMBINATIONS[winningCombination][0]], winningCombination)
    } else if (currentNoOfTurns === 9) {
      displayDraw()
    }
    return isWon
  }
  function evaluate () {
    var winningCombinationIndex
    var isWon = WINNING_COMBINATIONS.some(function (combination, index) {
      winningCombinationIndex = index
      return board[combination[0]] === board[combination[1]] &&
             board[combination[1]] === board[combination[2]] &&
             board[combination[0]] !== null
    })
    if (isWon) {

      if (board[WINNING_COMBINATIONS[winningCombinationIndex][0]] === 'o') {
        return 10
      }
      if (board[WINNING_COMBINATIONS[winningCombinationIndex][0]] === 'x') {
        return -10
      }
    }
    return 0
  }
  function minimax (depth, isMaximisingPlayer) {
    var score = evaluate()
    if (score === 10) return score - depth
    if (score === -10) return score + depth
    if (!board.includes(null)) return 0
    if (isMaximisingPlayer) {
      var maxValue = -10000
      board.forEach(function (cellValue, cellIndex) {
        if (cellValue === null) {
          board[cellIndex] = 'o'
          var cellScore = minimax(depth + 1, false)
          if (maxValue < cellScore) {
            maxValue = cellScore
          }
          board[cellIndex] = null
        }
      })
      return maxValue
    } else {
      var minValue = 10000
      board.forEach(function (cellValue, cellIndex) {
        if (cellValue === null) {
          board[cellIndex] = 'x'
          var cellScore = minimax(depth + 1, true)
          if (minValue > cellScore) {
            minValue = cellScore
          }
          board[cellIndex] = null
        }
      })
      return minValue
    }
  }
  function findBestMove () {
    var bestValue = -10000
    var bestCellIndex = null
    board.forEach(function (cellValue, cellIndex) {
      if (cellValue === null) {
        board[cellIndex] = 'o'
        var bestCellScore = minimax(0, false)
        if (bestValue < bestCellScore) {
          bestValue = bestCellScore
          bestCellIndex = cellIndex
        }
        console.log(bestCellScore)
        board[cellIndex] = null
      }
    })
    return bestCellIndex
  }
})
