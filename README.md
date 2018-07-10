# Minimax Tic Tac Toe
Practice copying the SVG animation of Google's [Tic Tac Toe](https://www.google.com.sg/search?q=tic+tac+toe) with Minimax and 2-players implementation

[View](https://codepen.io/sevresbabylone/full/BVvNPM/) on Codepen
## Heuristic Board Evaluation Function
- +100 for EACH 3-in-a-line for computer.
- +10 for EACH two-in-a-line (with a empty cell) for computer.
- +1 for EACH one-in-a-line (with two empty cells) for computer.
- Negative scores for opponent, i.e., -100, -10, -1 for EACH opponent's 3-in-a-line, 2-in-a-line and 1-in-a-line.
- 0 otherwise (empty lines or lines with both computer's and opponent's seeds).

## Alpha-beta pruning example
Alpha-Beta pruning is an optimisation technique for the Minimax algorithm. It cuts off branches in the game tree which need not be searched because there exists already a better move available

In this example, we consider a complete binary tree where only the leaves contains values and maximising and minimising players take turns choosing the path that will give the highest or lowest outcome.

alpha is initialised as -10000 and beta as 10000.
- At A (maximising), it's  not a leaf, so it calls minimax on B
- At B (minimising), it's not a leaf, so it calls minimax on D
- At D (maximising), it's not leaf, so it calls minimax on 3
- 3 is a leaf so it returns its index to D and updates the scoreArray with its value at its index
- in minimax call of D (maximising), alpha value is updated as 3 as 3 > -10000, but beta <= alpha 10000 <= 3 is false, so it calls minimax on 5
- 5 is a leaf so it returns its index to D and updates the scoreArray with its value at its index
- 5 > 3, so scoreArray is updated with D = 5
- At B, beta is updated, as 5 < 10000. but beta <= alpha 5 <= -10000 is not true so it calls minimax on E
- At E (maximising) it's not a leaf, so it calls minimax on 6
- 6 is a leaf so it returns its index to E and updates it scoreArray with its value at its index
- alpha is updated, as -10000 < 6, but now beta <= alpha 5 <= 6 is now true, E does not call minimax on 9. (It's because minimising player knows that if it chooses E, there is always a value that's better than at D, regardless if 9 was bigger or smaller than 6)
```
               A               (MAX)
             /   \
            B     C            (MIN)
           / \   / \
          D   E F   G          (MAX)
        / \ / \ / \ / \
       3  5 6 9 1 2 0 -1       (MIN)
```

Implemented from [example](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/) from Geeksforgeeks, except that function returns the best move instead of the winning final value if both parties play perfectly. ([Solution](https://github.com/sevresbabylone/minimax-tic-tac-toe/blob/master/alpha-beta-pruning/alpha-beta.js))

## References & Resources
- [Case Study on Tic-Tac-Toe Part 2: With AI](https://www3.ntu.edu.sg/home/ehchua/programming/java/javagame_tictactoe_ai.html)
- [Wikipedia article on Minimax](https://en.wikipedia.org/wiki/Minimax)
