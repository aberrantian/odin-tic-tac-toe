# Brief
A tic tac toe game to be played in the console. Can be played against an AI or take turns between two users.

# Notes
Don't start working on the GUI until the game is fully playable through the console.

# Requirements
- avoid global functions and variables as much as possible
- prevent claiming already claimed cells
- check for 3 in a row
- check for tie
- allow game restart
- announce winner
- track win streak
- ai
    - random
    - smart

# Init
- create gameboard array
- create players
- create turn tracker

# Game Loop
while true:
    if winner == true
        update win streak
        print winner
        exit to main menu
    else
        continue
    
    check who's turn it is
    prompt for input
    
    if input == legal
        accept input
        update game board
        switch turn
        print game board
        continue
    else
        warn illegal input
        reprompt