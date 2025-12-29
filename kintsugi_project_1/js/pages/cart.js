import { state } from "../state.js";
import { loadCart, removeFromCart } from "../api.js";
import { renderCartCount } from "../render.js";

async function start() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!itemsEl || !totalEl) return;

  await loadCart();
  renderCart();
  renderCartCount();
}

start();

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (state.cart.length === 0) {
    container.innerHTML = "<p>Cart is empty</p>";
    totalEl.textContent = "0";
    return;
  }

  let total = 0;

  state.cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img
        src="${item.image ? item.image : ""}"
        alt="${item.name}"
        class="cart-thumb"
        onerror="this.style.display='none'"
      />

      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <p>$${item.price} × ${item.qty}</p>
      </div>

      <div class="cart-item-actions">
        <button data-id="${item.id}" data-action="dec">−</button>
        <span class="qty">${item.qty}</span>
        <button data-id="${item.id}" data-action="inc">+</button>
        <button data-id="${item.id}" data-action="remove" class="remove">✕</button>
      </div>
    `;

    container.appendChild(div);
  });

  totalEl.textContent = total;
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  if (action === "inc") item.qty++;
  if (action === "dec" && item.qty > 1) item.qty--;
  if (action === "remove") await removeFromCart(id);

  renderCart();
  renderCartCount();
});
console.log(state.cart);