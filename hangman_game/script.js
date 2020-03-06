const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "patoche",
  "couscous",
  "concatenation",
  "athletic",
  "president",
  "immortal"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word, letter by letter (.includes)
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      letter => `<span class='letter'>
        ${correctLetters.includes(letter) ? letter : ""} </span>`
    )
    .join("")} `;

  // Regroup characters on a single line
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won 😃 ";
    popup.style.display = "flex";
  }
}

// Update the wrong letters, on screen and inside wrongLetters array
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""} 
    ${wrongLetters.map(letter => `<span>${letter}</span>`)} `;

  // Display parts of Hangman
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if game is lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Game over!";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Keydown letter press
window.addEventListener("keydown", e => {
  // Between 65 & 90 are letters keycodes, outside is others like Enter, space..
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game button (Play Again)
playAgainBtn.addEventListener("click", () => {
  // Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});

displayWord();
