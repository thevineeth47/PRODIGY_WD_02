let startTime, updatedTime, difference, interval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function start() {
  if (!isRunning) {
    startTime = new Date().getTime() - (difference || 0);
    interval = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(interval);
    difference = new Date().getTime() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  difference = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
  lapCounter = 0;
}

function lap() {
  if (!isRunning) return;
  lapCounter++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
  laps.appendChild(li);
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;

  let hours = Math.floor(updatedTime / (1000 * 60 * 60));
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  let milliseconds = updatedTime % 1000;

  display.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilli(milliseconds)}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function padMilli(unit) {
  return unit < 10 ? "00" + unit : unit < 100 ? "0" + unit : unit;
}
