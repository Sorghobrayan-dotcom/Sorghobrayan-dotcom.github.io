/* Portfolio — Brayan Sorgho
   Amélioration progressive : chaque page reste lisible et navigable sans ce script. */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Langue : bascule instantanée FR ⇄ EN, sans rechargement ---------- */

  // Attributs traduits : l'anglais est porté par data-en-<attribut>, le français est l'original.
  var I18N_ATTRS = ["alt", "aria-label"];
  var titles = { fr: document.title, en: root.getAttribute("data-title-en") || document.title };
  var menuLabels = {
    fr: { open: "Ouvrir le menu", close: "Fermer le menu" },
    en: { open: "Open menu", close: "Close menu" }
  };

  function currentLang() {
    return root.getAttribute("data-lang") === "en" ? "en" : "fr";
  }

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang;
    document.title = titles[lang];

    I18N_ATTRS.forEach(function (attr) {
      document.querySelectorAll("[data-en-" + attr + "]").forEach(function (el) {
        if (!el.hasAttribute("data-fr-" + attr)) el.setAttribute("data-fr-" + attr, el.getAttribute(attr) || "");
        el.setAttribute(attr, el.getAttribute("data-" + lang + "-" + attr));
      });
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-set-lang") === lang));
    });

    if (toggle) updateToggleLabel();
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.getAttribute("data-set-lang");
      if (lang === currentLang()) return;
      applyLang(lang);
      try { localStorage.setItem("lang", lang); } catch (e) { /* stockage indisponible : choix non mémorisé */ }
      if (!reduceMotion) {
        root.classList.remove("is-lang-switching");
        void root.offsetWidth; // relance l'animation
        root.classList.add("is-lang-switching");
      }
    });
  });

  /* ---------- En-tête posé sur le bandeau d'accueil ---------- */

  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");

  if (header && header.classList.contains("site-header--overlay")) {
    if (hero && "IntersectionObserver" in window) {
      // Transparent tant que le bandeau sombre est sous l'en-tête, blanc ensuite.
      new IntersectionObserver(function (entries) {
        header.classList.toggle("is-solid", !entries[0].isIntersecting);
      }, { rootMargin: "-" + header.offsetHeight + "px 0px 0px 0px" }).observe(hero);
    } else {
      header.classList.add("is-solid");
    }
  }

  /* ---------- Menu mobile ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function updateToggleLabel() {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", menuLabels[currentLang()][open ? "close" : "open"]);
  }

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (header) header.classList.toggle("is-menu-open", open);
      updateToggleLabel();
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    window.matchMedia("(min-width: 881px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  applyLang(currentLang());

  /* ---------- Lien actif : section visible dans la navigation ou le sommaire ---------- */

  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy] a[href*='#']"));

  if (spyLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    spyLinks.forEach(function (link) {
      var id = link.hash.slice(1);
      if (document.getElementById(id)) (byId[id] = byId[id] || []).push(link);
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(function (link) { link.classList.remove("is-active"); });
        (byId[entry.target.id] || []).forEach(function (link) { link.classList.add("is-active"); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    // Toutes les sections sont observées : celles sans lien (l'ouverture) effacent la surbrillance.
    document.querySelectorAll("main section[id]").forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Apparition douce des blocs au défilement ---------- */

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var reveal = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    revealables.forEach(function (el) { reveal.observe(el); });
  }

  /* ---------- Divers ---------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-print]").forEach(function (button) {
    button.addEventListener("click", function () { window.print(); });
  });
})();
