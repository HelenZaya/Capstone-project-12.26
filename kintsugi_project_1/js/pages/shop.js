import { loadCart, addToCart } from "../api.js";
import { renderCartCount } from "../render.js";

/* ======================
   INIT
====================== */
async function start() {
  await loadCart();
  renderCartCount();
}

start();

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

/* ======================
   FILTER STATE
====================== */
const productCards = document.querySelectorAll(".product-card");

let filters = {
  category: "all",
  size: "all",
  maxPrice: 200,
};

/* ======================
   APPLY FILTERS
====================== */
function applyFilters() {
  productCards.forEach(card => {
    const id = Number(card.dataset.id);
    const product = products.find(p => p.id === id);

    if (!product) return;

    const matchesCategory =
      filters.category === "all" ||
      product.category === filters.category;

    const matchesSize =
      filters.size === "all" ||
      product.sizes.includes(filters.size);

    const matchesPrice =
      product.price <= filters.maxPrice;

    card.style.display =
      matchesCategory && matchesSize && matchesPrice
        ? "block"
        : "none";
  });
}


/* ======================
   CATEGORY FILTER
====================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter button");
  if (!btn) return;

  const group = btn.closest(".filter");
  if (!group || !group.querySelector("h3")) return;

  const title = group.querySelector("h3").textContent;

  // CATEGORY
  if (title === "Category") {
    group.querySelectorAll("button").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    filters.category = btn.textContent.toLowerCase();
    if (filters.category === "all") filters.category = "all";

    applyFilters();
  }

  // SIZE
  if (title === "Size") {
    group.querySelectorAll("button").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    filters.size = btn.textContent;
    if (filters.size === "All") filters.size = "all";

    applyFilters();
  }
});

/* ======================
   PRICE FILTER
====================== */
const priceRange = document.querySelector('input[type="range"]');
const priceText = priceRange?.nextElementSibling;

if (priceRange) {
  priceRange.addEventListener("input", () => {
    filters.maxPrice = Number(priceRange.value);
    if (priceText) {
      priceText.textContent = `$0 - $${priceRange.value}`;
    }
    applyFilters();
  });
}
