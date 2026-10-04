/* =========================================================
   MARCELO DE FLÁVIO — PORTFÓLIO
   JavaScript principal
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTOS PRINCIPAIS
     ======================================================= */

  const body = document.body;
  const html = document.documentElement;

  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");

  const themeBtn = document.getElementById("themeBtn");
  const langBtn = document.getElementById("langBtn");

  const clock = document.getElementById("clock");
  const year = document.getElementById("year");

  const progress = document.querySelector(".progress");


  /* =======================================================
     MENU MOBILE
     ======================================================= */

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

    });

    document.querySelectorAll(".nav a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Abrir menu"
        );

      });

    });

  }


  /* =======================================================
     TEMA CLARO / ESCURO
     ======================================================= */

  function updateThemeIcon() {

    if (!themeBtn) return;

    const darkMode =
      body.classList.contains("dark");

    themeBtn.textContent =
      darkMode ? "☀" : "◐";

    themeBtn.setAttribute(
      "aria-label",
      darkMode
        ? "Mudar para tema claro"
        : "Mudar para tema escuro"
    );

  }


  const savedTheme =
    localStorage.getItem("marcelo-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  updateThemeIcon();


  if (themeBtn) {

    themeBtn.addEventListener("click", () => {

      body.classList.toggle("dark");

      const isDark =
        body.classList.contains("dark");

      localStorage.setItem(
        "marcelo-theme",
        isDark ? "dark" : "light"
      );

      updateThemeIcon();

    });

  }


  /* =======================================================
     IDIOMA
     ======================================================= */

  const translations = {

    pt: {

      "nav.home": "Início",
      "nav.about": "Quem sou",
      "nav.path": "Trajetória",
      "nav.skills": "Skills",
      "nav.impact": "Impacto",
      "nav.vision": "Visão",
      "nav.videos": "Vídeos",
      "nav.gallery": "Galeria",
      "nav.music": "Músicas",
      "nav.contact": "Contacto",
      "nav.cv": "CV",

      "hero.role":
        "Jovem Líder • Desenvolvedor Web • Mentor • Defensor dos Direitos das Crianças",

      "hero.lead":
        "Tecnologia para criar. Voz para representar. Liderança para transformar.",

      "hero.about":
        "Conhecer a minha história",

      "hero.cv":
        "Ver CV",

      "contact.title":
        "Vamos conversar?",

      "contact.description":
        "Se quiseres entrar em contacto comigo, conhecer o meu trabalho ou colaborar num projeto, estou disponível para conversar."

    },

    en: {

      "nav.home": "Home",
      "nav.about": "About me",
      "nav.path": "Journey",
      "nav.skills": "Skills",
      "nav.impact": "Impact",
      "nav.vision": "Vision",
      "nav.videos": "Videos",
      "nav.gallery": "Gallery",
      "nav.music": "Music",
      "nav.contact": "Contact",
      "nav.cv": "CV",

      "hero.role":
        "Young Leader • Web Developer • Mentor • Child Rights Defender",

      "hero.lead":
        "Technology to create. A voice to represent. Leadership to transform.",

      "hero.about":
        "Discover my story",

      "hero.cv":
        "View CV",

      "contact.title":
        "Let's connect?",

      "contact.description":
        "If you want to contact me, learn more about my work or collaborate on a project, I am available to talk."

    }

  };


  function applyLanguage(language) {

    const dictionary =
      translations[language] || translations.pt;

    html.lang =
      language === "en" ? "en" : "pt-MZ";

    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.dataset.i18n;

        if (
          dictionary[key] !== undefined
        ) {
          element.textContent =
            dictionary[key];
        }

      });

    if (langBtn) {

      langBtn.textContent =
        language === "en" ? "PT" : "EN";

    }

    localStorage.setItem(
      "marcelo-language",
      language
    );

  }


  let currentLanguage =
    localStorage.getItem("marcelo-language") || "pt";

  applyLanguage(currentLanguage);


  if (langBtn) {

    langBtn.addEventListener("click", () => {

      currentLanguage =
        currentLanguage === "pt"
          ? "en"
          : "pt";

      applyLanguage(currentLanguage);

    });

  }


  /* =======================================================
     RELÓGIO
     ======================================================= */

  function updateClock() {

    if (!clock) return;

    const now = new Date();

    const locale =
      currentLanguage === "en"
        ? "en-GB"
        : "pt-PT";

    clock.textContent =
      now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

  }

  updateClock();

  setInterval(updateClock, 1000);


  /* =======================================================
     ANO AUTOMÁTICO
     ======================================================= */

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     ANIMAÇÕES — REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     PROGRESSO DA PÁGINA
     ======================================================= */

  let scrolling = false;

  function updateProgress() {

    if (!progress) return;

    const documentHeight =
      document.documentElement.scrollHeight;

    const viewportHeight =
      document.documentElement.clientHeight;

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const total =
      documentHeight - viewportHeight;

    const percentage =
      total > 0
        ? (scrollTop / total) * 100
        : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percentage))}%`;

    scrolling = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!scrolling) {

        window.requestAnimationFrame(
          updateProgress
        );

        scrolling = true;

      }

    },
    { passive: true }
  );

  updateProgress();


  /* =======================================================
     LIGHTBOX DA GALERIA
     ======================================================= */

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxClose =
    document.getElementById("lightboxClose");

  const galleryItems =
    document.querySelectorAll(".gallery-item");


  function openLightbox(src, alt = "") {

    if (
      !lightbox ||
      !lightboxImage ||
      !src
    ) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt;

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    body.style.overflow = "hidden";

  }


  function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    if (lightboxImage) {
      lightboxImage.src = "";
    }

    body.style.overflow = "";

  }


  galleryItems.forEach(item => {

    item.addEventListener("click", () => {

      const image =
        item.querySelector("img");

      const src =
        item.dataset.image ||
        image?.currentSrc ||
        image?.src;

      const alt =
        image?.alt ||
        "Imagem da galeria de Marcelo de Flávio";

      openLightbox(src, alt);

    });

  });


  if (lightboxClose) {
    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );
  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      event => {

        if (
          event.target === lightbox
        ) {
          closeLightbox();
        }

      }
    );

  }


  /* =======================================================
     MODAL DE VÍDEO
     ======================================================= */

  const videoModal =
    document.getElementById("videoModal");

  const videoFrame =
    document.getElementById("videoFrame");

  const videoClose =
    document.getElementById("videoClose");


  function youtubeEmbed(url) {

    if (!url) return "";

    try {

      const parsed =
        new URL(url);

      let videoId = "";

      if (
        parsed.hostname.includes("youtu.be")
      ) {

        videoId =
          parsed.pathname
            .replace("/", "")
            .split("/")[0];

      }

      else if (
        parsed.pathname.includes("/embed/")
      ) {

        videoId =
          parsed.pathname
            .split("/embed/")[1]
            .split("/")[0];

      }

      else {

        videoId =
          parsed.searchParams.get("v");

      }


      if (!videoId) {
        return url;
      }


      const params =
        new URLSearchParams();

      parsed.searchParams.forEach(
        (value, key) => {

          if (
            key !== "v" &&
            key !== "si"
          ) {
            params.set(key, value);
          }

        }
      );


      params.set("autoplay", "1");
      params.set("rel", "0");

      return (
        "https://www.youtube.com/embed/" +
        videoId +
        "?" +
        params.toString()
      );

    }

    catch (error) {

      console.warn(
        "URL de vídeo inválida:",
        error
      );

      return url;

    }

  }


  function openVideo(url) {

    if (
      !videoModal ||
      !videoFrame ||
      !url
    ) return;


    const iframe =
      document.createElement("iframe");

    iframe.src =
      youtubeEmbed(url);

    iframe.title =
      "Vídeo de Marcelo de Flávio";

    iframe.allow =
      "autoplay; encrypted-media; picture-in-picture; fullscreen";

    iframe.allowFullscreen = true;

    iframe.loading = "eager";

    videoFrame.innerHTML = "";

    videoFrame.appendChild(
      iframe
    );


    videoModal.classList.add("open");

    videoModal.setAttribute(
      "aria-hidden",
      "false"
    );

    body.style.overflow = "hidden";

  }


  function closeVideo() {

    if (!videoModal) return;

    videoModal.classList.remove(
      "open"
    );

    videoModal.setAttribute(
      "aria-hidden",
      "true"
    );

    if (videoFrame) {
      videoFrame.innerHTML = "";
    }

    body.style.overflow = "";

  }


  document
    .querySelectorAll("[data-video]")
    .forEach(element => {

      element.addEventListener(
        "click",
        event => {

          if (
            event.target.closest(
              "a, button"
            )
          ) {
            return;
          }

          const url =
            element.dataset.video;

          if (url) {
            openVideo(url);
          }

        }
      );

    });


  if (videoClose) {

    videoClose.addEventListener(
      "click",
      closeVideo
    );

  }


  if (videoModal) {

    videoModal.addEventListener(
      "click",
      event => {

        if (
          event.target === videoModal
        ) {
          closeVideo();
        }

      }
    );

  }


  /* =======================================================
     PESQUISA DE MÚSICAS
     ======================================================= */

  const musicSearch =
    document.getElementById("musicSearch");

  const musicEmpty =
    document.getElementById("musicEmpty");

  const musicCards =
    document.querySelectorAll(
      ".music-card"
    );


  if (musicSearch) {

    musicSearch.addEventListener(
      "input",
      event => {

        const search =
          event.target.value
            .toLowerCase()
            .trim();

        let found = 0;


        musicCards.forEach(card => {

          const title =
            (
              card.dataset.title || ""
            ).toLowerCase();

          const tags =
            (
              card.dataset.tags || ""
            ).toLowerCase();

          const text =
            card.innerText
              .toLowerCase();


          const match =
            search === "" ||
            title.includes(search) ||
            tags.includes(search) ||
            text.includes(search);


          card.hidden = !match;


          if (match) {
            found++;
          }

        });


        if (musicEmpty) {

          musicEmpty.style.display =
            found === 0 &&
            search !== ""
              ? "block"
              : "none";

        }

      }
    );

  }


  /* =======================================================
     FECHAR MODAIS COM ESC
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeLightbox();
        closeVideo();

      }


      /* Galeria — imagem anterior/próxima */

      if (
        lightbox &&
        lightbox.classList.contains("open") &&
        (
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight"
        )
      ) {

        const items =
          Array.from(galleryItems);

        if (!items.length) return;


        const currentSrc =
          lightboxImage?.src;

        let currentIndex =
          items.findIndex(item => {

            const image =
              item.querySelector("img");

            const src =
              item.dataset.image ||
              image?.currentSrc ||
              image?.src;

            return (
              src === currentSrc
            );

          });


        if (currentIndex < 0) {
          currentIndex = 0;
        }


        if (event.key === "ArrowRight") {

          currentIndex =
            (currentIndex + 1) %
            items.length;

        }

        else {

          currentIndex =
            (
              currentIndex -
              1 +
              items.length
            ) %
            items.length;

        }


        const nextItem =
          items[currentIndex];

        const nextImage =
          nextItem.querySelector("img");

        const nextSrc =
          nextItem.dataset.image ||
          nextImage?.currentSrc ||
          nextImage?.src;

        const nextAlt =
          nextImage?.alt || "";

        openLightbox(
          nextSrc,
          nextAlt
        );

      }

    }
  );


  /* =======================================================
     FECHAR MENU AO CLICAR FORA
     ======================================================= */

  document.addEventListener(
    "click",
    event => {

      if (
        !nav ||
        !menuBtn
      ) return;

      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {

        nav.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =======================================================
     LAZY LOADING DE IFRAMES
     ======================================================= */

  document
    .querySelectorAll("iframe")
    .forEach(iframe => {

      if (
        !iframe.hasAttribute("loading")
      ) {

        iframe.setAttribute(
          "loading",
          "lazy"
        );

      }

      iframe.setAttribute(
        "referrerpolicy",
        "strict-origin-when-cross-origin"
      );

    });


  /* =======================================================
     IMAGENS
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.setAttribute(
        "decoding",
        "async"
      );


      const isHeroImage =
        image.closest(".hero") ||
        image.classList.contains(
          "brand-photo"
        );


      if (!isHeroImage) {

        if (
          !image.hasAttribute(
            "loading"
          )
        ) {

          image.setAttribute(
            "loading",
            "lazy"
          );

        }

      }

    });


  /* =======================================================
     LINKS EXTERNOS
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach(link => {

      const currentHost =
        window.location.hostname;

      try {

        const linkURL =
          new URL(
            link.href,
            window.location.href
          );


        if (
          linkURL.hostname !==
          currentHost
        ) {

          link.setAttribute(
            "target",
            "_blank"
          );

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }

      }

      catch (error) {

        console.warn(
          "Link inválido:",
          link.href
        );

      }

    });


  /* =======================================================
     SCROLL SUAVE
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute("href");

          if (
            !targetID ||
            targetID === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetID
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     DETEÇÃO DE REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (reducedMotion.matches) {

    document.documentElement.classList.add(
      "reduce-motion"
    );

  }


  /* =======================================================
     PROTEÇÃO CONTRA ERROS DE IMAGEM
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-error"
          );

        }
      );

    });


  /* =======================================================
     WHATSAPP
     ======================================================= */

  const whatsappLinks =
    document.querySelectorAll(
      'a[href*="wa.me"]'
    );


  whatsappLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        /*
          O número deve estar configurado
          diretamente no href do HTML.

          Exemplo:

          https://wa.me/258XXXXXXXXX
        */

      }
    );

  });


  /* =======================================================
     CONSOLE — IDENTIDADE DO SITE
     ======================================================= */

  console.log(
    "%cMarcelo de Flávio",
    "font-size:20px;font-weight:bold;"
  );

  console.log(
    "Web Developer • Youth Leader • Child Rights Defender"
  );

});
