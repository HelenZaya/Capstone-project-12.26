import { state } from "../state.js";
import { loadCart, removeFromCart } from "../api.js";
import { renderCartCount } from "../render.js";

async function start() {
  await loadCart();
  renderCart();
  renderCartCount();
}

start();

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

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
    div.innerHTML = `
      <p>
        <strong>${item.name}</strong>
        $${item.price} × ${item.qty}
        <button data-id="${item.id}" data-action="dec">−</button>
        <button data-id="${item.id}" data-action="inc">+</button>
        <button data-id="${item.id}" data-action="remove">❌</button>
      </p>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = total;
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const cartId = btn.dataset.id;
  const action = btn.dataset.action;
  const item = state.cart.find(i => i.id === cartId);
  if (!item) return;

  if (action === "inc") {
    await fetch(`http://localhost:3000/cart/${cartId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: item.qty + 1 })
    });
    item.qty++;
  }

  if (action === "dec") {
    if (item.qty === 1) return;
    await fetch(`http://localhost:3000/cart/${cartId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: item.qty - 1 })
    });
    item.qty--;
  }

  if (action === "remove") {
    await removeFromCart(cartId);
  }

  renderCart();
  renderCartCount();
});
