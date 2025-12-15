const todayKey = "challenge_" + new Date().toDateString();

function getChallengeStatus() {
  return JSON.parse(localStorage.getItem(todayKey)) || {
    game: false,
    video: false,
    timer: false,
    completed: false
  };
}

function saveChallenge(status) {
  localStorage.setItem(todayKey, JSON.stringify(status));
}

function checkComplete(status) {
  if (status.game && status.video && status.timer && !status.completed) {
    addXP(20);
    status.completed = true;
    saveChallenge(status);

    document.body.classList.add("celebrate");
    setTimeout(() => {
      document.body.classList.remove("celebrate");
      alert("🎉 Daily Challenge Complete! +20 XP");
    }, 300);
  }
}
