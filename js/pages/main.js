import { initTheme, toggleTheme } from "../theme.js";

initTheme();

document.querySelector(".theme")
  ?.addEventListener("click", toggleTheme);

const cartModal = document.getElementById("cart-modal");
const cartContainer = document.getElementById("cart-container");
const openCart = document.getElementById("open-cart");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

openCart.addEventListener("click", (e) => {
  e.preventDefault();

  cartModal.classList.remove("hidden");

  // Load cart.html into modal
  fetch("cart.html")
    .then(res => res.text())
    .then(html => {
      cartContainer.innerHTML = html;

      // load cart.js AFTER HTML loads
      const script = document.createElement("script");
      script.src = "/js/pages/cart.js";
      script.type = "module";
      document.body.appendChild(script);
    });
});

function closeCart() {
  cartModal.classList.add("hidden");
  cartContainer.innerHTML = "";
}

closeBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
