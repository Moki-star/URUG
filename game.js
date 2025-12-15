// game.js - reaction mini-game

const screen = document.getElementById("screen");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const bestText = document.getElementById("best");

let startTime;
let timeout;
let best = parseInt(localStorage.getItem("bestReaction")) || null;

if (bestText && best !== null) bestText.textContent = "Best: " + best + " ms";

startBtn.onclick = () => {
  result.textContent = "";
  screen.style.background = "#334155";
  screen.textContent = "WAIT...";
  startBtn.disabled = true;

  const delay = Math.random() * 3000 + 1000;

  timeout = setTimeout(() => {
    screen.style.background = "#22c55e";
    screen.textContent = "TAP!";
    startTime = Date.now();
  }, delay);
};

screen.onclick = () => {
  if (!startTime) return;

  clearTimeout(timeout);

  const reaction = Date.now() - startTime;
  result.textContent = "Your time: " + reaction + " ms";

  const status = getChallengeStatus();
  status.game = true;
  saveChallenge(status);
  checkComplete(status);

  if (!best || reaction < best) {
    best = reaction;
    localStorage.setItem("bestReaction", best);
    if (bestText) bestText.textContent = "Best: " + best + " ms";
  }

  reset();
};

function reset() {
  startTime = null;
  startBtn.disabled = false;
  screen.style.background = "#334155";
  screen.textContent = "TAP START";
}
