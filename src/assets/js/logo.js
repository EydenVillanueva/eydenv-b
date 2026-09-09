(function () {
  var els = document.querySelectorAll("[data-logo]");
  var gifs = window.__LOGO_GIFS__;
  if (!els.length || !gifs || !gifs.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var pick = gifs[Math.floor(Math.random() * gifs.length)];
  els.forEach(function (el) {
    el.style.backgroundImage = 'url("' + pick + '")';
  });
})();
