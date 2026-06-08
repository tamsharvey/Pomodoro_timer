// ── Timer durations (in seconds) ──
// These define how long each mode runs for
const DURATIONS = {
    work: 30 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

// ── State ──
// These variables track the current status of the timer
let currentMode = 'work';              // which mode is active (work / short-break / long-break)
let timeLeft = DURATIONS[currentMode]; // seconds remaining in the current session
let timerInterval = null;              // holds the setInterval reference so we can clear it
let isRunning = false;                 // whether the timer is currently counting down
let sessionsCompleted = 0;             // number of completed work sessions

// ── DOM references ──
// Grab the elements we need to read or update
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionCount = document.getElementById('session-count'); // displays session count

// ── Update the timer display ──
// Converts timeLeft (seconds) into MM:SS format and writes it to the page
function updateDisplay() {
    const mins = Math.floor(timeLeft / 60); // get whole minutes
    const secs = timeLeft % 60;             // get remaining seconds
    // padStart ensures single digits are shown as e.g. "05" not "5"
    minutes.textContent = String(mins).padStart(2, '0');
    seconds.textContent = String(secs).padStart(2, '0');
}

// ── Tick: called every second while running ──
// Decrements the timer and checks if the session is complete
function tick() {
    if (timeLeft <= 0) {
        // Session has ended — stop the timer and reset button state
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';

        // Only count completed work sessions, not breaks
        if (currentMode === 'work') {
            sessionsCompleted++;
            sessionCount.textContent = sessionsCompleted;
        }

        // Notify the user the session is over
        alert(`${currentMode === 'work' ? 'Work session' : 'Break'} complete!`);
        return;
    }

    // Count down one second and refresh the display
    timeLeft--;
    updateDisplay();
}

// ── Start / pause toggle ──
// Clicking the button either starts or pauses the countdown
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        // Pause: stop the interval and update button label
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        // Start: kick off the interval to call tick() every 1000ms
        timerInterval = setInterval(tick, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

// ── Reset to current mode's duration ──
// Stops the timer and restores timeLeft to the full duration for the current mode
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    timeLeft = DURATIONS[currentMode]; // restore full duration
    updateDisplay();
});

// ── Initial render ──
// Show the correct starting time as soon as the page loads
updateDisplay();
