var app = new Vue({
	el: '#app',
	data: {
		currentGuesses: 6,
		currentWord: null,
		guesses: 6,
		guessLetter: null,
		guessedLetters: [],
		letterDisabled: false,
		placeholder: null,
		words: ['antelope', 'bear', 'cat', 'dolphin', 'eagle', 'ferret', 'giraffe', 'human', 'ibex', 'jellyfish']
	},
	methods: {
		checkGuess: function () {
			checkGuess();
		},
		newGame: function () {
			newGame();
		}
	},
	watch: {
		// end when they've run out of guesses
		currentGuesses: function (val, oldVal) {
			if (val <= 0) {
				endGame();
			}
		},
		// put focus on letter input field after previous guess is cleared
		guessLetter: function (val, oldVal) {
			if (val === null && oldVal !== null) {
				document.getElementById('letter').focus();
			}
		},
		// end when word has been guessed
		placeholder: function (val, oldVal) {
			if (this.currentWord == val.split(' ').join('')) {
				endGame();
			}
		}
	}
});

window.addEventListener('load', newGame());

function checkGuess() {
	// get first entered letter, assumes non-letters are not entered
	app.guessLetter = app.guessLetter[0].toLowerCase();
	const guessRegex = RegExp(app.guessLetter, 'g');

	let guessIndexes = [];

	// collect array of indexes for matched letter
	while ((guessRegex.exec(app.currentWord)) !== null) {
		guessIndexes.push(guessRegex.lastIndex);
	}

	// guessed letter not in word
	if (guessIndexes[0] === undefined) {
		const guessedLetterNoMatch = app.guessedLetters.some(element => {
			return element === app.guessLetter;
		});

		// guessed letter not already guessed
		if (!guessedLetterNoMatch) {
			app.currentGuesses--;

			app.guessedLetters.push(app.guessLetter);
			app.guessedLetters = app.guessedLetters.sort();
		}
	}
	else {
		updatePlaceholder(app.guessLetter, guessIndexes);
	}

	app.guessLetter = null;
}

function endGame() {
	app.letterDisabled = true;
	alert('Game over, the word was: ' + app.currentWord);
}

function newGame() {
	// prepare variables
	app.currentGuesses = app.guesses;
	app.currentWord = app.words[Math.floor(Math.random() * app.words.length)];
	app.guessedLetters = [];
	app.letterDisabled = false;
	app.placeholder = '';

	app.currentWord.split('').forEach(element => {
		app.placeholder = app.placeholder + '_';
	});

	app.placeholder = app.placeholder.split('').join(' ');
}

// replace placeholder character with guessed letter
function updatePlaceholder(letter, letterIndexes) {
	// remove spaces
	let placeAsWord = app.placeholder.split(' ').join('');
	letterIndexes.forEach(element => {
		placeAsWord = placeAsWord.substring(0, element - 1) + letter + placeAsWord.substring(element);
	});

	// re-add spaces
	app.placeholder = placeAsWord.split('').join(' ');
}
