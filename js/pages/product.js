import { loadCart, addToCart } from "../api.js";
import { renderCartCount } from "../render.js";

/* ======================
   GET PRODUCT ID
====================== */
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

if (!productId) {
  document.querySelector(".product-page").innerHTML =
    "<h2>Invalid product</h2>";
  throw new Error("No product ID");
}

/* ======================
   INIT
====================== */
async function start() {
  await loadCart();
  renderCartCount();

  const product = await loadProductById(productId);
  renderProduct(product);
}

start();

/* ======================
   LOAD PRODUCT (JSON SERVER)
====================== */
async function loadProductById(id) {
  const res = await fetch(`http://localhost:3000/products/${id}`);

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return await res.json();
}

/* ======================
   RENDER
====================== */
function renderProduct(product) {
  document.getElementById("productImage").src = product.image;
  document.getElementById("productImage").alt = product.name;

  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = `$${product.price}`;
  document.getElementById("productDesc").textContent =
    product.description || "No description available.";

  document.getElementById("addToCartBtn").onclick = async () => {
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });

    renderCartCount();
  };
}
