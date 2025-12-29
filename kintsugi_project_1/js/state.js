// js/state.js
export const state = {
  // products from JSON
  products: [],

  // cart items
  cart: [],

  // ui-related state
  ui: {
    language: localStorage.getItem("lang") || "en", // en | mn
    theme: localStorage.getItem("theme") || "light"
  }
};

window.state = state;
