// returns random play for computer
const computerPlay = () => {
	const plays = ['Rock', 'Paper', 'Scissors'];
	let index = Math.floor(Math.random() * plays.length);
	return plays[index].toLowerCase();
};

// handles single round of RPC
const playRound = (playerSelection) => {
	let computerSelection = computerPlay();

	if (
		(playerSelection === 'rock' && computerSelection === 'scissors') ||
		(playerSelection === 'paper' && computerSelection === 'rock') ||
		(playerSelection === 'scissors' && computerSelection === 'paper')
	) {
		playerWins++;
		configureScoreBoard(
			'You win this round!',
			`${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`
		);
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		computerWins++;
		configureScoreBoard(
			'You lose this time...',
			`${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`
		);
	} else {
		configureScoreBoard(
			"It's a draw...",
			`you both played ${capitalize(playerSelection)}`
		);
	}

	let winner = checkWinner();
	if (winner) endGame(winner);
};

const configureScoreBoard = (messageStr, subMessageStr = '') => {
	score.textContent = `${playerWins} - ${computerWins}`;
	roundMessage.textContent = messageStr;
	subMessage.textContent = subMessageStr;
};

// configures scoreboard for winner
const endGame = (winner) => {
	if (winner === 'player') {
		scoreBoard.style.backgroundColor = '#b0e18d';
		roundMessage.textContent = 'YOU WIN!!!';
	} else {
		scoreBoard.style.backgroundColor = '#dc4933';
		scoreBoard.style.color = 'white';
		roundMessage.textContent = 'You Lose...';
	}
	container.appendChild(resetGame);
};

// checks if player or comp has reached firstToScore value
const checkWinner = () => {
	if (playerWins === firstToScore || computerWins === firstToScore) {
		continueGame = false;
		return playerWins === firstToScore ? 'player' : 'computer';
	}
	return null;
};

// helper to capitalize first letter of plays
const capitalize = (str) => {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

// Resets game after someone wins
const reset = () => {
	const resetBtn = document.querySelector('.reset');
	resetBtn.remove();

	continueGame = true;
	playerWins = 0;
	computerWins = 0;
	scoreBoard.style.backgroundColor = 'rgba(0,0,0,0.05)';
	scoreBoard.style.color = 'black';
	configureScoreBoard(beginMessage);
};

let firstToScore = 5;
let playerWins = 0;
let computerWins = 0;
let continueGame = true;
let beginMessage = 'Pick a play to begin!';

const container = document.querySelector('.container');

const subTitle = document.querySelector('#sub-title');
subTitle.textContent = `First to ${firstToScore} wins!`;

const scoreBoard = document.createElement('div');
scoreBoard.classList.add('score-board');
scoreBoard.textContent = 'Score';

const score = document.createElement('div');
score.classList.add('score');

// create elements for main and sub messages
const roundMessage = document.createElement('p');
roundMessage.classList.add('message');

const subMessage = document.createElement('p');
subMessage.classList.add('sub-message');

// Configure message for scoreboard
configureScoreBoard(beginMessage);

// append nodes to DOM
scoreBoard.appendChild(score);

container.appendChild(roundMessage);
container.appendChild(subMessage);
container.appendChild(scoreBoard);

const resetGame = document.createElement('button');
resetGame.textContent = 'Play Again';
resetGame.addEventListener('click', () => {
	reset();
});
resetGame.classList.add('reset');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		if (continueGame) playRound(e.target.id);
	});
});
