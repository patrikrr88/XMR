const consoleEl = document.getElementById("console");
const titleEl = document.getElementById("animated-title");

const lines = [
  "DarkNode v1.3 initialized...",
  "Establishing secure connection...",
  "Connected to pool: monero.darknetpool.onion:3333",
  "Miner ID: xmr-ghost-001",
  "Starting mining thread...",
  "Hashrate: 746.53 H/s",
  "GPU Temp: 63°C",
  "Pending XMR Payout: 0.089734",
  "Wallet: 44AFFq5kSiGBoZDfM2zMGQGqkRJz1P7xLnNQehK3rRbHgB5gDqfE",
  "--------------------------------------------------",
  "Injecting anonymizer node into Tor mesh...",
  "Node Verified ✓",
  "Monitoring darknet TXs...",
  "Status: Online",
  "--------------------------------------------------",
  "[ Live Mining Status Below ↓↓↓ ]"
];

let totalEarnings = 0.000000;
let liveHashrate = 746.53;

async function typeTitle() {
  const titleText = "XMR = $420.32";
  for (let i = 0; i < titleText.length; i++) {
    titleEl.innerHTML += titleText[i];
    await new Promise(r => setTimeout(r, 100));
  }

  const underscore = document.createElement("span");
  underscore.textContent = "_";
  underscore.classList.add("blink");
  titleEl.appendChild(underscore);

  await new Promise(r => setTimeout(r, 1000));
  typeLines();
}

async function typeLines() {
  const blink = document.querySelector(".blink");
  if (blink && blink.parentElement === consoleEl) blink.remove();

  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      consoleEl.innerHTML += line[i];
      await new Promise(r => setTimeout(r, 20));
    }
    consoleEl.innerHTML += "\n";
    await new Promise(r => setTimeout(r, 400));
    window.scrollTo(0, document.body.scrollHeight);
  }

  startLiveMiningStats();
}

function startLiveMiningStats() {
  const interval = setInterval(() => {
    const hashFluctuation = (Math.random() - 0.5) * 10;
    liveHashrate = Math.max(700, liveHashrate + hashFluctuation);
    const earned = (liveHashrate / 100000) * (Math.random() * 0.05);
    totalEarnings += earned;

    const statLine = `Live Hashrate: ${liveHashrate.toFixed(2)} H/s | Session XMR Earned: ${totalEarnings.toFixed(6)}`;
    consoleEl.innerHTML += statLine + "\n";
    window.scrollTo(0, document.body.scrollHeight);
  }, 2500);
}

typeTitle();
