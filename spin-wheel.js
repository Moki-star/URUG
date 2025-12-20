const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");

const segments = [
  { label: "Thank You 🙂", color: "#334155", weight: 70 },
  { label: "0.1 USDT 💰", color: "#facc15", weight: 5 },
  { label: "10 SDB 🪙", color: "#38bdf8", weight: 10 },
  { label: "+1 Spin 🔁", color: "#22c55e", weight: 15 }
];

let angle = 0;
let spinning = false;

// Draw wheel
function drawWheel() {
  let start = 0;
  const total = segments.reduce((a,b)=>a+b.weight,0);

  segments.forEach(seg => {
    const slice = (seg.weight / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(140,140);
    ctx.arc(140,140,140,start,start+slice);
    ctx.fillStyle = seg.color;
    ctx.fill();

    ctx.save();
    ctx.translate(140,140);
    ctx.rotate(start + slice / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(seg.label, 60, 5);
    ctx.restore();

    start += slice;
  });
}

drawWheel();

// Spin logic
function spinWheel() {
  if (spinning) return;
  spinning = true;

  const spinAngle = Math.random() * 360 + 1440; // 4+ rounds
  const duration = 4000;
  const startTime = performance.now();

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    angle = spinAngle * easeOut(progress);

    ctx.clearRect(0,0,280,280);
    ctx.save();
    ctx.translate(140,140);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-140,-140);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      determineReward(angle % 360);
    }
  }
  requestAnimationFrame(animate);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Reward logic (70/30)
function determineReward(finalAngle) {
  const rand = Math.random() * 100;
  let reward = "";

  if (rand < 70) {
    reward = "Thank You 🙂";
  } else {
    const r = Math.random() * 100;
    if (r < 5) reward = "0.1 USDT 💰";
    else if (r < 15) reward = "10 SDB 🪙";
    else reward = "+1 Spin 🔁";
  }

  result.textContent = "🎉 You got: " + reward;
}

// Buttons
document.getElementById("spinXP").onclick = () => {
  if (xp < 50) return alert("XP 50 လိုအပ်ပါတယ်");
  xp -= 50;
  localStorage.setItem("xp", xp);
  spinWheel();
};

document.getElementById("spinAd").onclick = () => {
  alert("📺 Ad ကြည့်နေပါတယ်...");
  setTimeout(spinWheel, 2000);
};
