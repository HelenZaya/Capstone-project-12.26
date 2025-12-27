/* =========================
   SHOP / PRODUCTS
========================= */

import { state } from "./state.js";

/* PRODUCTS */
export function renderProducts(category = "all") {
  const container = document.getElementById("products");
  container.innerHTML = "";

  state.products
    .filter(p => category === "all" || p.category === category)
    .forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      container.appendChild(div);
    });

  // attach click events AFTER rendering
  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      addToCart(id);
    });
  });
}

function addToCart(id) {
  const product = state.products.find(p => p.id == id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  // optional redirect
  window.location.href = "cart.html";
}


/* CART COUNT */
export function renderCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const total = state.cart.reduce((sum, i) => sum + i.qty, 0);
  el.textContent = total;
}


/* =========================
   NAV UI (LANG / THEME)
========================= */

export function renderUI() {
  // language buttons
  document.querySelectorAll(".lang").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.textContent === state.ui.language
    );
  });

  // theme
  document.body.dataset.theme = state.ui.theme;
}
