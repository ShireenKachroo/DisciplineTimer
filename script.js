document.addEventListener("DOMContentLoaded", function () {
  // accessing HTML ele
  const displayTime = document.getElementById("time-display");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const durationInput = document.getElementById("durationInput");

  let seconds = 0;
  let timerInterval = null;
  let timerRunning = false;
  let totalSeconds = 0;

  // time --> MM:SS format
  function formatTime(secs) {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`; //pad with 0 if needed
  }

  startBtn.addEventListener("click", function () {
    if (timerInterval) return;

    const minutes = parseInt(durationInput.value);
    if (isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid duration in minutes.");
      return;
    }

    totalSeconds = minutes * 60;
    timerRunning = true;

    timerInterval = setInterval(() => {
      seconds++;
      displayTime.textContent = formatTime(seconds);

      if (seconds >= totalSeconds) {
        clearInterval(timerInterval);
        timerRunning = false;
        alert("Great job! Your session is complete.");
      }
    }, 1000);
  });

  pauseBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
  });

  resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerRunning = false;
    displayTime.textContent = "00:00";
  });


  //Beep function using Web Audio API
	function playBeep() {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const oscillator = audioCtx.createOscillator();
		const gainNode = audioCtx.createGain();

		oscillator.type = "square"; // beep-like tone
		oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 1000 Hz

		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		oscillator.start();
		oscillator.stop(audioCtx.currentTime + 1); // short beep
	}


  // Tab switch detection
  document.addEventListener("visibilitychange", function () {
  if (document.hidden && timerRunning) {
    alert("Hey YOU!!!! Stay focused! Don't switch tabs until your timer is complete.");
    playBeep(); // Play beep
  }
});

});
