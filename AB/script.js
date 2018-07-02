(function () {
  window.document.addEventListener('DOMContentLoaded', function () {
  // Variables for animation purposes
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
    var lines = document.querySelectorAll('.tic-tac-toe-line')
    var ticTacToeCellTable = document.querySelector('.tic-tac-toe-cell-table')
    var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid')
    var cells = document.getElementsByClassName('tic-tac-toe-cell')
    var noughts = document.querySelectorAll('.tic-tac-toe-nought')
    var crossesRight = document.querySelectorAll('.tic-tac-toe-cross-right')
    var crossesLeft = document.querySelectorAll('.tic-tac-toe-cross-left')
    var winnerMessage = document.querySelector('.winner-message')
    var drawMessage = document.querySelector('.draw-message')

    var session = new Session('1')

    function Session (mode) {
      this.mode = mode
      this.game = new Game(mode)
      drawNewBoard()
    }
    Session.prototype.startNewGame = function (mode) {
      this.mode = mode
      this.game = new Game(this.mode)
      drawNewBoard()
    }
    function Game (mode) {
      this.board = [null, null, null, null, null, null, null, null, null]
      this.currentPlayer = 'x'
      this.mode = mode
      this.currentNoOfTurns = 0
    }
    Game.prototype.addMove = function (cellIndex) {
      console.log('in game add move', cellIndex)
      if (this.currentPlayer === 'x') {
        this.board[cellIndex] = 'x'
      } else {
        this.board[cellIndex] = 'o'
      }
      // Animation needs to know if the game ended in a win or draw
      // if won, animation needs the indexes of the cells in winning combination,
      // the char of winning player and the index of the winning combination (for coordinates)
      var checkWin = this.checkWin()
      if (checkWin.isWon) {
        displayWinner(checkWin.winningCombinationIndex)
      }
      if (this.isDraw()) {
        displayDraw()
      }
      this.switchPlayer()
    }
    Game.prototype.switchPlayer = function () {
      this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x'
    }
    Game.prototype.checkWin = function () {
      var winningCombinationIndex = null
      var self = this
      // Array.prototype.some short-circuits when a winning combination is found
      var isWon = WINNING_COMBINATIONS.some(function (combination, index) {
        winningCombinationIndex = index
        return self.board[combination[0]] === self.board[combination[1]] &&
               self.board[combination[1]] === self.board[combination[2]] &&
               self.board[combination[0]] !== null
      })
      return { isWon: isWon, winningCombinationIndex: winningCombinationIndex }
    }
    Game.prototype.isDraw = function () {
      return !this.board.includes(null)
    }

  // Functions that handle SVG Animation
    function drawNewBoard (game) {
      lines.forEach(function (line) {
        resetsLine(line, '120')
        drawLine(line, '0')
      })
      ticTacToeCellTable.addEventListener('click', addMove)
      var symbols = document.querySelectorAll('.tic-tac-toe-cross-left, .tic-tac-toe-cross-right, .tic-tac-toe-nought')
      symbols.forEach(function (symbol) {
        resetsLine(symbol, '130')
      })
      var strikeThrough = document.getElementById('strikeThrough')
      if ((strikeThrough = document.getElementById('strikeThrough')) !== null) {
        strikeThrough.remove()
      }
    }
    function drawNought (index) {
      drawLine(noughts[index], '0')
    }
    function drawCross (index) {
      drawLine(crossesLeft[index], '0')
      drawLine(crossesRight[index], '0.3s')
    }
    function resetsLine (element, offset) {
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
    function scaleDown (element) {
      element.style.transition = element.style.WebkitTransition = 'none'
      element.style.transition = element.style.WebkitTransition =
        'all 0.6s ease'
      element.style.webkitTransform += 'scale(0.5)'
    }
    function displayWinner (winningCombinationIndex) {
      var winningCombination = WINNING_COMBINATIONS[winningCombinationIndex]
      console.log('wci', winningCombinationIndex)
      displayStrikeThrough(winningCombinationIndex)
      var strikeThrough = document.getElementById('strikeThrough')
      // Winning pieces move towards central cell
      winningCombination.forEach(function (winningCellIndex) {
        var winningCell = cells[winningCellIndex]
        winningCell.transition = winningCell.style.WebkitTransition = 'none'
        winningCell.style.transition = winningCell.style.WebkitTransition = 'all 0.35s ease'
        window.setTimeout(function () {
          winningCell.classList.add('winning-cell')
          // Middle cell of winning combination moves towards centre of grid
          winningCell.style.webkitTransform += 'translate(' + DISTANCES_FROM_CENTRE[winningCellIndex].left + 'px,' + DISTANCES_FROM_CENTRE[winningCellIndex].top + 'px)'
        }, 1000)
      })
      // Stroke shrinks inwards towards central cell of winning combination
      // and moves towards central cell of board
      if (winningCombinationIndex > 5) { // if it's the last two combinations, which are diagonal combinations
        window.setTimeout(function () {
          shrinkDiagonalStrikeThrough(strikeThrough, '-150', '0', '400', '0')
        }, 1000)
      } else {
        window.setTimeout(function () {
          shrinkStrikeThrough(strikeThrough, '0.4s', winningCombinationIndex, '-110', '0', '400')
        }, 1000)
      }
      // tic tac toe grid shrinks and disappears
      window.setTimeout(function () {
        scaleDown(ticTacToeGrid)
        scaleDown(ticTacToeCellTable)
        Array.prototype.forEach.call(cells, function (cell, index) {
          if (index !== winningCombination[1]) {
            cell.style.opacity = 0
          }
        })
        // Middle cell of winning combination scales up and moves up a bit
        cells[winningCombination[1]].style.webkitTransform += 'scale(4.5) translateY(-10px)'
        // display another SVG text saying WINNER! below it
        displayResultMessage(winnerMessage)
      }, 1500)
    }
    function displayDraw () {

    }
    function displayResultMessage (messageText) {
      messageText.style.display = 'block'
      messageText.style.transition = messageText.style.WebkitTransition = 'none'
      messageText.style.transition = messageText.style.WebkitTransition =
        'all 0.6s ease'
      messageText.style.opacity = '1'
      messageText.style.webkitTransform += 'translateY(-60px)'
    }
    function displayStrikeThrough (winningCombinationIndex) {
      var strikeThrough = window.document.createElementNS('http://www.w3.org/2000/svg', 'line')
      var strikeThroughColour = session.game.board[winningCombinationIndex] === 'x' ? '#545454' : '#f2ebd4'
      strikeThrough.setAttribute('id', 'strikeThrough')
      strikeThrough.setAttribute('x1', STRIKETHROUGH_COORDINATES[winningCombinationIndex].x1)
      strikeThrough.setAttribute('y1', STRIKETHROUGH_COORDINATES[winningCombinationIndex].y1)
      strikeThrough.setAttribute('x2', STRIKETHROUGH_COORDINATES[winningCombinationIndex].x2)
      strikeThrough.setAttribute('y2', STRIKETHROUGH_COORDINATES[winningCombinationIndex].y2)
      strikeThrough.setAttribute('stroke', strikeThroughColour)
      strikeThrough.setAttribute('stroke-width', '6')
      strikeThrough.setAttribute('stroke-dasharray', '350')
      strikeThrough.setAttribute('stroke-dashoffset', '350')
      document.querySelector('.tic-tac-toe-grid').appendChild(strikeThrough)
      window.setTimeout(function () {
        drawLine(strikeThrough)
      }, 500)
    }
    function shrinkStrikeThrough (element, offset, dashArraySize, dashArrayGap, timingDelay) {
      element.transition = element.style.WebkitTransition = 'none'
      element.style.transition = element.style.WebkitTransition =
        'all 0.4s ease'
      element.style.transitionDelay = timingDelay
      element.style.strokeDasharray = dashArraySize + ' ' + dashArrayGap
      element.style.strokeDashoffset = offset
    }
    function shrinkDiagonalStrikeThrough (element, offset, dashArraySize, dashArrayGap, timingDelay) {
      element.transition = element.style.WebkitTransition = 'none'
      element.style.transition = element.style.WebkitTransition =
        'all 0.4s ease'
      element.style.transitionDelay = timingDelay
      element.style.strokeDasharray = dashArraySize + ' ' + dashArrayGap
      element.style.strokeDashoffset = offset
    }
    function addMove (event) {
      var cell = event.target.parentNode
      if (event.target.parentNode && cell.nodeName === 'TD') {
        var selectedCellIndex = cell.getAttribute('position')
        console.log('here', selectedCellIndex)
        console.log(session.game.board)
        if (session.game.board[selectedCellIndex] === null) {
          session.game.board[selectedCellIndex] = session.game.currentPlayer
          session.game.addMove(selectedCellIndex)
          if (session.game.currentPlayer === 'o') drawNought(selectedCellIndex)
          else drawCross(selectedCellIndex)
        }
      }
    }
  // Main body
    window.document.querySelector('.player-options').addEventListener('click', function (event) {
      if (event.target && event.target.nodeName === 'LI') {
        session.startNewGame(event.target.getAttribute('value'))
      }
    })
    document.querySelector('.restart-button').addEventListener('click', function () {
      session.startNewGame(session.mode)
    }, false)
  })
})()
