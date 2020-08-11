// returns random play for computer
const computerPlay = () => {
	const plays = ['Rock', 'Paper', 'Scissors'];
	let index = Math.floor(Math.random() * plays.length);
	return plays[index].toLowerCase();
};

// handles single round of RPC
const playRound = (playerSelection) => {
	let computerSelection = computerPlay();

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
	let firstToPoints = 5;
	let winner;
	let playerWins = 0;
	let computerWins = 0;

	const buttons = document.querySelectorAll('button');

	while (playerWins < firstToPoints && computerWins < firstToPoints) {
		buttons.forEach((button) => {
			button.addEventListener('click', (e) => {
				playRound(e.target.id);
			});
		});

		if (winner === 1) {
			playerWins++;
		} else if (winner === 0) {
			computerWins++;
		} else {
			console.log('nobody wins...');
		}

		let finalWinner = finalResults(playerWins, computerWins);
		console.log(`Fianl Score: ${playerWins} - ${computerWins} ${finalWinner}`);
	}
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

game();
