const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words to type
const words = [
  "yoyo",
  "gato",
  "pineapple",
  "plane",
  "tiger",
  "motorcycle",
  "banana",
  "millionaire",
  "islands",
  "dope",
  "hat",
  "constitution"
];

// Initialize word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get random word from Array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add random word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// End game = show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out </h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button> 
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event Listeners

// Typing
text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear text input
    e.target.value = "";

    // Add 5 seconds to time
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }

    updateTime();
  }
});

// Settings toggle between Show/Hide
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
