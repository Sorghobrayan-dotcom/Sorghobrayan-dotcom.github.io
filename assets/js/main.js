/* Portfolio — Brayan Sorgho
   Amélioration progressive : chaque page reste lisible et navigable sans ce script. */

(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const store = (area, key, value) => {
    try { return value === undefined ? window[area].getItem(key) : window[area].setItem(key, value); } catch (e) { return null; }
  };

  /* ---------- Langue : bascule instantanée FR ⇄ EN, sans rechargement ---------- */

  const I18N_ATTRS = ["alt", "aria-label", "placeholder"];
  const titles = { fr: document.title, en: root.getAttribute("data-title-en") || document.title };
  const labels = {
    fr: { open: "Ouvrir le menu", close: "Fermer le menu" },
    en: { open: "Open menu", close: "Close menu" }
  };
  const currentLang = () => (root.getAttribute("data-lang") === "en" ? "en" : "fr");

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang;
    document.title = titles[lang];
    I18N_ATTRS.forEach((attr) => {
      $$(`[data-en-${attr}]`).forEach((el) => {
        if (!el.hasAttribute(`data-fr-${attr}`)) el.setAttribute(`data-fr-${attr}`, el.getAttribute(attr) || "");
        el.setAttribute(attr, el.getAttribute(`data-${lang}-${attr}`));
      });
    });
    $$("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-set-lang") === lang));
    });
    updateMenuLabel();
  }

  $$("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-set-lang");
      if (lang === currentLang()) return;
      applyLang(lang);
      store("localStorage", "lang", lang);
      if (!reduceMotion) {
        root.classList.remove("is-lang-switching");
        void root.offsetWidth; // relance l'animation
        root.classList.add("is-lang-switching");
      }
    });
  });

  /* ---------- Menu : bouton rond flottant et panneau latéral ---------- */

  const menuBtn = $(".menu-btn");
  const menu = $("#menu");

  function updateMenuLabel() {
    if (!menuBtn) return;
    const open = root.classList.contains("menu-open");
    menuBtn.setAttribute("aria-label", labels[currentLang()][open ? "close" : "open"]);
  }

  function setMenu(open) {
    if (!menu) return;
    root.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.inert = !open;
    updateMenuLabel();
    if (open) {
      const first = $(".menu__links a", menu);
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 300);
    }
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a") || event.target.classList.contains("menu__backdrop")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && root.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  applyLang(currentLang());

  /* ---------- Intro : pluie binaire, nom, photo, puis ouverture du site ---------- */

  function startRain(canvas) {
    const ctx = canvas.getContext("2d");
    const size = window.innerWidth < 600 ? 17 : 22;
    let drops = [];
    let speeds = [];
    let dpr = 1;
    let raf = 0;
    let last = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const cols = Math.ceil(window.innerWidth / size);
      const rows = window.innerHeight / size;
      // Départs étalés sur toute la hauteur : l'écran est couvert dès la première seconde.
      drops = Array.from({ length: cols }, () => Math.random() * rows * 1.2 - rows * 0.4);
      speeds = Array.from({ length: cols }, () => 0.7 + Math.random() * 1);
      ctx.font = `${size * dpr}px ui-monospace, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#030603";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function frame(time) {
      raf = requestAnimationFrame(frame);
      if (time - last < 38) return; // environ 26 images par seconde, l'allure des films
      last = time;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(3, 6, 3, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowColor = "#3cff74";
      ctx.shadowBlur = 8 * dpr;
      for (let i = 0; i < drops.length; i++) {
        const x = i * size * dpr;
        const y = drops[i] * size * dpr;
        ctx.fillStyle = "#2be36a";
        ctx.fillText(Math.random() < 0.5 ? "0" : "1", x, y - size * dpr);
        ctx.fillStyle = "#e6ffec";
        ctx.fillText(Math.random() < 0.5 ? "0" : "1", x, y);
        drops[i] += speeds[i];
        if (y > canvas.height && Math.random() > 0.965) drops[i] = Math.random() * -12;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }

  // Les lettres défilent en 0 et 1 avant de se fixer, de gauche à droite.
  function scramble(el, duration) {
    const text = el.getAttribute("data-text") || "";
    const start = performance.now();
    const step = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      const fixed = Math.floor(progress * text.length);
      let html = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (i < fixed || char === " ") html += char;
        else html += `<span class="bit">${Math.random() < 0.5 ? "0" : "1"}</span>`;
      }
      el.innerHTML = html;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = text;
    };
    requestAnimationFrame(step);
  }

  function runIntro(onDone) {
    const intro = $(".intro");
    if (!intro || !root.classList.contains("intro-on")) return onDone();

    const stopRain = startRain($(".intro__rain", intro));
    const timers = [];
    let finished = false;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    function finish() {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      stopRain();
      store("sessionStorage", "intro", "1");
      // Le rideau remonte ; le visage prend sa place, puis le reste du site apparaît.
      root.classList.add("from-intro");
      intro.classList.add("is-leaving");
      onDone();
      setTimeout(() => {
        root.classList.remove("intro-on");
        intro.remove();
      }, 1150);
    }

    // 1. Pluie de 0 et de 1 sur tout l'écran.
    // 2. La pluie s'arrête : plus aucun chiffre ne tombe.
    at(3200, () => { stopRain(); intro.classList.add("is-stopped"); });
    // 3. Le nom se décode lettre par lettre.
    at(3700, () => {
      intro.classList.add("is-name");
      $$("[data-text]", intro).forEach((el, i) => setTimeout(() => scramble(el, i ? 1300 : 800), i * 260));
    });
    // 4. Le nom s'efface et le site s'ouvre sur le visage.
    at(6000, () => intro.classList.add("is-name-out"));
    at(6400, finish);

    const skip = $(".intro__skip", intro);
    if (skip) skip.addEventListener("click", finish);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") finish(); });
  }

  function ready() {
    root.classList.add("is-ready");
    if (root.classList.contains("curtain-in")) {
      requestAnimationFrame(() => root.classList.add("curtain-go"));
      setTimeout(() => root.classList.remove("curtain-in", "curtain-go"), 1100);
    }
  }

  runIntro(ready);

  /* ---------- Transition entre les pages : un rideau sombre monte puis redescend ---------- */

  if (!reduceMotion) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
      const samePage = url.pathname.replace(/index\.html$/, "") === location.pathname.replace(/index\.html$/, "");
      if (samePage) return; // ancre sur la même page : défilement normal
      event.preventDefault();
      store("sessionStorage", "curtain", "1");
      root.classList.add("is-leaving");
      setTimeout(() => { location.href = url.href; }, 700);
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) root.classList.remove("is-leaving");
    });
  }

  /* ---------- État de défilement : le bouton de menu apparaît ---------- */

  let lastY = window.scrollY;
  let scrollDir = -1;
  let scrollVel = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const delta = y - lastY;
    if (delta !== 0) scrollDir = delta > 0 ? -1 : 1;
    scrollVel = Math.min(Math.abs(delta), 80);
    lastY = y;
    root.classList.toggle("is-scrolled", y > 140);
  }, { passive: true });
  root.classList.toggle("is-scrolled", window.scrollY > 140);

  /* ---------- Boutons magnétiques ---------- */

  if (finePointer && !reduceMotion) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.getAttribute("data-magnetic")) || 0.35;
      const label = $(".round-btn__label", el);
      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        if (label) label.style.transform = `translate(${x * strength * 0.4}px, ${y * strength * 0.4}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
        if (label) label.style.transform = "";
      });
    });
  }

  /* ---------- Animations pilotées image par image ---------- */

  const hero = $(".hero");
  const marquee = $("[data-marquee] .marquee__track");
  const work = $("[data-work]");
  const preview = $(".preview");
  const ribbons = $$("[data-ribbon]");
  const contact = $(".contact");

  let heroVisible = true;
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => { heroVisible = entries[0].isIntersecting; }).observe(hero);
  }

  // Halo lumineux qui suit le pointeur dans le bandeau.
  const spot = { x: 50, y: 32, tx: 50, ty: 32 };
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      spot.tx = ((event.clientX - rect.left) / rect.width) * 100;
      spot.ty = ((event.clientY - rect.top) / rect.height) * 100;
    });
  }

  // Aperçu des projets qui suit le pointeur.
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const box = { x: pointer.x, y: pointer.y };
  if (work && preview && finePointer) {
    window.addEventListener("pointermove", (event) => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
    $$("[data-preview]", work).forEach((link) => {
      const show = () => {
        preview.style.setProperty("--slide", link.getAttribute("data-preview"));
        preview.classList.add("is-active");
      };
      link.addEventListener("pointerenter", show);
      link.addEventListener("focus", show);
    });
    work.addEventListener("pointerleave", () => preview.classList.remove("is-active"));
    work.addEventListener("focusout", () => preview.classList.remove("is-active"));
  }

  // Rubans de compétences : position de départ centrée, recalculée au redimensionnement.
  const ribbonState = ribbons.map((ribbon) => ({
    ribbon,
    track: $(".ribbon__track", ribbon),
    dir: parseFloat(ribbon.getAttribute("data-ribbon")) || 1,
    base: 0
  }));
  const measureRibbons = () => ribbonState.forEach((r) => { r.base = -(r.track.scrollWidth - window.innerWidth) / 2; });
  measureRibbons();
  window.addEventListener("resize", measureRibbons);

  let marqueeX = 0;
  let lastTime = performance.now();

  function tick(now) {
    const dt = Math.min(now - lastTime, 64) / 16.67;
    lastTime = now;

    if (hero && finePointer && !reduceMotion) {
      spot.x = lerp(spot.x, spot.tx, 0.08);
      spot.y = lerp(spot.y, spot.ty, 0.08);
      hero.style.setProperty("--mx", `${spot.x.toFixed(2)}%`);
      hero.style.setProperty("--my", `${spot.y.toFixed(2)}%`);
    }

    if (marquee && heroVisible && !reduceMotion) {
      const half = marquee.scrollWidth / 2;
      marqueeX += scrollDir * (0.7 + scrollVel * 0.12) * dt;
      if (marqueeX <= -half) marqueeX += half;
      if (marqueeX > 0) marqueeX -= half;
      marquee.style.transform = `translate3d(${marqueeX.toFixed(2)}px, 0, 0)`;
    }
    scrollVel *= 0.92;

    if (preview && preview.classList.contains("is-active")) {
      box.x = lerp(box.x, pointer.x, 0.16);
      box.y = lerp(box.y, pointer.y, 0.16);
      preview.style.transform = `translate3d(${box.x.toFixed(1)}px, ${box.y.toFixed(1)}px, 0)`;
    } else if (preview) {
      box.x = pointer.x;
      box.y = pointer.y;
      preview.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`;
    }

    if (!reduceMotion) {
      ribbonState.forEach((r) => {
        const rect = r.ribbon.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const shift = (progress - 0.5) * window.innerWidth * 0.4 * r.dir;
        r.track.style.transform = `translate3d(${(r.base + shift).toFixed(1)}px, 0, 0)`;
      });
    }

    if (contact) {
      const rect = contact.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / window.innerHeight, 0, 1);
      contact.style.setProperty("--curve", `${((1 - progress) * 12).toFixed(2)}vh`);
    }

    requestAnimationFrame(tick);
  }

  if (reduceMotion) ribbonState.forEach((r) => { r.track.style.transform = `translate3d(${r.base}px, 0, 0)`; });
  requestAnimationFrame(tick);

  /* ---------- Apparitions au défilement : blocs, mots, compteurs ---------- */

  // Découpe un texte en mots qui monteront un à un ; chaque langue repart de zéro.
  $$("[data-words]").forEach((el) => {
    const groups = $$("[lang]", el).length ? $$("[lang]", el) : [el];
    groups.forEach((group) => {
      let index = 0;
      const walker = document.createTreeWalker(group, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { fragment.appendChild(document.createTextNode(" ")); return; }
          const word = document.createElement("span");
          word.className = "word";
          const inner = document.createElement("span");
          inner.className = "word__in";
          inner.style.setProperty("--i", index++);
          inner.textContent = part;
          word.appendChild(inner);
          fragment.appendChild(word);
        });
        node.parentNode.replaceChild(fragment, node);
      });
    });
  });

  function countUp(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    if (Number.isNaN(target) || reduceMotion) return;
    const start = performance.now();
    const duration = 1600;
    const step = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const revealables = $$(".reveal, [data-words]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        $$("[data-count]", entry.target).forEach(countUp);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    revealables.forEach((el) => observer.observe(el));
  }

  /* ---------- Sommaire actif sur les pages projet ---------- */

  const spyLinks = $$("[data-spy] a[href*='#']");
  if (spyLinks.length && "IntersectionObserver" in window) {
    const byId = {};
    spyLinks.forEach((link) => {
      const id = link.hash.slice(1);
      if (document.getElementById(id)) (byId[id] = byId[id] || []).push(link);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        spyLinks.forEach((link) => link.classList.remove("is-active"));
        (byId[entry.target.id] || []).forEach((link) => link.classList.add("is-active"));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$("main section[id]").forEach((section) => spy.observe(section));
  }

  /* ---------- Projets : filtres et vue liste ou grille ---------- */

  const views = $("[data-views]");
  if (views) {
    $$("[data-view-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        views.setAttribute("data-view", button.getAttribute("data-view-btn"));
        $$("[data-view-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      });
    });
    $$("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        $$("[data-tags]", views).forEach((item) => {
          item.hidden = filter !== "all" && !item.getAttribute("data-tags").split(" ").includes(filter);
        });
      });
    });
  }

  /* ---------- Contact : le formulaire ouvre la messagerie avec le message prêt ---------- */

  const form = $("[data-mailto-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const get = (key) => String(data.get(key) || "").trim();
      const fr = currentLang() === "fr";
      const subject = `${fr ? "Prise de contact : " : "Getting in touch: "}${get("name") || "Portfolio"}`;
      const body = [get("message"), "", get("name"), get("email"), get("organisation")].filter((line, i) => i < 2 || line).join("\n");
      window.location.href = `mailto:${form.getAttribute("data-mailto-form")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = $(".form-status", form);
      if (status) status.hidden = false;
    });
  }

  /* ---------- Heure locale à Rabat, année, impression ---------- */

  const clocks = $$("[data-clock]");
  if (clocks.length) {
    const zone = "Africa/Casablanca";
    const updateClock = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: zone }).format(now);
      let offset = "GMT+1";
      try {
        const part = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
          .formatToParts(now).find((p) => p.type === "timeZoneName");
        if (part) offset = part.value;
      } catch (e) { /* navigateur ancien : on garde GMT+1 */ }
      clocks.forEach((el) => { el.textContent = `${time} ${offset}`; });
    };
    updateClock();
    setInterval(updateClock, 30000);
  }

  $$("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  $$("[data-print]").forEach((button) => button.addEventListener("click", () => window.print()));
})();
