import reset from './helpers/reset';

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
			`You win this round! ${playerSelection} beats ${computerSelection}`
		);
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		computerWins++;
		configureScoreBoard(
			`You lose this time... ${computerSelection} beats ${playerSelection}`
		);
	} else {
		configureScoreBoard(`It's a draw... you both played ${playerSelection}`);
	}

	let winner = checkWinner();
	if (winner) endGame(winner);
};

const configureScoreBoard = (messageStr) => {
	score.textContent = `${playerWins} - ${computerWins}`;
	roundMessage.textContent = messageStr;
	scoreBoard.style.backgroundColor = 'rgba(0,0,0,0.1)';
	scoreBoard.style.color = 'black';
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

// Resets game after someone wins
reset();

let firstToScore = 5;
let playerWins = 0;
let computerWins = 0;
let continueGame = true;
let beginMessage = 'Pick a choice to begin!';

const container = document.querySelector('.container');

const scoreBoard = document.createElement('div');
scoreBoard.classList.add('score-board');
scoreBoard.textContent = 'Score';

const score = document.createElement('div');
score.classList.add('score');

const roundMessage = document.createElement('p');
configureScoreBoard(beginMessage);

scoreBoard.appendChild(score);

container.appendChild(scoreBoard);
container.appendChild(roundMessage);

const resetGame = document.createElement('button');
resetGame.textContent = 'Play Again?';
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
