// music.js - handles break timer & XP for timer

const startBtnTimer = document.getElementById("startTimer");
const resetBtnTimer = document.getElementById("resetTimer");
const display = document.getElementById("time");

let timer;
let total = 300; // default 5 min

function updateDisplay() {
  const min = Math.floor(total / 60).toString().padStart(2, "0");
  const sec = (total % 60).toString().padStart(2, "0");
  if(display) display.textContent = `${min}:${sec}`;
}

startBtnTimer?.addEventListener("click", () => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (total > 0) {
      total--;
      updateDisplay();
    } else {
      clearInterval(timer);
      addXP(10);
      const status = getChallengeStatus();
      status.timer = true;
      saveChallenge(status);
      checkComplete(status);
      alert("Timer complete! +10 XP");
    }
  }, 1000);
});

resetBtnTimer?.addEventListener("click", () => {
  clearInterval(timer);
  total = 300;
  updateDisplay();
});

// initialize display
updateDisplay();
