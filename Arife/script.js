document.addEventListener("DOMContentLoaded", function () {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");
  const bodyEl = document.body;
  const allLinks = document.querySelectorAll("a:link");
  const featuredLogos = document.querySelectorAll(
    ".section-featured .logos img"
  );

  // Función para cerrar la navegación móvil
  function closeMobileNav() {
    headerEl.classList.remove("nav-open");
    bodyEl.classList.remove("sticky"); // Desactivar sticky al cerrar la navegación móvil
  }

  // Función para ocultar o mostrar los logotipos destacados
  // function toggleFeaturedLogos() {
  //   featuredLogos.forEach(function (logo) {
  //     if (logo.style.display === "none") {
  //       logo.style.display = "block";
  //     } else {
  //       logo.style.display = "none";
  //     }
  //   });
  // }
  // Función para ocultar o mostrar los logotipos destacados con transición
  function toggleFeaturedLogos() {
    featuredLogos.forEach(function (logo) {
      if (logo.style.visibility === "hidden") {
        logo.style.visibility = "visible";
      } else {
        logo.style.visibility = "hidden";
      }
    });
  }

  // Evento click para el botón de navegación móvil
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
    toggleFeaturedLogos(); // Ocultar o mostrar los logos destacados al abrir/cerrar la navegación móvil

    // Si la navegación móvil está abierta, activa el sticky
    if (headerEl.classList.contains("nav-open")) {
      bodyEl.classList.add("sticky");
    } else {
      // Si la navegación móvil está cerrada, desactiva el sticky
      bodyEl.classList.remove("sticky");
    }
  });

  // Evento click para todos los enlaces del documento
  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const isMobileNavButton = link.classList.contains("btn-mobile-nav");

      // Si no es el botón de navegación móvil, prevenimos el comportamiento por defecto
      if (!isMobileNavButton) {
        const href = link.getAttribute("href");

        // Si el enlace es "Nosotros", dejamos que la navegación ocurra normalmente
        if (href === "nosotros.html") return;
        if (href === "servicios.html") return;
        if (href === "contacto.html") return;
        if (href === "reserva.html") return;
        if (href === "index.html") return;

        e.preventDefault();

        // Scroll back to top
        if (href === "#")
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

        // Scroll to other links
        if (href !== "#" && href.startsWith("#")) {
          const sectionEl = document.querySelector(href);
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        // Cerrar la navegación móvil después de hacer clic en un enlace
        closeMobileNav();
      }
    });
  });

  // Observador de intersección para el header pegajoso
  // const sectionHeroEl = document.querySelector(".section-hero");

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);

      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );
  obs.observe(sectionHeroEl);

  // Función para verificar el soporte de la propiedad flex-gap
  function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
  }

  checkFlexGap(); // Verificar el soporte de flex-gap al cargar la página
});
