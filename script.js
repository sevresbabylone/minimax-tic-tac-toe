var paths = document.querySelectorAll('.tic-tac-toe-line')

paths.forEach(function (path) {
  drawLine(path, '0')
})

var cells = document.getElementsByClassName('tic-tac-toe-cell')
var restartButton = document.querySelector('.restart-button')
restartButton.addEventListener('click', function () {
  paths.forEach(function (path) {
    redrawLine(path, '120')
    drawLine(path, '0')
    var symbols = document.querySelectorAll('.tic-tac-toe-cross-left, .tic-tac-toe-cross-right, .tic-tac-toe-nought')
    symbols.forEach(function (symbol) {
      redrawLine(symbol, '130')
    })
  })
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
var circle1 = document.querySelector('.tic-tac-toe-nought')

Array.prototype.forEach.call(cells, function (cell) {
  cell.addEventListener('click', function (event) {
    drawLine(circle1, '0')
    var crossesRight = document.querySelectorAll('.tic-tac-toe-cross-right')
    var crossesLeft = document.querySelectorAll('.tic-tac-toe-cross-left')
    crossesLeft.forEach(function (cross, index) {
      drawLine(cross, '0')
      drawLine(crossesRight[index], '0.3s')
    })
  })
})

function Session () {
  this.xScore = 0
  this.oScore = 0
  this.currentGame = new Game()
}

function Game () {
  this.board = [null, null, null, null, null, null, null, null]
  this.currentPlayer = 'x'
}

Game.prototype.clearBoard = function () {
  // zoom out of viewport
  // fade opacity of lines
  // after fade, switch out to old strokeDashoffset
  // display another SVG stating WINNER or LOSER on top of it
}
Game.prototype.newBoard = function () {
  // SVG message fades out / flicker
  // redraws lines
}
Game.prototype.switchPlayer = function () {

}
Game.prototype.addMove = function () {

}
Game.WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
