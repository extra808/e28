var app = new Vue({
	el: '#app',
	data: {
		currentGuesses: 6,
		currentWord: null,
		currentWordArray: [],
		guesses: 6,
		guessLetter: null,
		guessedLetters: [],
		letterDisabled: false,
		placeholder: '',
		words: ['antelope', 'bear', 'cat', 'dolphin', 'eagle', 'ferret', 'giraffe', 'human', 'ibex', 'jellyfish']
	},
	computed: {
		spacedPlaceholder: function () {
			return this.placeholder.split('').join(' ');
		}
	},
	methods: {
		checkGuess: function () {
			checkGuess();
		},
		endGame: function () {
			this.letterDisabled = true;
			alert('Game over, the word was: ' + this.currentWord);
		},
		newGame: function () {
			newGame();
		},
		pickWord: function () {
			this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
			this.currentWordArray = this.currentWord.split('');
			this.placeholder = '';

			this.currentWordArray.forEach(element => {
				this.placeholder = this.placeholder + '_';
			});
		}
	},
	watch: {
		// end when they've run out of guesses
		currentGuesses: function (val, oldVal) {
			if (val <= 0) {
				this.endGame();
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
			if (this.currentWord == val) {
				this.endGame();
			}
		}
	},
	mounted: function () {
		this.pickWord();
	}
});

function checkGuess() {
	// get first entered letter, assumes non-letters are not entered
	app.guessLetter = app.guessLetter[0].toLowerCase();

	let letterMatch = false;

	app.currentWordArray.forEach((element, index) => {
		if (element === app.guessLetter) {
			letterMatch = true;
			// replace underscore with correctly guessed letter
			app.placeholder = app.placeholder.substring(0, index) + element + app.placeholder.substring(index + 1);
		}
	});

	// guessed letter not in word
	if (!letterMatch) {
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

	app.guessLetter = null;
}

function newGame() {
	// prepare variables
	app.pickWord();
	app.currentGuesses = app.guesses;
	app.guessedLetters = [];
	app.letterDisabled = false;
}
