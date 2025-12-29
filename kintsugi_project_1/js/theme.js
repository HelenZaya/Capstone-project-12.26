import { state } from "./state.js";

const btn = document.querySelector(".theme");

export function initTheme() {
  const saved = localStorage.getItem("theme");
  state.ui.theme = saved || "light";
  applyTheme();
}

export function toggleTheme() {
  state.ui.theme = state.ui.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", state.ui.theme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.ui.theme);
  if (btn) btn.textContent = state.ui.theme === "dark" ? "☀️" : "🌙";
}
