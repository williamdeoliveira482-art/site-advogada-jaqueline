/* ==========================================================================
   CARDOSO BITTENCOURT ADVOCACIA — Interações
   Comportamentos discretos: header ao rolar, menu mobile, revelação
   suave de seções e envio do formulário de contato.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Header: estado sólido ao rolar ---------- */
  var header = document.querySelector(".site-header");
  function updateHeaderState() {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  menuToggle.addEventListener("click", function () {
    var isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Revelação suave das seções ao entrar na tela ---------- */
  var revealTargets = document.querySelectorAll("[data-reveal]");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Formulário de contato ----------
     Este projeto é estático (sem backend). O formulário está validado
     e pronto para ser conectado a um serviço de envio. Opções comuns:

       1) Formspree / Web3Forms — trocar o "action" do <form> e o método
          de envio (fetch) pela URL do serviço escolhido.
       2) Um webhook (ex.: n8n) — enviar os dados via fetch() para a URL
          do webhook e tratar o roteamento/CRM/E-mail no próprio fluxo.
       3) Função serverless (Vercel/Netlify) — criar um endpoint próprio
          que recebe os dados e dispara o e-mail.

     Abaixo, o formulário apenas valida os campos e exibe uma confirmação
     local, para que o layout funcione imediatamente após o download. */

  var form = document.getElementById("contato-form");
  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Verifique os campos preenchidos e tente novamente.";
      form.reportValidity();
      return;
    }

    // Ponto de integração: troque este bloco pelo envio real (fetch para
    // um endpoint, webhook de automação, ou serviço de formulários).
    var dados = {
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      mensagem: form.mensagem.value.trim()
    };

    // Exemplo de envio para um webhook (descomente e ajuste a URL):
    // fetch("https://SEU-ENDPOINT-AQUI", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(dados)
    // });

    status.textContent = "Mensagem recebida. Em breve o escritório entrará em contato.";
    form.reset();
  });

})();
