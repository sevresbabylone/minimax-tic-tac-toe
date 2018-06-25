var paths = document.querySelectorAll('.tic-tac-toe-line');
var length = paths[0].getTotalLength();

// Clear any previous transition
paths.forEach(function(path) {
  path.style.transition = path.style.WebkitTransition = 'none';

  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;

  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition =
    'stroke-dashoffset 0.4s linear';
  // Go!
  path.style.strokeDashoffset = '0';
})
