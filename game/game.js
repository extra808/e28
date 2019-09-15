
// internal
const words = ['antelope', 'bear', 'cat', 'dolphin', 'eagle', 'ferret', 'giraffe', 'human', 'ibex', 'jellyfish'];
const guesses = 6;
let currentWord = '';
let placeholder = '';
let currentGuesses = 6;
let guessedLetters = {};

// UI
const newGameBtn = document.getElementById('newGame');
newGameBtn.addEventListener('click', newGame);

const placeholderWord = document.getElementById('word');

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', checkGuess, false);

window.addEventListener('load', newGame());

function checkGuess(e) {
	e.preventDefault();

	// get first entered letter, assumes non-letters are not entered
	const guessLetter = document.getElementById('letter').value[0].toLowerCase();
	const guessRegex = RegExp(guessLetter, 'g');

	let guessIndexes = [];

	// collect array of indexes for matched letter
	while ((guessRegex.exec(currentWord)) !== null) {
		guessIndexes.push(guessRegex.lastIndex);
	}

	// guessed letter not in word
	if (guessIndexes[0] === undefined) {
		if (guessedLetters[guessLetter] === undefined) {
			currentGuesses--;
			updateGuesses(currentGuesses);

			guessedLetters[guessLetter] = guessLetter;
			updateGuessedLetters(Object.keys(guessedLetters));

			if (currentGuesses <= 0) {
				endGame();
			}
		}
	}
	else {
		updatePlaceholder(guessLetter, guessIndexes);
	}

	document.getElementById('letter').value = '';
	document.getElementById('letter').focus();
}

function endGame() {
	document.getElementById('letter').disabled = true;
	alert('Game over, the word was: ' + currentWord);
}

function newGame() {
	// prepare variables
	currentWord = words[Math.floor(Math.random() * words.length)];
	placeholder = makePlaceholder(currentWord);
	currentGuesses = guesses;
	updateGuesses(currentGuesses);
	guessedLetters = {};
	updateGuessedLetters([]);

	// prepare input field
	document.getElementById('letter').disabled = false;
}

function makePlaceholder(word) {
	let place = '';

	for (let i = 0; i < word.length; i++) {
		place = place + '_';
	}

	placeholderWord.value = place.split('').join(' ');

	return place;
}

function updateGuessedLetters(letters) {
	const guessedLetters = document.getElementById('guessedLetters');
	const updatedLetters = document.createElement('span');
	let letterText = '';

	letters.sort().forEach(element => {
		letterText = letterText + ' ' + element;
	});

	updatedLetters.id = guessedLetters.id;
	updatedLetters.textContent = letterText;
	guessedLetters.parentNode.replaceChild(updatedLetters, guessedLetters);
}

function updateGuesses(guesses) {
	const guessElement = document.getElementById('guesses');
	const newGuess = guessElement.cloneNode();

	newGuess.textContent = guesses;
	guessElement.parentNode.replaceChild(newGuess, guessElement);
}

// replace placeholder character with guessed letter
function updatePlaceholder(letter, letterIndexes) {
	letterIndexes.forEach(element => {
		placeholder = placeholder.substring(0, element - 1) + letter + placeholder.substring(element);
	});

	placeholderWord.value = placeholder.split('').join(' ');

	if (placeholder == currentWord) {
		endGame();
	}
}
