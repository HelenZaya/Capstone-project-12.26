import { state } from "./state.js";

/* Apply theme to <html> */
export function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.ui.theme);
  updateThemeIcon();
}

/* Toggle theme */
export function toggleTheme() {
  state.ui.theme = state.ui.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", state.ui.theme);
  applyTheme();
}

/* Load saved theme */
export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    state.ui.theme = savedTheme;
  }
  applyTheme();
}

/* Update 🌙 / ☀️ icon */
function updateThemeIcon() {
  const btn = document.querySelector(".theme");
  if (!btn) return;

  btn.textContent = state.ui.theme === "dark" ? "☀️" : "🌙";
}
