const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set Background year
year.innerText = currentYear + 1;

// Update Time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  // % Modulo operator to calculate the remainder of hours/minutes today
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);
  const diffHours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const diffMinutes = Math.floor(diff / 1000 / 60) % 60;
  const diffSeconds = Math.floor(diff / 1000) % 60;

  days.innerText = diffDays;
  hours.innerText = diffHours < 10 ? "0" + diffHours : diffHours;
  minutes.innerText = diffMinutes < 10 ? "0" + diffMinutes : diffMinutes;
  seconds.innerText = diffSeconds < 10 ? "0" + diffSeconds : diffSeconds;
}

// Trigger the Countdown to update every second (1000 milliseconds)
setInterval(updateCountdown, 1000);

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);
