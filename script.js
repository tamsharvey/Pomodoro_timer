// ── Timer durations (in seconds) ──
const DURATIONS = {
    work: 30 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

// ── State ──
let currentMode = 'work';
let timeLeft = DURATIONS[currentMode];
let timerInterval = null;
let isRunning = false;

// ── DOM references ──
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');

// ── Update the timer display ──
function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    minutes.textContent = String(mins).padStart(2, '0');
    seconds.textContent = String(secs).padStart(2, '0');
}

// ── Tick: called every second while running ──
function tick() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        alert(`${currentMode === 'work' ? 'Work session' : 'Break'} complete!`);
        return;
    }

    timeLeft--;
    updateDisplay();
}

// ── Start / pause toggle ──
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(tick, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

// ── Reset to current mode's duration ──
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    timeLeft = DURATIONS[currentMode];
    updateDisplay();
});

// ── Initial render ──
updateDisplay();
