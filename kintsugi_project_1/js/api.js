import { state } from "./state.js";

const BASE_URL = "http://localhost:3000";

/* =====================
   PRODUCTS
===================== */
export async function loadProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  state.products = await res.json();
}

/* =====================
   CART
===================== */
export async function loadCart() {
  const res = await fetch(`${BASE_URL}/cart`);
  state.cart = await res.json();
}

/* ADD TO CART (NO DUPLICATES) */
export async function addToCart(product) {
  const existing = state.cart.find(
    item => item.productId === product.id
  );

  // increase qty
  if (existing) {
    await fetch(`${BASE_URL}/cart/${existing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: existing.qty + 1 })
    });
    existing.qty++;
    return;
  }

  // create new
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    })
  });

  const saved = await res.json();
  state.cart.push(saved);
}

/* REMOVE FROM CART */
export async function removeFromCart(cartId) {
  await fetch(`${BASE_URL}/cart/${cartId}`, {
    method: "DELETE"
  });

  state.cart = state.cart.filter(item => item.id !== cartId);
}
