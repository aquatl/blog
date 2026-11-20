"use strict";

function applyDarkMode(isDarkMode) {
  document.documentElement.classList.toggle("dark-mode-on", isDarkMode);

  // Set dark-mode-off to override media query styles
  document.documentElement.classList.toggle("dark-mode-off", !isDarkMode);

  // Update the toggle switch state
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.checked = isDarkMode;
  }
}

function setDarkMode(isDarkMode) {
  const initialReadyState = document.readyState;

  // Handle class toggle and color updates in one batch for better performance
  requestAnimationFrame(() => {
    if (initialReadyState !== "complete") {
      // Apply initialization styles just for this paint
      document.documentElement.classList.add("dark-mode-init");

      requestAnimationFrame(() => {
        if (initialReadyState !== "complete") {
          document.documentElement.classList.remove("dark-mode-init");
        }
      });
    }

    applyDarkMode(isDarkMode);
  });
}

// User-initiated switch. Where supported, the whole page crossfades as ONE
// snapshot, so header, body and footer can never get out of sync, even when
// the toggle is flipped very quickly. Other browsers use the CSS transitions.
let themeSwitchId = 0;

function switchDarkMode(isDarkMode) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduceMotion) {
    applyDarkMode(isDarkMode);
    return;
  }

  // Fast flips start a new transition while the previous one is still
  // finishing. Only the newest transition may lift the "pause CSS transitions"
  // class, otherwise the CSS transitions would restart mid-crossfade.
  const id = ++themeSwitchId;
  root.classList.add("theme-vt");
  const transition = document.startViewTransition(() => applyDarkMode(isDarkMode));
  transition.finished.finally(() => {
    if (id === themeSwitchId) root.classList.remove("theme-vt");
  });
}

function handleDarkModeToggle(event) {
  // Read the switch itself (not the page class): during a fast flip the class
  // may not have been updated yet, and we must never miss a click.
  const newMode =
    event && event.target && typeof event.target.checked === "boolean"
      ? event.target.checked
      : !document.documentElement.classList.contains("dark-mode-on");

  // Update localStorage and UI state together
  localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  switchDarkMode(newMode);
}

function initDarkMode() {
  // Default to dark mode if not set in localStorage
  if (localStorage.getItem("darkMode") === null) {
    const isSystemInDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    localStorage.setItem("darkMode", isSystemInDark ? "enabled" : "disabled");
  }

  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", handleDarkModeToggle);

    // Check localStorage and set initial state
    const savedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(savedDarkMode === "enabled");
  }

  requestAnimationFrame(() => {
    // Show dark mode toggle switch
    const toggleSwitch = document.querySelector(".toggle-switch");
    if (toggleSwitch)
      toggleSwitch.classList.add("visible");
  });
}

// Use immediate listener setup
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
  initDarkMode();
}
