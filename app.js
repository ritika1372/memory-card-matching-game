const emojis = ['🌙', '🚀', '👽', '🪐', '🌟', '🛰️', '☄️', '🔭'];
const cardsArray = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = ''; // clear existing content if reloaded
  const shuffled = shuffle(cardsArray);

  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = ''; // hidden initially
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      matchedCount++;
      resetTurn();
      if (matchedCount === emojis.length) {
        document.getElementById('status').textContent = '🎉 You matched all pairs!';
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard(); // 👈 don't forget this!
