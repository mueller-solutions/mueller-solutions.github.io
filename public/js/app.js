// Google Tracking Code

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-777G6E86XK");

// Hotjar Tracking Code

(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = { hjid: 5088047, hjsv: 6 };
  a = o.getElementsByTagName("head")[0];
  r = o.createElement("script");
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

// Navigation

const navEl = document.querySelector(".site-navigation");
const navListEl = document.querySelector(".site-navigation > ul");
const navToggleEl = document.querySelector(".site-nav-toggle");
const subNavToggleEl = document.querySelector(".sub-nav-toggle");
const navLinkEls = document.querySelectorAll(".nav-link");
const sectionEls = document.querySelectorAll(".section");
const headerEl = document.querySelector(".site-header");
const headerHeight = headerEl ? headerEl.offsetHeight * 1.5 : 0;
const logoLinkEls = document.querySelectorAll(".logo-link");
const technologyLinkEls = document.querySelectorAll(".technology-link");
const technologiesEls = document.querySelectorAll(".technology-article");

// Scroll to the target section if the URL contains a hash
if (window.location.href.includes("/#/")) {
  const targetId = window.location.href.split("/#/")[1];
  const targetEl = document.getElementById(targetId);
  const targetTop = targetEl?.offsetTop || 0;
  const targetY = targetTop - headerHeight;

  window.scrollTo({ top: targetY, behavior: "smooth" });
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Highlight the active section in the navigation
let currentSection = "home";

const handleScroll = debounce(() => {
  if (window.location.pathname !== "/") {
    return;
  }

  const windowScrollY = window.scrollY + headerHeight;

  sectionEls.forEach((sectionEl) => {
    if (!sectionEl.id) {
      return;
    }

    if (windowScrollY >= sectionEl.offsetTop) {
      currentSection = sectionEl.id;
    }
  });

  if (window.scrollY === 0) {
    currentSection = "home";
  }

  navLinkEls.forEach((navLinkEl) => {
    navLinkEl.classList.remove("active");
    if (navLinkEl.href.includes(`/#/${currentSection}`)) {
      navLinkEl.classList.add("active");
    }
    if (
      currentSection === "home" &&
      navLinkEl.href ===
        window.location.origin +
          window.location.pathname +
          window.location.search
    ) {
      navLinkEl.classList.add("active");
    }
  });
}, 100);

window.addEventListener("scroll", handleScroll);

// Smooth scroll to sections
navLinkEls.forEach((navLinkEl) => {
  navLinkEl.addEventListener("click", (event) => {
    // Close the mobile navigation
    setTimeout(() => {
      navToggleEl.setAttribute("aria-expanded", "false");
      navEl.setAttribute("data-visible", "false");
      navEl.setAttribute("style", `--_height: 0`);
    }, 100);

    if (window.location.pathname !== "/") {
      return;
    }

    if (
      navLinkEl.href ===
      window.location.origin + window.location.pathname + window.location.search
    ) {
      event.preventDefault();
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!navLinkEl.href.includes("/#/")) {
      return;
    }

    event.preventDefault();
    const targetId = navLinkEl.href.split("/#/")[1];
    const targetEl = document.getElementById(targetId);
    const targetTop = targetEl?.offsetTop || 0;
    const targetY = targetTop - headerHeight;

    history.pushState(
      "",
      document.title,
      window.location.pathname + "#/" + targetId + window.location.search
    );

    window.scrollTo({ top: targetY, behavior: "smooth" });
  });
});

// Smooth scroll to top
logoLinkEls.forEach((logoLinkEl) => {
  logoLinkEl.addEventListener("click", (event) => {
    if (window.location.pathname !== "/") {
      return;
    }
    event.preventDefault();
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Show technology articles
technologyLinkEls.forEach((technologyLinkEl) => {
  technologyLinkEl.addEventListener("click", (event) => {
    event.preventDefault();

    technologyLinkEl.classList.add("active");
    const targetId = technologyLinkEl.href.split("#")[1];

    technologiesEls.forEach((article) => {
      article.classList.remove("active");

      if (article.id == targetId) {
        article.classList.add("active");
      }
    });
  });

  technologyLinkEl.addEventListener("blur", (event) => {
    event.preventDefault();

    technologyLinkEl.classList.remove("active");

    setTimeout(() => {
      const targetId = technologyLinkEl.href.split("#")[1];

      technologiesEls.forEach((article) => {
        if (article.id == targetId && article.classList.contains("active")) {
          article.classList.remove("active");
        }
      });
    }, 200);
  });
});

// Mobile Navigation
navToggleEl.addEventListener("click", () => {
  const visibility = navEl.getAttribute("data-visible");
  const navListHeight = navListEl.offsetHeight;

  if (visibility === "false") {
    navToggleEl.setAttribute("aria-expanded", "true");
    navEl.setAttribute("style", `--_height: ${navListHeight}px`);
  } else {
    navToggleEl.setAttribute("aria-expanded", "false");
    navEl.setAttribute("style", `--_height: 0`);
  }
});

// Sub Navigation
subNavToggleEl.addEventListener("click", () => {
  const visibility = subNavToggleEl.getAttribute("aria-expanded");
  const subNavId = subNavToggleEl.getAttribute("aria-controls");
  const subNav = document.getElementById(subNavId);

  if (visibility === "false") {
    subNavToggleEl.setAttribute("aria-expanded", "true");
    subNav.classList.add("in");
    subNav.setAttribute("data-visible", "true");
    setTimeout(() => {
      subNav.classList.remove("in");
    }, 250);
  } else {
    subNavToggleEl.setAttribute("aria-expanded", "false");

    subNav.classList.add("out");

    setTimeout(() => {
      subNav.classList.remove("out");
      subNav.setAttribute("data-visible", "false");
    }, 250);
  }
});
