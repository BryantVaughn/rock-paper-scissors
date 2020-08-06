// returns random play for computer
const computerPlay = () => {
	const plays = ['Rock', 'Paper', 'Scissors'];
	let index = Math.floor(Math.random() * plays.length);
	return plays[index].toLowerCase();
};

// takes player input for play
const playerSelection = () => {
	let ps = prompt('Rock, Paper, or Scissors?').toLowerCase();

	if (ps === 'rock' || ps === 'paper' || ps === 'scissors') return ps;
	else throw new Error(`${capitalize(ps)} is not a valid play.`);
};

// handles single round of RPC
const playRound = (playerSelection, computerSelection) => {
	if (playerSelection === 'rock') {
		if (computerSelection === 'scissors') return 1;
		else if (computerSelection === 'paper') return 0;
		else return -1;
	} else if (playerSelection === 'paper') {
		if (computerSelection === 'rock') return 1;
		else if (computerSelection === 'scissors') return 0;
		else return -1;
	} else if (playerSelection === 'scissors') {
		if (computerSelection === 'paper') return 1;
		else if (computerSelection === 'rock') return 0;
		else return -1;
	}
};

// plays as many rounds needed until someone scores pointsNeeded amount
const game = () => {
	const pointsNeeded = 5;

	let playerChoice;
	let computerChoice;
	let winner;
	let playerWins = 0;
	let computerWins = 0;

	while (playerWins < pointsNeeded && computerWins < pointsNeeded) {
		playerChoice = playerSelection();
		computerChoice = computerPlay();
		winner = playRound(playerChoice, computerChoice);

		if (winner === 1) {
			console.log(
				`You win this round! ${capitalize(playerChoice)} beats ${capitalize(
					computerChoice
				)}`
			);
			playerWins++;
		} else if (winner === 0) {
			console.log(
				`You lose this round! ${capitalize(computerChoice)} beats ${capitalize(
					playerChoice
				)}`
			);
			computerWins++;
		} else {
			console.log(
				`No winner this round... Both played ${capitalize(playerChoice)}`
			);
		}
	}

	let finalWinner = finalResults(playerWins, computerWins);
	console.log(`Fianl Score: ${playerWins} - ${computerWins} ${finalWinner}`);
};

// helper functions for printing results
const capitalize = (str) => {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

const finalResults = (playerWins, computerWins) => {
	return playerWins > computerWins
		? 'YOU WIN!!!'
		: playerWins === computerWins
		? "IT'S A DRAW :-|"
		: 'YOU LOSE...';
};
