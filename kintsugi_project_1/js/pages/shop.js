import { loadCart, addToCart } from "../api.js";
import { renderCartCount } from "../render.js";

/* ======================
   STATE
====================== */
let products = [];

const filters = {
  category: "all",
  size: "all",
  maxPrice: 200,
};

/* ======================
   INIT
====================== */
async function start() {
  await loadCart();
  renderCartCount();
  await loadProducts();
  renderProducts();
  applyFilters(); // ✅ now safe
}

start();

/* ======================
   LOAD PRODUCTS
====================== */
async function loadProducts() {
  const res = await fetch("http://localhost:3000/products");

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  products = await res.json();
}

/* ======================
   RENDER PRODUCTS
====================== */
function renderProducts() {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product-card"
           data-id="${p.id}"
           data-category="${p.category}"
           data-price="${p.price}"
           data-sizes="${p.sizes.join(",")}">
        <img src="${p.image}" />
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button
          class="buy-btn"
          data-id="${p.id}"
          data-name="${p.name}"
          data-price="${p.price}">
          Buy
        </button>
      </div>
    `;
  });
}

/* ======================
   APPLY FILTERS
====================== */
function applyFilters() {
  document.querySelectorAll(".product-card").forEach(card => {
    const category = card.dataset.category;
    const price = Number(card.dataset.price);

    const sizes = card.dataset.sizes
      ? card.dataset.sizes.split(",")
      : [];

    const matchCategory =
      filters.category === "all" ||
      category === filters.category;

    const matchSize =
      filters.size === "all" ||
      sizes.includes(filters.size) ||
      sizes.includes("all");

    const matchPrice =
      price <= filters.maxPrice;

    card.style.display =
      matchCategory && matchSize && matchPrice
        ? "block"
        : "none";
  });
}

/* ======================
   FILTER BUTTONS
====================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter button");
  if (!btn) return;

  const group = btn.closest(".filter");
  const title = group.querySelector("h3").textContent;

  group.querySelectorAll("button").forEach(b =>
    b.classList.remove("active")
  );
  btn.classList.add("active");

  if (title === "Category") {
    let value = btn.textContent.toLowerCase();
    if (value === "tops") value = "top";
    if (value === "bottoms") value = "bottom";
    filters.category = value;
  }

  if (title === "Size") {
    filters.size =
      btn.textContent === "All"
        ? "all"
        : btn.textContent;
  }

  applyFilters();
});

/* ======================
   PRICE FILTER
====================== */
const priceRange = document.querySelector('input[type="range"]');
const priceText = priceRange.nextElementSibling;

priceRange.addEventListener("input", () => {
  filters.maxPrice = Number(priceRange.value);
  priceText.textContent = `$0 - $${priceRange.value}`;
  applyFilters();
});

/* ======================
   ADD TO CART
====================== */
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".buy-btn");
  if (!btn) return;

  const product = {
    id: Number(btn.dataset.id),
    name: btn.dataset.name,
    price: Number(btn.dataset.price),
  };

  await addToCart(product);
  renderCartCount();
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  // don't trigger when clicking Buy button
  if (e.target.closest(".buy-btn")) return;

  const id = card.dataset.id;

  // product.html is in the SAME folder as shop.html
  window.location.href = `product.html?id=${id}`;
});
