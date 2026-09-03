/* ==========================================================================
   NUNO GARCIA — DJ | Site scripts
   ========================================================================== */

/* ---------- Central contact config — edit once, used across the site ---------- */
const SITE_CONFIG = {
  email: "info@djnunogarcia.com",
  phone: "+351 918 731 114",
  whatsappNumber: "351918731114", // digits only, country code first, no + or spaces
  instagram: "https://instagram.com/djnunogarcia",
  facebook: "https://facebook.com/djnunogarcia",
  city: "Lisboa, Portugal",
  // TODO: set the real Get Wild Eventos website URL here once confirmed.
  getwildUrl: ""
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNavLink();
  initReveal();
  initLightbox();
  initGalleryFilter();
  initContactForm();
  initWhatsAppLinks();
  initFooterYear();
});

/* ---------- Header: solid on scroll ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    })
  );
}

/* ---------- Highlight current page in nav ---------- */
function initActiveNavLink() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === path) a.classList.add("is-active");
  });
}

/* ---------- Scroll reveal via IntersectionObserver ----------
   Only elements that start below the fold get "armed" (hidden then
   faded in on scroll). Anything already on screen when the page loads
   is left alone, so content can never be stuck invisible. */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add("reveal-armed");
      io.observe(el);
    }
  });
}

/* ---------- Gallery lightbox ---------- */
function initLightbox() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  if (!items.length || !lightbox) return;
  const labelEl = lightbox.querySelector(".lightbox-label");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const open = (label) => {
    if (labelEl) labelEl.textContent = label;
    lightbox.classList.add("is-open");
  };
  const close = () => lightbox.classList.remove("is-open");

  items.forEach((item) => {
    item.addEventListener("click", () => open(item.dataset.label || "Nuno Garcia"));
  });
  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Gallery category filter ---------- */
function initGalleryFilter() {
  const filterBar = document.querySelector(".gallery-filters");
  const items = document.querySelectorAll(".gallery-item");
  if (!filterBar || !items.length) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filterBar.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    items.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.style.display = match ? "" : "none";
    });
  });
}

/* ---------- Contact form: builds a mailto with the submitted data ---------- */
function initContactForm() {
  const form = document.querySelector("#orcamento-form");
  const status = document.querySelector(".form-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome") || "";
    const emailCliente = data.get("email") || "";
    const telefone = data.get("telefone") || "";
    const tipoEvento = data.get("tipo_evento") || "";
    const dataEvento = data.get("data_evento") || "";
    const localizacao = data.get("localizacao") || "";
    const mensagem = data.get("mensagem") || "";

    const subject = `Pedido de Orçamento — ${tipoEvento || "Evento"} — ${nome}`;
    const body =
      `Nome: ${nome}\n` +
      `Email: ${emailCliente}\n` +
      `Telefone: ${telefone}\n` +
      `Tipo de evento: ${tipoEvento}\n` +
      `Data do evento: ${dataEvento}\n` +
      `Localização: ${localizacao}\n\n` +
      `Mensagem:\n${mensagem}`;

    const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    if (status) {
      status.textContent = "A abrir o seu cliente de email com o pedido preenchido...";
    }
  });
}

/* ---------- Wire up every WhatsApp / phone / email touchpoint from one config ---------- */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    const presetMsg = encodeURIComponent(
      "Olá Nuno! Gostaria de pedir um orçamento para o meu evento."
    );
    el.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${presetMsg}`;
  });
  document.querySelectorAll("[data-email-link]").forEach((el) => {
    el.href = `mailto:${SITE_CONFIG.email}`;
    if (el.dataset.emailLink === "text") el.textContent = SITE_CONFIG.email;
  });
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.href = `tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`;
    if (el.dataset.phoneLink === "text") el.textContent = SITE_CONFIG.phone;
  });
  document.querySelectorAll("[data-instagram-link]").forEach((el) => (el.href = SITE_CONFIG.instagram));
  document.querySelectorAll("[data-facebook-link]").forEach((el) => (el.href = SITE_CONFIG.facebook));
  document.querySelectorAll("[data-city]").forEach((el) => (el.textContent = SITE_CONFIG.city));
  document.querySelectorAll("[data-getwild-link]").forEach((el) => {
    if (SITE_CONFIG.getwildUrl) {
      el.href = SITE_CONFIG.getwildUrl;
    } else {
      el.removeAttribute("target");
      el.addEventListener("click", (e) => e.preventDefault());
    }
  });
}

function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}
