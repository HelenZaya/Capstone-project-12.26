// js/pages/about.js
import { state } from "../state.js";
import { renderUI } from "../render.js";

/* =========================
   START
========================= */

// Initial render of UI (language, theme)
renderUI();

/* =========================
   EVENTS
========================= */

// Language toggle
document.querySelectorAll(".lang").forEach(btn => {
  btn.addEventListener("click", () => {
    state.ui.language = btn.textContent;
    renderUI();
  });
});

// Theme toggle
document.querySelector(".theme")?.addEventListener("click", () => {
  state.ui.theme = state.ui.theme === "light" ? "dark" : "light";
  renderUI();
});
