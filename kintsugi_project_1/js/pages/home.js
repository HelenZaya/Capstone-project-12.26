import { state } from "../state.js";
import { renderUI } from "../render.js";

/* =====================
   UI (LANG + THEME)
===================== */
renderUI();

document.querySelectorAll(".lang").forEach(btn => {
  btn.addEventListener("click", () => {
    state.ui.language = btn.textContent;
    renderUI();
  });
});

document.querySelector(".theme")?.addEventListener("click", () => {
  state.ui.theme = state.ui.theme === "light" ? "dark" : "light";
  renderUI();
});

/* =====================
   HERO SLIDER
===================== */
const hero = document.querySelector(".hero");
const dots = document.querySelectorAll(".slider-dots span");
const titleEl = document.querySelector(".hero-content h1");
const subtitleEl = document.querySelector(".hero-content p");

let current = 0;

function setSlide(index) {
  const dot = dots[index];

  hero.style.backgroundImage = `url(${dot.dataset.bg})`;

  // Animate text
  titleEl.classList.remove("fade-in");
  subtitleEl.classList.remove("fade-in");

  setTimeout(() => {
    titleEl.textContent = dot.dataset.title;
    subtitleEl.textContent = dot.dataset.subtitle;

    titleEl.classList.add("fade-in");
    subtitleEl.classList.add("fade-in");
  }, 200);

  dots.forEach(d => d.classList.remove("active"));
  dot.classList.add("active");

  current = index;
}

// init
setSlide(current);

// auto slide
setInterval(() => {
  const next = (current + 1) % dots.length;
  setSlide(next);
}, 5000);

// manual click
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => setSlide(index));
});
