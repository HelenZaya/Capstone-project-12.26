import { state } from "../state.js";
import { loadCart, addToCart } from "../api.js";
import { renderCartCount } from "../render.js";

/* ======================
   FILTER STATE
====================== */
const filters = {
  category: "all",
  size: "all",
  maxPrice: 200
};

/* ======================
   INIT
====================== */
async function start() {
  await loadCart();
  renderCartCount();
  await loadProducts();
  renderProducts();
  applyFilters();
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

  state.products = await res.json(); // ✅ IMPORTANT
}

/* ======================
   RENDER PRODUCTS
====================== */
function renderProducts() {
  const container = document.querySelector(".products");
  if (!container) return;

  container.innerHTML = "";

  state.products.forEach(p => {
    container.innerHTML += `
      <div class="product-card"
           data-id="${p.id}"
           data-category="${p.category}"
           data-price="${p.price}"
           data-sizes="${p.sizes?.join(",") || "all"}">

        <img src="${p.image}" alt="${p.name}" />

        <h4>${p.name}</h4>
        <p>$${p.price}</p>

        <button
          class="buy-btn"
          data-id="${p.id}"
          data-name="${p.name}"
          data-price="${p.price}"
          data-image="${p.image}">
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

    const matchPrice = price <= filters.maxPrice;

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
    filters.category =
      btn.textContent.toLowerCase() === "all"
        ? "all"
        : btn.textContent.toLowerCase();
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
const priceText = priceRange?.nextElementSibling;

if (priceRange) {
  priceRange.addEventListener("input", () => {
    filters.maxPrice = Number(priceRange.value);
    priceText.textContent = `$0 - $${priceRange.value}`;
    applyFilters();
  });
}

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
    image: btn.dataset.image, // ✅ REQUIRED FOR THUMBNAILS
    qty: 1
  };

  await addToCart(product);
  renderCartCount();
});

/* ======================
   PRODUCT PAGE NAV
====================== */
document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  if (e.target.closest(".buy-btn")) return;

  const id = card.dataset.id;
  window.location.href = `product.html?id=${id}`;
});
