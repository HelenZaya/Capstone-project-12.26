const translations = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
    },
    shop: {
      title: "Shop",
      count: "Products",
    },
    filter: {
      category: "Category",
      size: "Size",
      price: "Price Range",
    },
  },

  mn: {
    nav: {
      home: "Нүүр",
      shop: "Дэлгүүр",
      about: "Бидний тухай",
      contact: "Холбоо барих",
    },
    shop: {
      title: "Дэлгүүр",
      count: "Бараа",
    },
    filter: {
      category: "Ангилал",
      size: "Хэмжээ",
      price: "Үнийн хүрээ",
    },
  },
};

let currentLang = localStorage.getItem("lang") || "en";

/* ======================
   APPLY LANGUAGE
====================== */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n.split(".");
    let text = translations[lang];

    key.forEach(k => {
      text = text?.[k];
    });

    if (text) el.textContent = text;
  });

  updateLangButtons();
}

/* ======================
   BUTTON UI
====================== */
function updateLangButtons() {
  document.querySelectorAll(".lang").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.textContent.toLowerCase() === currentLang
    );
  });
}

/* ======================
   EVENTS
====================== */
document.addEventListener("click", e => {
  const btn = e.target.closest(".lang");
  if (!btn) return;

  applyLanguage(btn.textContent.toLowerCase());
});

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
});
