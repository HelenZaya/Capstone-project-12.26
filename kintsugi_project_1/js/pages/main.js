import { initTheme, toggleTheme } from "../theme.js";

initTheme();

document.querySelector(".theme")?.addEventListener("click", toggleTheme);
