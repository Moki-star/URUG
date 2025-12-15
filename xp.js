// xp.js - handles XP & Level system

let xp = parseInt(localStorage.getItem("xp")) || 0;

function addXP(amount) {
  xp += amount;
  localStorage.setItem("xp", xp);
  showXP();
}

function showXP() {
  const xpEl = document.getElementById("xp");
  const levelEl = document.getElementById("level");
  if (xpEl) xpEl.textContent = xp;
  if (levelEl) levelEl.textContent = getLevel();
  animateXP(xpEl);
}

function getLevel() {
  if (xp < 50) return "Newbie";
  if (xp < 100) return "Rising Star";
  if (xp < 200) return "Pro";
  return "Master";
}

function animateXP(el) {
  if (!el) return;
  el.classList.add("xp-pop");
  setTimeout(() => el.classList.remove("xp-pop"), 300);
}

// Initialize display on load
document.addEventListener("DOMContentLoaded", showXP);
