const modal = document.getElementById("cart-modal");
const container = document.getElementById("cart-container");
const openBtn = document.getElementById("open-cart");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

openBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  modal.classList.remove("hidden");

  const res = await fetch("../html/cart.html");
  container.innerHTML = await res.text();

  // remove old cart script
  document.getElementById("cart-script")?.remove();

  const script = document.createElement("script");
  script.type = "module";
  script.src = "../js/pages/cart.js"; // ✅ CORRECT
  script.id = "cart-script";
  document.body.appendChild(script);
});

function closeModal() {
  modal.classList.add("hidden");
  container.innerHTML = "";
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
