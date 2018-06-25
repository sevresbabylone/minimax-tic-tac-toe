var path = document.querySelector('.tic-tac-toe-line');
var length = path.getTotalLength();

// Clear any previous transition
path.style.transition = path.style.WebkitTransition = 'none';

path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;

path.getBoundingClientRect();
path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 0.5s linear';
// Go!
path.style.strokeDashoffset = '0';
