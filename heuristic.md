## Line Heuristic
- +100, +10, +1 for 3-, 2-, 1-in-a-line for maximiser
- -100, -10, -1 for 3-, 2-, 1-in-a-line for minimiser
- 0 otherwise

### 3 in a line maximiser: +100
- x x x

### 2 in a line maximiser: +10
- x - x
- x x -
- - x x

### 1 in a line maximiser: +1
- x - -
- - - x
- - x -

### Everything else: 0
- x o o
- o o x
- o x o
- x o x
- x x o
- o x x
- o x -
- - o x
- x o -
- - x o
- x - o
- o - x
