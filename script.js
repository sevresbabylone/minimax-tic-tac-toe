window.document.addEventListener('DOMContentLoaded', function () {
  var paths = document.querySelectorAll('.tic-tac-toe-line')
  var circles = document.querySelectorAll('.tic-tac-toe-nought')
  var crossesRight = document.querySelectorAll('.tic-tac-toe-cross-right')
  var crossesLeft = document.querySelectorAll('.tic-tac-toe-cross-left')
  var cells = document.getElementsByClassName('tic-tac-toe-cell')
  var restartButton = document.querySelector('.restart-button')

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

  var board = [null, null, null, null, null, null, null, null]
  var currentPlayer = 'x'
  var currentNoOfTurns = 1

  newBoard()

  paths.forEach(function (path) {
    drawLine(path, '0')
  })
  restartButton.addEventListener('click', function () {
    drawBoard()
  }, false)

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

  function drawCross (leftStroke, rightStroke) {
    drawLine(leftStroke, '0')
    drawLine(rightStroke, '0.3s')
  }
  function drawNought (circle) {
    drawLine(circle, '0')
  }
  function drawBoard () {
    paths.forEach(function (path) {
      redrawLine(path, '120')
      drawLine(path, '0')
      var symbols = document.querySelectorAll('.tic-tac-toe-cross-left, .tic-tac-toe-cross-right, .tic-tac-toe-nought')
      symbols.forEach(function (symbol) {
        redrawLine(symbol, '130')
      })
      newBoard()
    })
  }
  function displayWinner (winningCombination, winner) {
    // Display a stroke through winning combination
    // Stroke shrinks inwards towards central cell
    // Winning pieces Move towards central winning cell
    // entire animation shifts towards centre
    // central piece becomes bigger, other pieces and stroke, and board fade out
    // display another SVG stating X or O WINNER! on top of it
    // after fade, switch out to old strokeDashoffset

  }

  function removeEventListenersFromCells () {
    Array.prototype.forEach.call(cells, function (cell) {
      cell.removeEventListener('click', addMove)
    })
  }
  function newBoard () {
    board = [null, null, null, null, null, null, null, null]
    currentPlayer = 'x'
    currentNoOfTurns = 1
    Array.prototype.forEach.call(cells, function (cell) {
      cell.removeEventListener('click', addMove)
      cell.addEventListener('click', addMove)
    })
  }
  function addMove (event) {
    event.currentTarget.removeEventListener('click', addMove)
    var position = event.currentTarget.getAttribute('position')
    if (currentPlayer === 'x') {
      drawCross(crossesLeft[position], crossesRight[position])
      board[position] = 'x'
    } else {
      drawNought(circles[position])
      board[position] = 'o'
    }
    checkWin()
    ++currentNoOfTurns
    switchPlayer()
  }

  function switchPlayer () {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
  }

  function checkWin () {
    var winningCombination = null
    // Array.prototype.some for short-circuiting
    var isWon = WINNING_COMBINATIONS.some(function (combination) {
      winningCombination = combination
      return board[combination[0]] === board[combination[1]] &&
             board[combination[1]] === board[combination[2]] &&
             board[combination[0]] !== null
    })
    if (isWon) {
      removeEventListenersFromCells()
      displayWinner(winningCombination, board[winningCombination[0]])
      // window.setTimeout(drawBoard, 2000)
    } else if (currentNoOfTurns == 9) {
      removeEventListenersFromCells()
      // window.setTimeout(drawBoard, 2000)
    }
  }

})
