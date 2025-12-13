// ========================================
// Text-to-Speech App (Web Speech API)
// ========================================

// DOM Elements
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speedSlider = document.getElementById("speed-slider");
const pitchSlider = document.getElementById("pitch-slider");
const speedValue = document.getElementById("speed-value");
const pitchValue = document.getElementById("pitch-value");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const charCount = document.getElementById("char-count");
const statusText = document.getElementById("status-text");

// Web Speech API
const synth = window.speechSynthesis;
let voices = [];

// --------------------
// Load available voices
// --------------------
function loadVoices() {
  voices = synth.getVoices();

  if (!voices.length) return;

  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// --------------------
// Speak text
// --------------------
function speak() {
  if (!textInput.value.trim()) {
    setStatus("Enter some text");
    return;
  }

  if (synth.speaking) synth.cancel();

  const utterance = new SpeechSynthesisUtterance(textInput.value);

  utterance.voice = voices[voiceSelect.value];
  utterance.rate = parseFloat(speedSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);

  utterance.onstart = () => setStatus("Speaking...");
  utterance.onend = () => setStatus("Finished");
  utterance.onerror = () => setStatus("Error");

  synth.speak(utterance);
}

// --------------------
// Stop speech
// --------------------
function stop() {
  if (synth.speaking) {
    synth.cancel();
    setStatus("Stopped");
  }
}

// --------------------
// Status helper
// --------------------
function setStatus(text) {
  statusText.textContent = text;
}

// --------------------
// Init app
// --------------------
function init() {
  loadVoices();
  synth.addEventListener("voiceschanged", loadVoices);

  speakBtn.addEventListener("click", speak);
  stopBtn.addEventListener("click", stop);

  // Character counter
  textInput.addEventListener("input", () => {
    charCount.textContent = textInput.value.length;
  });

  // Speed slider
  speedSlider.addEventListener("input", () => {
    speedValue.textContent = speedSlider.value;
  });

  // Pitch slider
  pitchSlider.addEventListener("input", () => {
    pitchValue.textContent = pitchSlider.value;
  });
}

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", init);
