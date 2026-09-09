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
  x: "https://x.com/djnunogarcia",
  linkedin: "https://www.linkedin.com/in/nunomgarcia?originalSubdomain=pt",
  youtube: "https://www.youtube.com/djnunogarcia",
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
  const boxEl = lightbox.querySelector(".lightbox-box");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const open = (label, photoVar) => {
    if (labelEl) labelEl.textContent = label;
    if (boxEl) boxEl.style.setProperty("--photo", photoVar && photoVar.trim() ? photoVar : "none");
    lightbox.classList.add("is-open");
  };
  const close = () => lightbox.classList.remove("is-open");

  items.forEach((item) => {
    item.addEventListener("click", () =>
      open(item.dataset.label || "Nuno Garcia", item.style.getPropertyValue("--photo"))
    );
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
  const grid = document.querySelector(".gallery-grid");
  const djPanel = document.querySelector(".djsets-panel");
  if (!filterBar || !items.length) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filterBar.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;

    // "DJ Sets" is a separate panel (YouTube links, not photos): show it only
    // when its own tab is selected, and never mix its content into "Todos".
    if (filter === "djsets") {
      if (grid) grid.hidden = true;
      if (djPanel) djPanel.hidden = false;
      return;
    }
    if (grid) grid.hidden = false;
    if (djPanel) djPanel.hidden = true;

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

  const notFilled = "(não indicado)";
  const formatDate = (iso) => {
    if (!iso) return notFilled;
    const [y, m, d] = iso.split("-");
    return y && m && d ? `${d}/${m}/${y}` : iso;
  };

  // "Outro" in Tipo de Evento reveals a free-text field so the visitor can
  // say what it actually is instead of being stuck with a generic label.
  const tipoEventoSelect = document.querySelector("#tipo_evento");
  const tipoEventoOutroField = document.querySelector("#tipoEventoOutroField");
  const tipoEventoOutroInput = document.querySelector("#tipo_evento_outro");
  if (tipoEventoSelect && tipoEventoOutroField) {
    const syncOutroField = () => {
      const isOutro = tipoEventoSelect.value === "Outro";
      tipoEventoOutroField.hidden = !isOutro;
      if (!isOutro && tipoEventoOutroInput) tipoEventoOutroInput.value = "";
    };
    tipoEventoSelect.addEventListener("change", syncOutroField);
    syncOutroField();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome") || "";
    const emailCliente = data.get("email") || "";
    const telefone = data.get("telefone") || notFilled;
    let tipoEvento = data.get("tipo_evento") || "";
    const tipoEventoOutro = (data.get("tipo_evento_outro") || "").trim();
    if (tipoEvento === "Outro" && tipoEventoOutro) {
      tipoEvento = `Outro — ${tipoEventoOutro}`;
    }
    const dataEvento = formatDate(data.get("data_evento"));
    const localizacao = data.get("localizacao") || notFilled;
    const mensagem = data.get("mensagem") || notFilled;

    const subject = `Pedido de Orçamento — ${tipoEvento || "Evento"} — ${nome}`;
    // Every field from the form goes into the body, in the same order they
    // appear on the page, so nothing submitted is ever left out of the email.
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
  document.querySelectorAll("[data-x-link]").forEach((el) => (el.href = SITE_CONFIG.x));
  document.querySelectorAll("[data-linkedin-link]").forEach((el) => (el.href = SITE_CONFIG.linkedin));
  document.querySelectorAll("[data-youtube-link]").forEach((el) => (el.href = SITE_CONFIG.youtube));
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
