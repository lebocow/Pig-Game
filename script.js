'use strict';

// Selecting elements
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);
const score0EL = document.querySelector(`#score--0`);
const score1EL = document.getElementById(`score--1`);
const current0EL = document.getElementById(`current--0`);
const current1EL = document.getElementById(`current--1`);
const diceEL = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting conditions
let scores,
  currentScore,
  activePlayer = 0,
  playing;

const init = function () {
  // Reset the global variables
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  // We remove from the active Player the --active and --winner classes
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`, `player--winner`);
  activePlayer = 0;

  // We hide the dice
  diceEL.classList.add(`hidden`);

  // We make the player 0 the active player again
  player0EL.classList.add(`player--active`);

  // Reset current and total score
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEL.classList.remove(`hidden`);
    diceEL.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to the score of the actual player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEL.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Reset/New game button functionality
btnNew.addEventListener(`click`, init);
