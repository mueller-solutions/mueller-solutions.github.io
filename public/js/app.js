// Google Tracking Code
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-777G6E86XK');

// Hotjar Tracking Code
(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = { hjid: 5088047, hjsv: 6 };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script');
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

// Navigation
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[aria-controls="main-navigation"]');
  const menuEl = document.getElementById('main-navigation');
  const subNavToggle = document.querySelector('[aria-controls="services-navigation"]');
  const subMenuEl = document.getElementById('services-navigation');
  const navLinks = document.querySelectorAll('.nav-link, .nav-button');

  function toggleNav(toggle, menu, noWait = false) {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      if (noWait) {
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        menu?.classList.add('out');
        setTimeout(() => {
          toggle.setAttribute('aria-expanded', 'false');
          menu?.classList.remove('out');
        }, 300);
      }
    } else {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  navToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleNav(navToggle, menuEl, true);
  });

  subNavToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleNav(subNavToggle, subMenuEl);
  });

  document.addEventListener('click', (event) => {
    const subNavOpen = subNavToggle?.getAttribute('aria-expanded') === 'true';
    if (subNavOpen && !subMenuEl?.contains(event.target) && !subNavToggle?.contains(event.target)) {
      toggleNav(subNavToggle, subMenuEl);
    }
  });

  // Toggle nav links to active
  navLinks.forEach((link) => {
    link.classList.remove('active');

    const currentPath = window.location.pathname.slice(1);

    const hrefArray = link.href.split('/');
    const thisPath = hrefArray[hrefArray.length - 1];

    if (currentPath === thisPath) {
      link.classList.add('active');
    }
  });
});
