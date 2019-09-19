# initial game elements

## UI
- new word/start over button
- letter guessing input (text input, 1 button per letter, keyboard mapping)
- word placeholder showing number of letters and position of correctly guessed letters
- list of letters already guessed (in alphabetical order)
- number of remaining wrong guesses
- input response
- win/lose message

## back-end
### variables
- array of words
- current word
- placeholder
- number of guesses
- current number of guesses
- array of already guessed letters

### functions
- randomly pick a word
- create placeholder from word
- check current word for entered letter
- update placeholder with correct letter
- add letter to guessed letter array
- decrement current guesses

[JSFiddle](https://jsfiddle.net/du2koa81/) [JSFiddle with small change](https://jsfiddle.net/qevwy4ax/)
