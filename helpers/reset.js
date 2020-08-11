// Resets game after someone wins
export default reset = () => {
	const resetBtn = document.querySelector('.reset');
	resetBtn.remove();

	continueGame = true;
	playerWins = 0;
	computerWins = 0;
	configureScoreBoard(beginMessage);
};
