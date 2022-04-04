'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const currentDiceItem = document.querySelectorAll('.die-item');
const playerDot0 = document.getElementById('dot0');
const playerDot1 = document.getElementById('dot1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnAbout = document.getElementById('open-popup-btn');
const btnDismiss = document.getElementById('dismiss-popup-btn');
const rollSound = document.getElementById('roll-sound');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playerDot0.classList.remove('hidden');
  playerDot1.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  playerDot0.classList.toggle('hidden');
  playerDot1.classList.toggle('hidden');
};

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      // arreglar porque se pone hidden en btn tmb [BUG]
      // diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//////////////// new dice roll animation

function diceRoll() {
  if (playing) {
    rollSound.play();
    // 1. Generating a random dice roll
    const dice = [...document.querySelectorAll('.die-list')];
    dice.map((die) => {
      toggleClasses(die);
      die.dataset.roll = +Math.trunc(Math.random() * 6) + 1;
      if (+die.dataset.roll !== 1) {
        // Add dice to current score
        setTimeout(() => {
          currentScore += +die.dataset.roll;
          document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
        }, 1800);
      } else {
        setTimeout(() => {
          switchPlayer();
        }, 1800);
      }
    });
  }
}

// . Rolling effect
function toggleClasses(die) {
  die.classList.toggle('odd-roll');
  die.classList.toggle('even-roll');
}

btnRoll.addEventListener('click', diceRoll);
btnNew.addEventListener('click', init);

//////////////////////////////

btnAbout.addEventListener('click', function () {
  btnAbout.style.display = 'none';
  document.getElementsByClassName('popup')[0].classList.add('active');
});

btnDismiss.addEventListener('click', function () {
  btnAbout.style.display = 'block';
  document.getElementsByClassName('popup')[0].classList.remove('active');
});
